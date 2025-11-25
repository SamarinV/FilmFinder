import Image from 'next/image'
import s from './Persons.module.scss'

type Props = {
	persons: [
		{
			id: number
			photo: string
			name: string
			enName: null
			description: null
			profession: string
			enProfession: string
		}
	]
}

const Persons = ({ persons }: Props) => {
	const actors = persons.filter((p) => p.enProfession === 'actor')
	const crew = persons.filter((p) => p.enProfession !== 'actor')

	return (
		<div className={s.content}>
			<h3 className={s.personsTitle}>В главных ролях</h3>
			<div className={s.persons}>
				{actors.map((p, index) => {
					return (
						<div key={`${p.id}${index}`} className={s.person}>
							<Image className={s.img} src={p.photo} alt="photo" width={110} height={180} />
							<h3>{p.name}</h3>
						</div>
					)
				})}
			</div>
			<h3 className={s.personsTitle}>Съемочная группа</h3>
			<div className={s.persons}>
				{crew.map((p, index) => {
					return (
						<div key={`${p.id}${index}`} className={s.person}>
							<Image className={s.img} src={p.photo} alt="photo" width={110} height={180} />
							<h3>{p.name}</h3>
							<h3>{p.profession.slice(0, -1)}</h3>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Persons
