'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Circles } from 'react-loader-spinner'

import { Raiting } from '../Raiting/Raiting'
import s from './PreviewMovie.module.scss'

type Props = {
	film: any
}

export const PreviewMovie = ({ film }: Props) => {
	const [isLoaded, setIsLoaded] = useState(false)

	return (
		<div className={s.filmItem}>
			{film?.poster_path ? (
				<>
					{!isLoaded && (
						<div className={s.loader}>
							<Circles height="50" width="50" color="#ECEDE6" ariaLabel="circles-loading" />
						</div>
					)}

					<Image
						src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
						className={s.img}
						alt={film.title || 'movie poster'}
						width={150}
						height={225}
						onLoad={() => setIsLoaded(true)}
					/>
				</>
			) : (
				<div className={s.img}>Нет изображения</div>
			)}

			<div className={s.aboutFilm}>
				<h3 className={s.name}>{film.title}</h3>

				{/* <div className={s.raitings}>
					<Raiting name="TMDB" raiting={film.vote_average?.toFixed(1)} />
				</div> */}

				<div className={s.filmParam}>
					<p>Год</p>

					<p>{film.release_date?.slice(0, 4)}</p>
				</div>

				{film.genres && film.genres.length > 0 && (
					<div className={s.filmParam}>
						<p>Жанр:</p>

						<span>
							{film.genres
								.slice(0, 2)
								.map((el: any) => el.name)
								.join(', ')}
						</span>
					</div>
				)}

				{film.runtime && (
					<div className={s.filmParam}>
						<p>Время:</p>

						<span>{film.runtime} мин.</span>
					</div>
				)}

				<h2 className={s.description}>{film.overview || 'Описание отсутствует'}</h2>

				<Link href={`/movies/${film.id}`} className={s.link}>
					Подробнее
				</Link>
			</div>
		</div>
	)
}
