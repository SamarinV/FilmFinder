export interface TMDBMovie {
	id: number
	title: string
	original_title: string
	original_language: string
	overview: string
	poster_path: string | null
	backdrop_path: string | null
	release_date: string
	adult: boolean
	genre_ids: number[]
	popularity: number
	video: boolean
	vote_average: number
	vote_count: number
}

export type MovieResult = TMDBMovie

export interface TMDBFindByIdResponse {
	movie_results: TMDBMovie[]
}

export interface TMDBMoviesResponse {
	page: number
	results: TMDBMovie[]
	total_pages: number
	total_results?: number
}

export interface CrewMember {
	id: number
	name: string
	job: string
}

export interface MovieDetails extends TMDBMovie {
	genres: { id: number; name: string }[]
	production_countries: { iso_3166_1: string; name: string }[]
	runtime: number | null
	tagline: string
	credits?: { crew: CrewMember[] }
	similar?: TMDBMoviesResponse
}
