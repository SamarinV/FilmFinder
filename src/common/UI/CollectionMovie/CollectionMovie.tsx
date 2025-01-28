import CardMovie from "../CardMovie/CardMovie"
import { Movies } from "../../types"
import s from "./CollectionMovie.module.scss"

type Props = {
  collection: MovieCollectionType
  title: string
}

type MovieCollectionType = "popular" | "russia" | "fantastic" | "horror"

export const CollectionMovie = async ({ collection, title }: Props) => {
  const films = await getFilms(collection)
  console.log(films)
	const onFindCollection = () => {
		
	}
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

const getFilms = async (collection: MovieCollectionType) => {
	const endPoints = {
		popular: "movie?page=1&limit=50&typeNumber=1&lists=top250&typeNumber=1",
		russia: "movie?page=1&limit=10&typeNumber=1&rating.kp=7.2-10&genres.name=!документальный&countries.name=Россия",
		fantastic: "movie?page=1&limit=10&typeNumber=1&rating.kp=7.2-10&genres.name=фантастика",
		horror: "movie?page=1&limit=10&typeNumber=1&rating.kp=7.2-10&genres.name=ужасы"
	}
  const query =
    collection === "popular"
      ? endPoints.popular
      : collection === "russia"
      ? endPoints.russia
      : collection === "fantastic"
			? endPoints.fantastic
			: collection === "horror"
			? endPoints.horror
			: ""
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
