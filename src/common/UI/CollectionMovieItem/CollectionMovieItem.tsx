import Image from 'next/image'
import Link from 'next/link'
import { Movie } from '../../types'
import s from './CollectionMovieItem.module.scss'

type Props = {
	film: Movie
}

const CollectionMovieItem = ({ film }: Props) => {
	if (film.poster === undefined || typeof film.poster.previewUrl !== 'string') {
		return <></>
	}
	return (
		<Link href={`movies/${film.id}`}>
			<div key={film.id} className={s.film}>
				<Image sizes="192px, 240px" src={film.poster.previewUrl} alt={film.name || 'poster'} fill />
				<div className={s.filmDetails}>
					<p>{film.year}</p>
					<p>
						{film.countries
							?.filter((el) => el && el.name)
							.map((el) => el.name)
							.join(' ') || '—'}
					</p>
					<p>
						{film.genres
							?.filter((el) => el && el.name)
							.map((el) => el.name)
							.join(' ') || '—'}
					</p>
				</div>
			</div>
		</Link>
	)
}

export default CollectionMovieItem
