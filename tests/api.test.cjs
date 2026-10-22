const { test, after } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

// Load the actual TypeScript handlers while replacing the server-only marker.
function loadSource(file, dependencies = {}) {
	const source = ts.transpileModule(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), {
		compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
	}).outputText
	const compiledModule = { exports: {} }
	new Function('require', 'module', 'exports', source)(
		(name) => {
			if (name === 'server-only') return {}
			return dependencies[name] ?? require(name)
		},
		compiledModule,
		compiledModule.exports,
	)
	return compiledModule.exports
}

const api = loadSource('src/app/api/api.ts')
const { GET } = loadSource('src/app/api/search/route.ts', { '../api': api })
const originalFetch = global.fetch
const originalEnv = { ...process.env }
after(() => {
	global.fetch = originalFetch
	for (const key of ['TMDB_API_URL', 'NEXT_PUBLIC_API_URL', 'TMDB_TOKEN']) {
		if (originalEnv[key] === undefined) delete process.env[key]
		else process.env[key] = originalEnv[key]
	}
})

const request = (query) => ({ nextUrl: new URL(`http://localhost/api/search?${query}`) })
const data = { page: 1, results: [], total_pages: 0 }

test('search preserves Cyrillic and reserved URL characters, with either base URL form', async () => {
	process.env.TMDB_TOKEN = 'test-token'
	const query = 'Любовь & дружба + #?'
	for (const suffix of ['', '/']) {
		process.env.TMDB_API_URL = `https://example.test/3${suffix}`
		global.fetch = async (url) => {
			assert.equal(url.pathname, '/3/search/movie')
			assert.equal(url.searchParams.get('query'), query)
			assert.equal(url.searchParams.get('page'), '1')
			return Response.json(data)
		}
		const response = await GET(request(new URLSearchParams({ query })))
		assert.equal(response.status, 200)
		assert.deepEqual(await response.json(), data)
	}
})

test('invalid queries and pages return 400 without an upstream request', async () => {
	global.fetch = async () => {
		throw new Error('Must not request upstream')
	}
	for (const query of [
		'',
		'query=+',
		'query=film&page=0',
		'query=film&page=-1',
		'query=film&page=1.5',
		'query=film&page=501',
		'query=film&page=no',
		`query=${'x'.repeat(201)}`,
	]) {
		assert.equal((await GET(request(query))).status, 400)
	}
})

test('upstream errors do not become successful search responses or expose upstream payloads', async () => {
	for (const [upstream, expected] of [
		[401, 502],
		[404, 502],
		[429, 429],
		[500, 502],
	]) {
		global.fetch = async () => Response.json({ secret: 'upstream-details' }, { status: upstream })
		const response = await GET(request('query=film'))
		assert.equal(response.status, expected)
		assert.ok((await response.json()).error)
	}
})

test('network errors and malformed payloads return 502', async () => {
	for (const fetcher of [
		async () => {
			throw new TypeError('network')
		},
		async () => Response.json({}),
		async () => new Response('<html>error</html>'),
	]) {
		global.fetch = fetcher
		assert.equal((await GET(request('query=film'))).status, 502)
	}
})

test('missing credentials return 503 without an upstream request', async () => {
	delete process.env.TMDB_TOKEN
	global.fetch = async () => {
		throw new Error('Must not request upstream')
	}
	assert.equal((await GET(request('query=film'))).status, 503)
})

test('configuration errors name missing variables without exposing credentials', async () => {
	process.env.TMDB_API_URL = ''
	process.env.NEXT_PUBLIC_API_URL = ''
	process.env.TMDB_TOKEN = 'private-test-token'
	await assert.rejects(api.getHeroMovie(), (error) => {
		assert.equal(error.status, 503)
		assert.match(error.message, /TMDB_API_URL/)
		assert.ok(!error.message.includes('private-test-token'))
		return true
	})
})

test('movie details request Russian and English videos together with credits and similar films', async () => {
	process.env.TMDB_API_URL = 'https://example.test/3'
	process.env.TMDB_TOKEN = 'test-token'
	global.fetch = async (url) => {
		assert.equal(url.pathname, '/3/movie/278')
		assert.equal(url.searchParams.get('language'), 'ru-RU')
		assert.equal(url.searchParams.get('append_to_response'), 'credits,similar,videos')
		assert.equal(url.searchParams.get('include_video_language'), 'ru,en')
		return Response.json({ id: 278, videos: { results: [] } })
	}
	assert.equal((await api.getMovieById('278')).id, 278)
})

test('401 errors explain which configuration to check without revealing secrets', async () => {
	process.env.TMDB_API_URL = 'https://example.test/3'
	process.env.TMDB_TOKEN = 'private-test-token'
	global.fetch = async () => Response.json({ status_message: 'private upstream details' }, { status: 401 })
	await assert.rejects(api.getHeroMovie(), (error) => {
		assert.equal(error.status, 401)
		assert.match(error.message, /TMDB_TOKEN/)
		assert.match(error.message, /TMDB_API_URL/)
		assert.ok(!error.message.includes('private-test-token'))
		assert.ok(!error.message.includes('private upstream details'))
		return true
	})
})
