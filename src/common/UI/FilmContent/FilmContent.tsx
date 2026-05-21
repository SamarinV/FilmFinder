'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Circles } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { PreviewMovie } from '../PreviewMovie/PreviewMovie'
import s from './FilmContent.module.scss'

type Props = {
	data: any
	error: string | null
}

export const FilmContent = ({ data, error }: Props) => {
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		if (error) {
			toast.error(error)
		}
	}, [error])

	const directors =
		data.credits?.crew
			?.filter((person: any) => person.job === 'Director')
			?.map((person: any) => person.name)
			?.join(', ') || ''

	const writers =
		data.credits?.crew
			?.filter((person: any) => person.job === 'Writer')
			?.map((person: any) => person.name)
			?.join(', ') || ''

	return (
		<div className={s.wrapper}>
			<div className={s.content}>
				{data.poster_path && (
					<>
						{!isLoaded && <Circles height="80" width="80" color="#ECEDE6" ariaLabel="circles-loading" />}

						<Image
							src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
							className={s.poster}
							alt={data.title}
							width={350}
							height={450}
							onLoad={() => setIsLoaded(true)}
						/>
					</>
				)}

				<div className={s.aboutFilm}>
					<h1>
						{data.title} ({data.release_date?.slice(0, 4)})
					</h1>

					{/* <div className={s.raitings}>
						<Raiting name="TMDB" raiting={data.vote_average?.toFixed(1)} />
					</div> */}

					<div className={s.filmParam}>
						<p>Год производства</p>
						<span>{data.release_date?.slice(0, 4)}</span>
					</div>

					<div className={s.filmParam}>
						<p>Страна</p>
						<span>{data.production_countries?.map((el: any) => el.name).join(', ')}</span>
					</div>

					<div className={s.filmParam}>
						<p>Жанр</p>

						<span>{data.genres?.map((el: any) => el.name).join(', ')}</span>
					</div>

					{data.tagline && (
						<div className={s.filmParam}>
							<p>Слоган</p>
							<span>{data.tagline}</span>
						</div>
					)}

					<div className={s.filmParam}>
						<p>Режиссер</p>
						<span>{directors}</span>
					</div>

					<div className={s.filmParam}>
						<p>Сценарист</p>
						<span>{writers}</span>
					</div>

					<div className={s.filmParam}>
						<p>Возраст</p>

						<div className={s.ageRating}>
							<div>{data.adult ? '18+' : '13+'}</div>
						</div>
					</div>

					<div className={s.filmParam}>
						<p>Время</p>
						<span>{data.runtime} мин.</span>
					</div>

					<div className={s.description}>
						<span>{data.overview}</span>
					</div>
				</div>
			</div>

			{data.similar?.results?.length > 0 && (
				<div className={s.otherFilms}>
					<p className={s.listTitle}>Похожие фильмы:</p>

					<div className={s.otherFilmsList}>
						{data.similar.results.map((film: any) => {
							return <PreviewMovie film={film} key={film.id} />
						})}
					</div>
				</div>
			)}

			{/* {data.similarMovies && data.similarMovies.length > 0 && (
				<div className={s.otherFilms}>
					<p className={s.listTitle}>Похожие фильмы: </p>
					<div className={s.otherFilmsList}>
						{data.similarMovies.map((el) => {
							return <PreviewMovie film={el} key={`${uuidv4()}`} />
						})}
					</div>
				</div>
			)} */}
		</div>
	)
}
