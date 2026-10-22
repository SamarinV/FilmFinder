import { getFilms } from '@/app/api/api'
import CardMovie from '../CollectionMovieItem/CollectionMovieItem'
import CollectionRail from './CollectionRail'

type MovieCollectionType = 'popular' | 'russia' | 'fantastic' | 'horror'
const subtitles: Record<MovieCollectionType, string> = {
	popular: 'ПОПУЛЯРНОЕ',
	russia: 'СДЕЛАНО В РОССИИ',
	fantastic: 'ФАНТАСТИКА',
	horror: 'УЖАСЫ',
}

export const CollectionMovie = async ({
	collection,
	title,
}: {
	collection: MovieCollectionType
	title: string
}) => {
	const films = await getFilms(collection)
	return (
		<CollectionRail id={collection} title={title} subtitle={subtitles[collection]}>
			{films.length ? (
				films.map((film) => <CardMovie key={film.id} film={film} />)
			) : (
				<p>В этой подборке пока нет фильмов.</p>
			)}
		</CollectionRail>
	)
}
