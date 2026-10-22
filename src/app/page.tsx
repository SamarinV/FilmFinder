import Link from 'next/link'
import { CollectionMovie } from '@/common/UI/CollectionMovie/CollectionMovie'
import { HeroMovie } from '@/common/UI/HeroMovie/HeroMovie'
import { getHeroMovie } from './api/api'
import s from './page.module.scss'

export const revalidate = 3600

export default async function App() {
	const heroMovie = await getHeroMovie()
	return (
		<div className={s.page}>
			<HeroMovie data={heroMovie} />
			<section id="collections" className={s.explore} aria-labelledby="explore-title">
				<div className={s.intro}>
					<div>
						<p className={s.eyebrow}>МЕНЬШЕ ПОИСКОВ. БОЛЬШЕ КИНО.</p>
						<h2 id="explore-title">Что посмотрим сегодня?</h2>
					</div>
					<p className={s.note}>
						Знакомые любимые и новые открытия.
						<br />
						Выберите, с чего начнётся ваш вечер.
					</p>
				</div>
				<nav className={s.genres} aria-label="Подборки по настроению">
					{[
						['popular', 'На слуху'],
						['russia', 'Наше кино'],
						['fantastic', 'За пределами реальности'],
						['horror', 'Пощекотать нервы'],
					].map(([id, label], index) => (
						<Link key={id} href={`#${id}`}>
							<span className={s.number}>0{index + 1}</span>
							<span>{label}</span>
							<span className={s.arrow} aria-hidden="true">
								↗
							</span>
						</Link>
					))}
				</nav>
			</section>
			<div className={s.collections}>
				<CollectionMovie title="Сейчас на слуху" collection="popular" />
				<CollectionMovie title="Кино с нашим характером" collection="russia" />
				<CollectionMovie title="За пределами реальности" collection="fantastic" />
				<CollectionMovie title="Когда хочется мурашек" collection="horror" />
			</div>
		</div>
	)
}
