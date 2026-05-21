// export type Movie = {
// 	id: number
// 	externalId: {
// 		kpHD: string
// 		imdb: null
// 		tmdb: null
// 	}
// 	name: string
// 	alternativeName: string | null
// 	slogan?: string
// 	names: [
// 		{
// 			name: string
// 			language: string
// 			type: string
// 		},
// 	]
// 	type: string
// 	typeNumber: number
// 	year: number
// 	description: string
// 	rating: {
// 		kp: number | null
// 		imdb: number | null
// 		tmdb: number | null
// 		filmCritics: number
// 		russianFilmCritics: number
// 		await: number | null
// 	}
// 	votes: {
// 		kp: number | null
// 		imdb: number | null
// 		tmdb: number | null
// 		filmCritics: number
// 		russianFilmCritics: number
// 		await: number | null
// 	}
// 	movieLength: number
// 	ratingMpaa: null
// 	ageRating: number
// 	logo: null
// 	poster: {
// 		url: string
// 		previewUrl: string
// 	}
// 	backdrop: {
// 		url: string | null
// 		previewUrl: string | null
// 	}
// 	videos: null
// 	genres: [
// 		{
// 			name: string
// 		},
// 	]
// 	countries: [
// 		{
// 			name: string
// 		},
// 	]
// 	persons: [
// 		{
// 			id: number
// 			photo: string
// 			name: string
// 			enName: null
// 			description: null
// 			profession: string
// 			enProfession: string
// 		},
// 	]
// 	reviewInfo: null
// 	seasonsInfo: null
// 	budget: null
// 	fees: null
// 	premiere: {
// 		country: null
// 		world: null
// 		russia: null
// 		digital: null
// 		cinema: null
// 		bluray: null
// 		dvd: null
// 	}
// 	similarMovies: null | []
// 	sequelsAndPrequels: Movie[] | null
// 	watchability: {
// 		items: [
// 			{
// 				name: string
// 				logo: {
// 					url: string
// 				}
// 				url: string
// 			},
// 		]
// 	}
// 	releaseYears: null
// 	top10: null
// 	top250: null
// 	ticketsOnSale: false
// 	totalSeriesLength: null
// 	seriesLength: null
// 	isSeries: false
// 	audience: [
// 		{
// 			count: number
// 			country: string
// 		},
// 	]
// 	lists: [string]
// 	networks: {
// 		Items: null
// 	}
// 	updatedAt: string
// 	createdAt: string
// 	facts: null
// 	imagesInfo: {
// 		postersCount: null
// 		backdropsCount: null
// 		framesCount: null
// 	}
// }

// export type MovieImages = {
// 	docs: [
// 		{
// 			movieId: number
// 			type: string
// 			url: string
// 			previewUrl: string
// 			height: number
// 			width: number
// 			createdAt: string
// 			updatedAt: string
// 			id: string
// 		},
// 	]
// }

// export type Movies = {
// 	docs: Movie[]
// 	total: number
// 	limit: number
// 	page: number
// 	pages: number
// }

export interface TMDBFindByIdResponse {
	movie_results: MovieResult[]
	person_results: unknown[]
	tv_results: unknown[]
	tv_episode_results: unknown[]
	tv_season_results: unknown[]
}

export interface MovieResult {
	adult: boolean
	backdrop_path: string
	genre_ids: number[]
	id: number
	media_type: 'movie'
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string
	release_date: string
	softcore: boolean
	title: string
	video: boolean
	vote_average: number
	vote_count: number
}

export interface TMDBMoviesResponse {
	page: number
	results: TMDBMovie[]
	total_pages: number
	total_results?: number
}

export interface TMDBMovie {
	adult: boolean
	backdrop_path: string | null
	genre_ids: number[]
	id: number
	title: string
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string | null
	release_date: string
	softcore: boolean
	video: boolean
	vote_average: number
	vote_count: number
}