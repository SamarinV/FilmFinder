'use client'

import { MovieResult } from '@/common/types'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import s from './HeroMovie.module.scss'

export const HeroMovie = ({ data: movie }: { data: MovieResult | null }) => {
	const [imageFailed, setImageFailed] = useState(false)
	if (!movie)
		return (
			<section className={s.wrapper}>
				<div className={s.content}>
					<p className={s.eyebrow}>МЕСТО ДЛЯ ХОРОШЕГО КИНО</p>
					<h1>Найдите свою историю.</h1>
					<Link href="#collections" className={s.link}>
						К подборкам ↗
					</Link>
				</div>
			</section>
		)
	return (
		<section className={s.wrapper} aria-label="Фильм в фокусе">
			{movie.backdrop_path && !imageFailed && (
				<Image
					className={s.img}
					src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
					alt=""
					fill
					priority
					onError={() => setImageFailed(true)}
					sizes="(max-width: 1328px) 100vw, 1264px"
				/>
			)}
			<div className={s.overlay} />
			<div className={s.content}>
				<p className={s.eyebrow}>
					<span aria-hidden="true" /> ФИЛЬМ В ФОКУСЕ
				</p>
				<div className={s.meta}>
					{movie.vote_average > 0 && (
						<span className={s.score}>
							<span aria-hidden="true">★</span> {movie.vote_average.toFixed(1)} <small>TMDB</small>
						</span>
					)}
					{movie.release_date && <span>{movie.release_date.slice(0, 4)}</span>}
					<span className={s.separator} aria-hidden="true" />
					<span>Полнометражный фильм</span>
				</div>
				<h1>{movie.title}</h1>
				<p className={s.description}>{movie.overview || 'История, с которой стоит познакомиться поближе.'}</p>
				<div className={s.actions}>
					<Link href={`/movies/${movie.id}`} className={s.link}>
						О фильме <span aria-hidden="true">↗</span>
					</Link>
					<Link href="#collections" className={s.secondary}>
						К подборкам <span aria-hidden="true">↓</span>
					</Link>
				</div>
			</div>
			<div className={s.caption}>
				<span>ХОРОШИЕ ИСТОРИИ ОСТАЮТСЯ С НАМИ</span>
				<span aria-hidden="true">01 / В ФОКУСЕ</span>
			</div>
		</section>
	)
}
