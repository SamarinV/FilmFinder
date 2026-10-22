const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const ts = require('typescript')

const source = ts.transpileModule(
	fs.readFileSync(path.join(__dirname, '../src/common/lib/trailers.ts'), 'utf8'),
	{ compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } },
).outputText
const loaded = {}
new Function('exports', source)(loaded)
const { selectTrailer } = loaded
const video = (changes = {}) => ({
	id: '1',
	key: 'PLl99DlL6b4',
	name: 'Trailer',
	site: 'YouTube',
	type: 'Trailer',
	iso_639_1: 'en',
	official: true,
	published_at: '2024-01-01',
	...changes,
})

test('a Russian trailer wins over an official English trailer', () => {
	assert.equal(selectTrailer([video(), video({ id: 'ru', iso_639_1: 'ru', official: false })]).id, 'ru')
})

test('official Russian trailers win within the same language and type', () => {
	assert.equal(
		selectTrailer([video({ iso_639_1: 'ru', official: false }), video({ id: 'official', iso_639_1: 'ru' })])
			.id,
		'official',
	)
})

test('full trailers are preferred to teasers, with a teaser fallback', () => {
	assert.equal(
		selectTrailer([video({ type: 'Teaser' }), video({ id: 'trailer', official: false })]).id,
		'trailer',
	)
	assert.equal(selectTrailer([video({ type: 'Teaser' })]).type, 'Teaser')
})

test('clips and behind-the-scenes videos are not offered as trailers', () => {
	assert.equal(selectTrailer([video({ type: 'Clip' }), video({ type: 'Featurette' })]), null)
})

test('empty data and unsupported or unsafe video identifiers do not create a player', () => {
	for (const videos of [
		undefined,
		[],
		[video({ site: 'Unknown' })],
		[video({ key: '../evil?x=1' })],
		[video({ key: 'https://example.com' })],
		[video({ site: 'Vimeo', key: '123<script>' })],
	]) {
		assert.equal(selectTrailer(videos), null)
	}
})

test('provider URLs and displayed language are derived from validated video data', () => {
	const youtube = selectTrailer([video({ iso_639_1: 'ru' })])
	assert.equal(new URL(youtube.embedUrl).hostname, 'www.youtube-nocookie.com')
	assert.equal(youtube.languageLabel, 'На русском')
	assert.equal(youtube.watchUrl, 'https://www.youtube.com/watch?v=PLl99DlL6b4')
	const vimeo = selectTrailer([video({ site: 'Vimeo', key: '892231118' })])
	assert.equal(vimeo.embedUrl, 'https://player.vimeo.com/video/892231118?dnt=1')
})

test('the most recent equivalent trailer wins without mutating API results', () => {
	const videos = [video({ id: 'old' }), video({ id: 'new', published_at: '2025-01-01' })]
	assert.equal(selectTrailer(videos).id, 'new')
	assert.equal(videos[0].id, 'old')
})
