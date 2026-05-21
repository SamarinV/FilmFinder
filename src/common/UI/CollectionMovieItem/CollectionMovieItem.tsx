import Image from 'next/image'
import Link from 'next/link'
import { TMDBMovie } from '../../types'
import s from './CollectionMovieItem.module.scss'

type Props = {
	film: TMDBMovie
}

const CollectionMovieItem = ({ film }: Props) => {
	if (film.poster_path === undefined || typeof film.poster_path !== 'string') {
		return <></>
	}
	return (
		<Link href={`/movies/${film.id}`}>
			<div key={film.id} className={s.film}>
				<Image
					sizes="192px, 240px"
					src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
					alt={film.title || 'poster'}
					fill
				/>
				<div className={s.filmDetails}>
					<p>{film.release_date}</p>
				</div>
			</div>
		</Link>
	)
}

export default CollectionMovieItem
