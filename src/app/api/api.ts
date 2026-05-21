

// const apiKey = process.env.KINOPOISK_API_KEY!
// const baseUrl = process.env.NEXT_PUBLIC_API_URL!
// const headers = { 'X-API-KEY': apiKey }

import { TMDBFindByIdResponse, TMDBMoviesResponse } from "@/common/types"

// export const getRandomMovie = async () => {
// 	const randomMovieResponse = await fetch(`${baseUrl}movie/random?lists=top250`, { headers })

// 	if (!randomMovieResponse.ok) {
// 		throw new Error('Failed to fetch data')
// 	}

// 	const film: Movie = await randomMovieResponse.json()
// 	return film
// }

export const getHeroMovie = async () => {
	const baseUrl = 'https://api.themoviedb.org/3/'
	const headers = {
		accept: 'application/json',
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWM2MjZlNGIzMDU1NTcwN2RjMDMxZTc3MTc1NjIzMyIsIm5iZiI6MTc3OTM0MzExMS41NDQ5OTk4LCJzdWIiOiI2YTBlOWYwN2FhYWQ3YjQwOTQzOGQwZmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4qOSWNdBjFLNwWLeBsbkLqNdjIvgpPn1pVAJp65dQhE',
	}

	const getMovieByIdResponse = await fetch(`${baseUrl}find/tt0111161?external_source=imdb_id&language=ru-RU`, { headers })

	if (!getMovieByIdResponse.ok) {
		throw new Error('Failed to fetch data')
	}

	const film: TMDBFindByIdResponse = await getMovieByIdResponse.json()

	return film
}

export const getFilms = async (collection: string) => {
	const baseUrl = 'https://api.themoviedb.org/3/'
	const headers = {
		accept: 'application/json',
		Authorization:
			'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWM2MjZlNGIzMDU1NTcwN2RjMDMxZTc3MTc1NjIzMyIsIm5iZiI6MTc3OTM0MzExMS41NDQ5OTk4LCJzdWIiOiI2YTBlOWYwN2FhYWQ3YjQwOTQzOGQwZmQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.4qOSWNdBjFLNwWLeBsbkLqNdjIvgpPn1pVAJp65dQhE',
	}
	const endPoints = {
		popular: 'movie/popular?language=ru-RU&page=1',

		russia: 'discover/movie?with_origin_country=RU&language=ru-RU&page=1',

		fantastic: 'discover/movie?with_genres=878&language=ru-RU&page=1',

		horror: 'discover/movie?with_genres=27&language=ru-RU&page=1',
	}
	const query =
		collection === 'popular'
			? endPoints.popular
			: collection === 'russia'
				? endPoints.russia
				: collection === 'fantastic'
					? endPoints.fantastic
					: collection === 'horror'
						? endPoints.horror
						: ''
	const data = await fetch(`${baseUrl}${query}`, {
		headers,
	})
	const films: TMDBMoviesResponse = await data.json()
	return films.results
}

export const getMovieById = async (id: string) => {
	const baseUrl = 'https://api.themoviedb.org/3/'

	const response = await fetch(`${baseUrl}movie/${id}?language=ru-RU&append_to_response=credits,similar`, {
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
		},
	})

	return response.json()
}


export const searchMovies = async (query: string, page: number = 1) => {
	const baseUrl = 'https://api.themoviedb.org/3/'

	const response = await fetch(`${baseUrl}search/movie?query=${query}&language=ru-RU&page=${page}`, {
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
		},
	})

	if (!response.ok) {
		throw new Error('Failed to search movies')
	}

	return response.json()
}
