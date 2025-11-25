import s from './Rating.module.scss'

type Props = {
	name: 'Кинопоиск' | 'IMDb'
	raiting: number | null
}

export const Raiting = ({ raiting, name }: Props) => {
	if (!raiting) {
		return
	}
	return (
		<div className={s.raitingItem}>
			<p className={s.name}>{name}</p>
			<span className={s.kp}>{raiting.toFixed(1)}</span>
		</div>
	)
}
