import { Film, FilmImages } from "../types/types"
import Image from "next/image"
import s from "./FilmContent.module.scss"
import Persons from "./Persons/Persons"

type Props = {
  data: Film
	images: FilmImages
}

const FilmContent = ({ data, images }: Props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        {data.poster.previewUrl && (
          <Image src={data.poster.previewUrl} className={s.poster} alt="" width={300} height={300} />
        )}
        <div className={s.aboutFilm}>
          <h1>
            {data.name || data.alternativeName} ({data.type === "tv-series" && "сериал "}
            {data.year})
          </h1>

          <div className={s.filmParam}>
            <p>Год производства</p>
            <span>{data.year}</span>
          </div>

          <div className={s.filmParam}>
            <p>Жанр: </p>
            <span>
              {data.genres.map((el: any) => {
                return el.name + " "
              })}
            </span>
          </div>

          {data.slogan && (
            <div className={s.filmParam}>
              <p>Слоган:</p>
              <span>{data.slogan}</span>
            </div>
          )}

          <div className={s.filmParam}>
            <p>Год производства:</p>
            <span>{data.year}</span>
          </div>

          <div className={s.filmParam}>
            <p>Возврастная категория:</p>
            <span className={s.ageRating}>+{data.ageRating}</span>
          </div>

          <div className={s.filmParam}>
            <p>Время:</p>
            <span>{data.movieLength || data.seriesLength} мин.</span>
          </div>

          <div className={s.filmParam}>
            <p>Описание: </p>
            <span>{data.description}</span>
          </div>
        </div>
      </div>

			<Persons persons={data.persons} />
    </div>
  )
}

export default FilmContent
