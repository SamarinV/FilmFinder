import { getMovieById } from '@/app/api/api'
import { FilmContent } from '@/common/UI'

type Props = {
	params: {
		id: string
	}
}

export default async function MoviePage({ params }: Props) {
	const movie = await getMovieById(params.id)

	return <FilmContent data={movie} error={null} />
}
