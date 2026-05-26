import { getMovieById } from '@/app/api/api'
import { FilmContent } from '@/common/UI'

type Props = {
	params: Promise<{
		id: string
	}>
}

export default async function MoviePage({ params }: Props) {
	const { id } = await params

	const movie = await getMovieById(id)

	return <FilmContent data={movie} error={null} />
}
