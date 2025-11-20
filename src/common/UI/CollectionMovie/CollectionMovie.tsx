import { getFilms } from "@/api/api"
import CardMovie from "../CardMovie/CardMovie"
import s from "./CollectionMovie.module.scss"

type Props = {
  collection: string
  title: string
}

export const CollectionMovie = async ({ collection, title }: Props) => {
	const films = await getFilms(collection)
	return (
		<div className={s.wrapper}>
			<h2>{title}</h2>
			<div className={s.filmsCollection}>
				{films.map((film) => {
					return <CardMovie film={film} />
				})}
			</div>
		</div>
	)
}

