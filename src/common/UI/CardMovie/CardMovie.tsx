import Image from "next/image"
import s from "./CardMovie.module.scss"
import { Movie } from "../../types"
import Link from "next/link"
import { PreviewMovie } from "../PreviewMovie/PreviewMovie"

type Props = {
  film: Movie
}

const CardMovie = ({ film }: Props) => {
  console.log(film.poster.previewUrl)
  if (typeof film.poster.previewUrl !== "string") {
    return <></>
  }
  return (
    <Link href={`movies/${film.id}`}>
      <div key={film.id} className={s.film}>
        <Image src={film.poster.previewUrl} alt={film.name} fill />
        <div className={s.filmDetails}>
          <p>{film.year}</p>
          <p>
            {film.countries.map((el) => {
              return el.name + " "
            })}
          </p>
          <p>
            {film.genres.map((el) => {
              return el.name + " "
            })}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default CardMovie
