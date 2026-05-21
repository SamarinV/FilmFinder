'use client'

import { TMDBFindByIdResponse } from '@/common/types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Circles } from 'react-loader-spinner'
import { Raiting } from '..'
import s from './HeroMovie.module.scss'

type Props = {
	data: TMDBFindByIdResponse
}

export const HeroMovie = ({ data }: Props) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const movie = data.movie_results[0]

	return (
		<div className={s.wrapper}>
			{!isLoaded && (
				<div className={s.loader}>
					<Circles height="50" width="50" color="#ECEDE6" ariaLabel="circles-loading" />
				</div>
			)}

			<Image
				className={s.img}
				src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
				alt={movie.title}
				fill
				priority
				onLoad={() => setIsLoaded(true)}
			/>

			<div className={s.overlay}></div>

			<div className={s.content}>
				<h1>
					{movie.title} ({movie.release_date?.slice(0, 4)})
				</h1>

				<p className={s.description}>{movie.overview}</p>

				<div className={s.raitings}>
					<Raiting name={'TMDB'} raiting={movie.vote_average} />
				</div>

				<Link href={`movies/${movie.id}`} className={s.link}>
					Подробнее
				</Link>
			</div>
		</div>
	)
}
