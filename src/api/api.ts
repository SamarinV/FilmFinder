import { Movie, Movies } from '@/common/types'

const apiKey = process.env.KINOPOISK_API_KEY!
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
const headers = { 'X-API-KEY': apiKey }

export const getRandomMovie = async () => {
	const randomMovieResponse = await fetch(`${baseUrl}movie/random?lists=top250`, { headers })

	if (!randomMovieResponse.ok) {
		throw new Error('Failed to fetch data')
	}

	const film: Movie = await randomMovieResponse.json()
	return film
}

export const getFilms = async (query: string) => {
	const data = await fetch(`${baseUrl}${query}`, {
		headers,
	})
	const films: Movies = await data.json()
	return films.docs
}
