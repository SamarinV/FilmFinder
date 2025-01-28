import { Movie, MovieImages } from "../../types"
import Image from "next/image"
import s from "./FilmContent.module.scss"
import Persons from "./Persons/Persons"
import { Raiting } from '../Raiting/Raiting';

type Props = {
  data: Movie
  images: MovieImages
}

export const FilmContent = ({ data, images }: Props) => {
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
            <p>Страна</p>
            <span>{data.countries.map((el)=> {
							return el.name + ' '
						})}</span>
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
            <p>Режисер: </p>
            <span>
							{data.persons
  							.filter((el) => el.enProfession === 'director')
  							.map((el) => el.name)
  							.join(', ')}
            </span>
          </div>

					<div className={s.filmParam}>
            <p>Композитор: </p>
            <span>
							{data.persons
  							.filter((el) => el.enProfession === 'composer')
  							.map((el) => el.name)
  							.join(', ')}
            </span>
          </div>

					<div className={s.filmParam}>
            <p>Оператор: </p>
            <span>
							{data.persons
  							.filter((el) => el.enProfession === 'operator')
  							.map((el) => el.name)
  							.join(', ')}
            </span>
          </div>
					<div className={s.filmParam}>
            <p>Продюсер: </p>
            <span>
							{data.persons
  							.filter((el) => el.enProfession === 'producer')
  							.map((el) => el.name)
  							.join(', ')}
            </span>
          </div>
					<div className={s.filmParam}>
            <p>Сценарист: </p>
            <span>
							{data.persons
  							.filter((el) => el.enProfession === 'writer')
  							.map((el) => el.name)
  							.join(', ')
								}
            </span>
          </div>

          <div className={s.filmParam}>
            <p>Возврастная категория:</p>
            <div className={s.ageRating}>
							<div>
								+{data.ageRating}
							</div>
						</div>
          </div>

          <div className={s.filmParam}>
            <p>Время:</p>
            <span>{data.movieLength || data.seriesLength} мин.</span>
          </div>

          <div className={s.description}>
            <span>{data.description}</span>
          </div>
        </div>

				<div className={s.raitings}>
					<Raiting name="Кинопоиск" raiting={data.rating.kp} />
					<Raiting name="IMDb" raiting={data.rating.imdb} />
				</div>

      </div>

      <Persons persons={data.persons} />
    </div>
  )
}
