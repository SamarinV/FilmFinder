import CardMovie from "../CardMovie/CardMovie"
import { Movies } from "../../types"
import s from "./CollectionMovie.module.scss"

type Props = {
	query: string
	title: string
}

export const CollectionMovie = async ({query, title}: Props) => {
  const films = await getFilms(query)
  console.log(films)
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

const getFilms = async (query: string) => {
  const apiKey = "GJ51QF5-0BA4QRA-HCCMFJY-SXTZRF2"
  const headers = {
    "X-API-KEY": apiKey,
  }
  const data = await fetch(`https://api.kinopoisk.dev/v1.4/${query}`, {
    headers,
  })
  const films: Movies = await data.json()
  console.log(films)
  return films.docs
}
