import Image from 'next/image'
import Link from 'next/link'
import { TMDBMovie } from '../../types'
import s from './CollectionMovieItem.module.scss'

export default function CollectionMovieItem({ film }: { film: TMDBMovie }) {
	return (
		<Link href={`/movies/${film.id}`} className={s.card} aria-label={`Подробнее о фильме «${film.title}»`}>
			<div className={s.poster}>
				{film.poster_path ? (
					<Image
						sizes="(max-width: 576px) 148px, 190px"
						src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
						alt=""
						fill
					/>
				) : (
					<span className={s.noImage}>Нет постера</span>
				)}
				{film.vote_average > 0 && (
					<span className={s.score}>
						<span aria-hidden="true">★</span> {film.vote_average.toFixed(1)}
						<span className="sr-only"> из 10 на TMDB</span>
					</span>
				)}
				<span className={s.open} aria-hidden="true">
					↗
				</span>
			</div>
			<h3>{film.title}</h3>
			<p className={s.details}>
				{film.release_date?.slice(0, 4) || 'Год не указан'}
				<span aria-hidden="true">·</span>Фильм
			</p>
		</Link>
	)
}
