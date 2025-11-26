'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Raiting } from '..'
import { Movie } from '../../types'
import s from './HeroMovie.module.scss'
import { Circles } from 'react-loader-spinner'
import { useState } from 'react'

type Props = {
	data: Movie
}

export const HeroMovie = ({ data }: Props) => {
	const [isLoaded, setIsLoaded] = useState(false)
	return (
		<div className={s.wrapper}>
			{!isLoaded && (
				<div className={s.loader}>
					<Circles
						height="50"
						width="50"
						color="#ECEDE6"
						ariaLabel="circles-loading"
						wrapperStyle={{}}
						wrapperClass=""
					/>
				</div>
			)}
			<Image
				className={s.img}
				src={data.backdrop.url ? data.backdrop.url : ''}
				alt="Poster"
				fill
				priority={true}
				onLoadingComplete={() => setIsLoaded(true)}
			/>
			<div className={s.overlay}></div>
			<div className={s.content}>
				<h1>
					{data.name} ({data.year})
				</h1>
				{data.slogan && (
					<div className={s.filmParam}>
						<span>{data.slogan}</span>
					</div>
				)}
				<p className={s.description}>{data.description}</p>

				<div className={s.raitings}>
					<Raiting name={'Кинопоиск'} raiting={data.rating.kp} />
					<Raiting name={'IMDb'} raiting={data.rating.imdb} />
				</div>

				<Link href={`movies/${data.id}`} className={s.link}>
					Подробнее
				</Link>
			</div>
		</div>
	)
}
