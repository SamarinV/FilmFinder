import { getFilms } from "@/api/api"
import CardMovie from "../CardMovie/CardMovie"
import s from "./CollectionMovie.module.scss"

type Props = {
	query: string
	title: string
}

export const CollectionMovie = async ({query, title}: Props) => {
  const films = await getFilms(query)
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


