import { getFilms } from '@/app/api/api'
import CardMovie from '../CollectionMovieItem/CollectionMovieItem'
import s from './CollectionMovie.module.scss'

type MovieCollectionType = 'popular' | 'russia' | 'fantastic' | 'horror'
type Props = {
	collection: MovieCollectionType
	title: string
}

export const CollectionMovie = async ({ collection, title }: Props) => {
	const films = await getFilms(collection)
	return (
		<div className={s.wrapper}>
			<h2>{title}</h2>
			<div className={s.filmsCollection}>
				{films.map((film) => {
					return <CardMovie film={film} />
				})}
			</div>
		</div>
	)
}
