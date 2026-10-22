'use client'

import Image from 'next/image'
import { useState } from 'react'
import { MovieDetails } from '@/common/types'
import { PreviewMovie } from '../PreviewMovie/PreviewMovie'
import s from './FilmContent.module.scss'
import { Raiting } from '../Raiting/Raiting'
import Loader from '../Loader/Loader'
import MovieTrailer from './MovieTrailer'

type Props = {
	data: MovieDetails
}

export const FilmContent = ({ data }: Props) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const [imageFailed, setImageFailed] = useState(false)

	const directors =
		data.credits?.crew
			?.filter((person) => person.job === 'Director')
			?.map((person) => person.name)
			?.join(', ') || ''

	const writers =
		data.credits?.crew
			?.filter((person) => ['Writer', 'Screenplay', 'Story'].includes(person.job))
			?.map((person) => person.name)
			?.join(', ') || ''

	return (
		<div className={s.wrapper}>
			<div className={s.content}>
				{data.poster_path && !imageFailed ? (
					<div className={s.posterContainer}>
						<Loader isLoading={!isLoaded} />

						<Image
							src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
							className={s.poster}
							alt={data.title}
							width={350}
							height={450}
							onLoad={() => setIsLoaded(true)}
							onError={() => setImageFailed(true)}
						/>
					</div>
				) : (
					<div className={s.posterContainer}>Нет изображения</div>
				)}

				<div className={s.aboutFilm}>
					<h1>
						{data.title} ({data.release_date?.slice(0, 4)})
					</h1>

					<div className={s.raitings}>
						<Raiting name="TMDB" raiting={data.vote_average} />
					</div>
					<MovieTrailer videos={data.videos?.results} movieTitle={data.title} />

					<div className={s.filmParam}>
						<p>Год производства</p>
						<span>{data.release_date?.slice(0, 4)}</span>
					</div>

					<div className={s.filmParam}>
						<p>Страна</p>
						<span>{data.production_countries?.map((el) => el.name).join(', ') || 'Не указана'}</span>
					</div>

					<div className={s.filmParam}>
						<p>Жанр</p>

						<span>{data.genres?.map((el) => el.name).join(', ') || 'Не указан'}</span>
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

						<span>Не указан</span>
					</div>

					<div className={s.filmParam}>
						<p>Время</p>
						<span>{data.runtime ? `${data.runtime} мин.` : 'Не указано'}</span>
					</div>

					<div className={s.description}>
						<span>{data.overview || 'Описание отсутствует'}</span>
					</div>
				</div>
			</div>

			{data.similar && data.similar.results.length > 0 && (
				<div className={s.otherFilms}>
					<p className={s.listTitle}>Похожие фильмы:</p>

					<div className={s.otherFilmsList}>
						{data.similar.results.map((film) => {
							return <PreviewMovie film={film} key={film.id} />
						})}
					</div>
				</div>
			)}
		</div>
	)
}
