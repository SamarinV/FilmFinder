import 'server-only'
import { MovieDetails, TMDBFindByIdResponse, TMDBMoviesResponse } from '@/common/types'

export class TMDBError extends Error {
	constructor(public readonly status: number) {
		super('Не удалось получить данные о фильмах')
		this.name = 'TMDBError'
	}
}

async function tmdbFetch<T>(endpoint: string): Promise<T> {
	const baseUrl = process.env.TMDB_API_URL || process.env.NEXT_PUBLIC_API_URL
	if (!baseUrl || !process.env.TMDB_TOKEN) throw new TMDBError(503)
	const url = new URL(endpoint, `${baseUrl.replace(/\/+$/, '')}/`)
	const response = await fetch(url, {
		headers: { accept: 'application/json', Authorization: `Bearer ${process.env.TMDB_TOKEN}` },
		signal: AbortSignal.timeout(10000),
		next: { revalidate: 3600 },
	})
	if (!response.ok) throw new TMDBError(response.status)
	return response.json()
}

const collections = {
	popular: 'movie/popular?language=ru-RU&page=1',
	russia: 'discover/movie?with_origin_country=RU&language=ru-RU&page=1',
	fantastic: 'discover/movie?with_genres=878&language=ru-RU&page=1',
	horror: 'discover/movie?with_genres=27&language=ru-RU&page=1',
} as const

export const getHeroMovie = async () => {
	const data = await tmdbFetch<TMDBFindByIdResponse>('find/tt0111161?external_source=imdb_id&language=ru-RU')
	return data.movie_results[0] ?? null
}

export const getFilms = async (collection: keyof typeof collections) => {
	const data = await tmdbFetch<TMDBMoviesResponse>(collections[collection])
	return data.results
}

export const getMovieById = (id: string) =>
	tmdbFetch<MovieDetails>(`movie/${encodeURIComponent(id)}?language=ru-RU&append_to_response=credits,similar`)

export const searchMovies = (query: string, page = 1) => {
	const params = new URLSearchParams({ query, language: 'ru-RU', page: String(page) })
	return tmdbFetch<TMDBMoviesResponse>(`search/movie?${params}`)
}
