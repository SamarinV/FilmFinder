import s from './Rating.module.scss'

type Props = {
	name: 'TMDB'
	raiting: number | null
}

export const Raiting = ({ raiting, name }: Props) => {
	if (raiting === null || !Number.isFinite(raiting) || raiting <= 0) {
		return null
	}
	return (
		<div className={s.raitingItem}>
			<p className={s.name}>{name}</p>
			<span className={s.kp}>{raiting.toFixed(1)}</span>
		</div>
	)
}
