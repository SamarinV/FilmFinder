'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Circles } from 'react-loader-spinner'
import { TMDBMovie } from '@/common/types'
import s from './PreviewMovie.module.scss'

export const PreviewMovie = ({ film }: { film: TMDBMovie }) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const [imageFailed, setImageFailed] = useState(false)
	return (
		<article className={s.filmItem}>
			{film.poster_path && !imageFailed ? (
				<div className={s.posterContainer}>
					{!isLoaded && (
						<div className={s.loader}>
							<Circles height="50" width="50" color="#ECEDE6" ariaLabel="Загрузка постера" />
						</div>
					)}
					<Image
						src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
						className={s.img}
						alt={film.title}
						width={300}
						height={450}
						sizes="(max-width: 576px) 120px, 240px"
						onLoad={() => setIsLoaded(true)}
						onError={() => setImageFailed(true)}
					/>
				</div>
			) : (
				<div className={s.posterContainer}>Нет изображения</div>
			)}
			<div className={s.aboutFilm}>
				<h2 className={s.name}>{film.title}</h2>
				<p className={s.filmParam}>Год: {film.release_date?.slice(0, 4) || 'Не указан'}</p>
				<p className={s.description}>{film.overview || 'Описание отсутствует'}</p>
				<Link
					href={`/movies/${film.id}`}
					className={s.link}
					aria-label={`Подробнее о фильме «${film.title}»`}
				>
					Подробнее
				</Link>
			</div>
		</article>
	)
}
