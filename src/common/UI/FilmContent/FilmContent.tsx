'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { Movie } from '../../types'
import { PreviewMovie } from '../PreviewMovie/PreviewMovie'
import { Raiting } from '../Raiting/Raiting'
import s from './FilmContent.module.scss'
import { Circles } from 'react-loader-spinner'

type Props = {
	data: Movie
	error: string | null
}

export const FilmContent = ({ data, error }: Props) => {
	const [isLoaded, setIsLoaded] = useState(false)
	useEffect(() => {
		if (error) {
			toast.error(error)
		}
	}, [error])

	return (
		<div className={s.wrapper}>
			<div className={s.content}>
				{data.poster.previewUrl && (
					<>
						{!isLoaded && (
							<Circles
								height="80"
								width="80"
								color="#ECEDE6"
								ariaLabel="circles-loading"
								wrapperStyle={{}}
								wrapperClass=""
							/>
						)}
						<Image
							src={data.poster.url}
							className={s.poster}
							alt=""
							width={350}
							height={450}
							onLoadingComplete={() => setIsLoaded(true)}
						/>
					</>
				)}
				<div className={s.aboutFilm}>
					<h1>
						{data.name || data.alternativeName} ({data.type === 'tv-series' && 'сериал '}
						{data.year})
					</h1>

					<div className={s.raitings}>
						<Raiting name="Кинопоиск" raiting={data.rating.kp} />
						<Raiting name="IMDb" raiting={data.rating.imdb} />
					</div>

					<div className={s.filmParam}>
						<p>Год производства</p>
						<span>{data.year}</span>
					</div>

					<div className={s.filmParam}>
						<p>Страна</p>
						<span>{data.countries.map((el: any) => el.name).join(', ')}</span>
					</div>

					<div className={s.filmParam}>
						<p>Жанр: </p>
						<span>{data.genres.map((el: any) => el.name).join(', ')}</span>
					</div>

					{data.slogan && (
						<div className={s.filmParam}>
							<p>Слоган:</p>
							<span>{data.slogan}</span>
						</div>
					)}

					<div className={s.filmParam}>
						<p>Режисер: </p>
						<span>
							{data.persons
								.filter((el) => el.enProfession === 'director')
								.map((el) => el.name)
								.join(', ')}
						</span>
					</div>

					<div className={s.filmParam}>
						<p>Композитор: </p>
						<span>
							{data.persons
								.filter((el) => el.enProfession === 'composer')
								.map((el) => el.name)
								.join(', ')}
						</span>
					</div>

					<div className={s.filmParam}>
						<p>Оператор: </p>
						<span>
							{data.persons
								.filter((el) => el.enProfession === 'operator')
								.map((el) => el.name)
								.join(', ')}
						</span>
					</div>
					<div className={s.filmParam}>
						<p>Продюсер: </p>
						<span>
							{data.persons
								.filter((el) => el.enProfession === 'producer')
								.map((el) => el.name)
								.join(', ')}
						</span>
					</div>
					<div className={s.filmParam}>
						<p>Сценарист: </p>
						<span>
							{data.persons
								.filter((el) => el.enProfession === 'writer')
								.map((el) => el.name)
								.join(', ')}
						</span>
					</div>

					<div className={s.filmParam}>
						<p>Возврастная категория:</p>
						<div className={s.ageRating}>
							<div>+{data.ageRating}</div>
						</div>
					</div>

					<div className={s.filmParam}>
						<p>Время:</p>
						<span>{data.movieLength || data.seriesLength} мин.</span>
					</div>

					<div className={s.description}>
						<span>{data.description}</span>
					</div>
				</div>
			</div>

			<div className={s.otherFilmsWrapp}>
				{data.sequelsAndPrequels && data.sequelsAndPrequels.length > 0 && (
					<div className={s.otherFilms}>
						<p>Сиквелы: </p>
						<div className={s.otherFilmsList}>
							{data.sequelsAndPrequels.map((el) => {
								return <PreviewMovie film={el} key={`${uuidv4()}`} />
							})}
						</div>
					</div>
				)}

				{data.similarMovies && data.similarMovies.length > 0 && (
					<div className={s.otherFilms}>
						<p className={s.listTitle}>Похожие фильмы: </p>
						<div className={s.otherFilmsList}>
							{data.similarMovies.map((el) => {
								return <PreviewMovie film={el} key={`${uuidv4()}`} />
							})}
						</div>
					</div>
				)}
			</div>
			{/* <Persons persons={data.persons} /> */}
		</div>
	)
}
