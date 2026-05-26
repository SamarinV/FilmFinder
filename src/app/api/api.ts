import { TMDBFindByIdResponse, TMDBMoviesResponse } from '@/common/types'

const BASE_URL = 'https://api.themoviedb.org/3'

const headers = {
	accept: 'application/json',
	Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
}

// =========================
// универсальный fetch
// =========================
async function tmdbFetch<T>(endpoint: string): Promise<T> {
	const response = await fetch(`${BASE_URL}/${endpoint}`, {
		headers,
	})

	if (!response.ok) {
		console.error('TMDB ERROR:', {
			status: response.status,
			statusText: response.statusText,
			url: endpoint,
		})

		throw new Error('Failed to fetch TMDB data')
	}

	return response.json()
}

// =========================
// endpoints коллекций
// =========================
const collections = {
	popular: 'movie/popular?language=ru-RU&page=1',

	russia: 'discover/movie?with_origin_country=RU&language=ru-RU&page=1',

	fantastic: 'discover/movie?with_genres=878&language=ru-RU&page=1',

	horror: 'discover/movie?with_genres=27&language=ru-RU&page=1',
} as const

// =========================
// HERO MOVIE
// =========================
export const getHeroMovie = async () => {
	return tmdbFetch<TMDBFindByIdResponse>('find/tt0111161?external_source=imdb_id&language=ru-RU')
}

// =========================
// COLLECTIONS
// =========================
export const getFilms = async (collection: keyof typeof collections) => {
	const data = await tmdbFetch<TMDBMoviesResponse>(collections[collection])

	return data.results
}

// =========================
// MOVIE BY ID
// =========================
export const getMovieById = async (id: string) => {
	return tmdbFetch(`movie/${id}?language=ru-RU&append_to_response=credits,similar`)
}

// =========================
// SEARCH
// =========================
export const searchMovies = async (query: string, page: number = 1) => {
	return tmdbFetch<TMDBMoviesResponse>(`search/movie?query=${encodeURIComponent(query)}&language=ru-RU&page=${page}`)
}
