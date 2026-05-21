import { CollectionMovie } from '@/common/UI'
import { HeroMovie } from '@/common/UI/HeroMovie/HeroMovie'
import { getHeroMovie } from './api/api'

export default async function App() {
	const heroMovie = await getHeroMovie()
	return (
		<div className="flex min-h-screen flex-col">
			<HeroMovie data={heroMovie} />
			<section>
				<CollectionMovie title="Популярные фильмы" collection="popular" />
				<CollectionMovie title="Фильмы России" collection="russia" />
				<CollectionMovie title="Фантастика" collection="fantastic" />
				<CollectionMovie title="Ужасы" collection="horror" />
			</section>
		</div>
	)
}
