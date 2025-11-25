import { Movie } from '@/common/types'
import Image from 'next/image'
import Link from 'next/link'
import { Raiting } from '../Raiting/Raiting'
import s from './PreviewMovie.module.scss'

type Props = {
	film: Movie
}

export const PreviewMovie = ({ film }: Props) => {
	return (
		<div className={s.filmItem} key={film.id}>
			{film?.poster?.previewUrl ? (
				<Image
					src={film.poster.previewUrl}
					className={s.img}
					alt={film.name || 'movie poster'}
					width={150}
					height={225}
				/>
			) : (
				<div className={s.img}>Нет изображения</div>
			)}
			<div className={s.aboutFilm}>
				<h3 className={s.name}>{film.name}</h3>

				<div className={s.raitings}>
					{film.rating?.kp != null && <Raiting name="Кинопоиск" raiting={film.rating.kp} />}

					{film.rating?.imdb != null && <Raiting name="IMDb" raiting={film.rating.imdb} />}
				</div>

				<div className={s.filmParam}>
					<p>Год</p>
					<p>{film.year}</p>
				</div>
				{film.countries && film.countries.length > 0 && (
					<div className={s.filmParam}>
						<p>Страна</p>
						<span>
							{film.countries
								.slice(0, 4)
								.map((el) => el.name)
								.join(' ')}
						</span>
					</div>
				)}

				{film.genres && film.genres.length > 0 && (
					<div className={s.filmParam}>
						<p>Жанр:</p>
						<span>
							{film.genres
								.slice(0, 2)
								.map((el) => el.name)
								.join(' ')}
						</span>
					</div>
				)}

				{film.movieLength || film.seriesLength ? (
					<div className={s.filmParam}>
						<p>Время:</p>
						<span>{film.movieLength || film.seriesLength}&nbsp;мин.</span>
					</div>
				) : null}

				<h2 className={s.description}>{film.description}</h2>
				<Link href={`/movies/${film.id}`} className={s.link}>
					Подробнее
				</Link>
			</div>
		</div>
	)
}
