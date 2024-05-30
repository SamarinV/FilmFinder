import CardMovie from "../CardMovie/CardMovie"
import { Movie, Movies } from "../types/types"
import s from "./CollectionMovie.module.scss"
import Image from "next/image"

const CollectionMovie = async () => {
  const films = await getFilms()
  console.log(films)
  return (
    <div className={s.wrapper}>
      <h2>Популярные фильмы</h2>
      <div className={s.filmsCollection}>
        {films.map((film) => {
          return <CardMovie film={film} />
        })}
      </div>
    </div>
  )
}

export default CollectionMovie

const getFilms = async () => {
  const apiKey = "GJ51QF5-0BA4QRA-HCCMFJY-SXTZRF2"
  const headers = {
    "X-API-KEY": apiKey,
  }
  const data = await fetch(`https://api.kinopoisk.dev/v1.4/movie?page=1&limit=10&typeNumber=1&lists=top250`, {
    headers,
  })
  const films: Movies = await data.json()
  console.log(films)
  return films.docs
}
