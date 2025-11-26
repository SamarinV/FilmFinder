import { FilmContent } from '@/common/UI'
import { toast } from 'react-toastify'

const FilmPage = async ({ params }: { params: { id: string } }) => {
	const { film, error } = await getMovieById(params.id)
	return <FilmContent data={film} error={error} />
}

export default FilmPage

const getMovieById = async (id: string) => {
	const apiKey = 'GJ51QF5-0BA4QRA-HCCMFJY-SXTZRF2'
	const headers = {
		'X-API-KEY': apiKey,
	}
	const [dataFilmResponse] = await Promise.all([fetch(`https://api.kinopoisk.dev/v1.4/movie/${id}`, { headers })])
	if (!dataFilmResponse.ok) {
		return { film: null, error: 'Не удалось загрузить фильм' }
	}
	const film = await dataFilmResponse.json()

	return { film, error: null }
}
