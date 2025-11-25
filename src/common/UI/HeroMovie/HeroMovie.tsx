import Image from 'next/image'
import Link from 'next/link'
import { Raiting } from '..'
import { Movie } from '../../types'
import s from './HeroMovie.module.scss'

type Props = {
	data: Movie
}

export const HeroMovie = ({ data }: Props) => {
	return (
		<div className={s.wrapper}>
			<Image className={s.img} src={data.backdrop.url ? data.backdrop.url : ''} alt="Poster" fill priority={true} />
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
