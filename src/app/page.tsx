import { CollectionMovie } from '@/common/UI'
import { HeroMovie } from '@/common/UI/HeroMovie/HeroMovie'
import { Movie } from '@/common/types'

export default async function App() {
	const previewRandomMovie = await getMovieById()
	return (
		<div className="flex min-h-screen flex-col">
			<section>
				<HeroMovie data={previewRandomMovie} />
			</section>
			<section>
				<CollectionMovie title="Популярные фильмы" collection="popular" />
				<CollectionMovie title="Фильмы России" collection="russia" />
				<CollectionMovie title="Фантастика" collection="fantastic" />
				<CollectionMovie title="Ужасы" collection="horror" />
			</section>
		</div>
	)
}

const getMovieById = async () => {
	const apiKey = 'GJ51QF5-0BA4QRA-HCCMFJY-SXTZRF2'
	const headers = {
		'X-API-KEY': apiKey,
	}

	const getMovieByIdResponse = await fetch(`https://api.poiskkino.dev/v1.4/movie/522892`, { headers })

	if (!getMovieByIdResponse.ok) {
		throw new Error('Failed to fetch data')
	}

	const film: Movie = await getMovieByIdResponse.json()

	return film
}
