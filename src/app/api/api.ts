import { Movie, Movies } from '@/common/types'

const apiKey = process.env.KINOPOISK_API_KEY!
const baseUrl = process.env.NEXT_PUBLIC_API_URL!
const headers = { 'X-API-KEY': apiKey }

export const getRandomMovie = async () => {
	const randomMovieResponse = await fetch(`${baseUrl}movie/random?lists=top250`, { headers })

	if (!randomMovieResponse.ok) {
		throw new Error('Failed to fetch data')
	}

	const film: Movie = await randomMovieResponse.json()
	return film
}

export const getFilms = async (collection: string) => {
	const endPoints = {
		popular: 'movie?typeNumber=1&limit=20',
		russia: 'movie?typeNumber=1&limit=20&rating.kp=7.2-10&countries.name=Россия&genres.name=фантастика',
		fantastic: 'movie?typeNumber=1&limit=20&rating.kp=7.2-10&genres.name=фантастика',
		horror: 'movie?typeNumber=1&limit=20&rating.kp=7.2-10&genres.name=ужасы',
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
	const films: Movies = await data.json()
	return films.docs
}

export const getSearchMovie = async (query: string, page: number) => {
	const apiKey = 'GJ51QF5-0BA4QRA-HCCMFJY-SXTZRF2'
	const headers = {
		'X-API-KEY': apiKey,
	}
	const res = await fetch(`https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=${query}`, {
		headers,
	})

	if (!res.ok) throw new Error('Failed to fetch data from Kinopoisk API')
	const data: Movies = await res.json()
	return data
}
