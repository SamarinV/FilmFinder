'use client'

import { Movie } from "@/common/types";
import Image from "next/image";
import Link from "next/link";
import s from './SearchFilms.module.scss';
import { Raiting } from "../Raiting/Raiting";
import { useEffect } from "react";

type Props = {
	films: Movie[]
	query: string | undefined
	isLoading: boolean
}

const SearchFilms = ({films, query, isLoading}: Props) => {
	console.log(films)

	if(isLoading){
		return <p>Загрузка...</p>
	}
	return (
	<div className={s.wrapper}>
		{query && <p>Результаты поиска для: {query}</p>}
      {films.length > 0 && films.map((film) => (
				<>
					{film.name.length > 0 && 
						<div className={s.filmItem} key={film.id}>
							{film.poster.previewUrl !== null &&
								<Image alt={`${film.name}`} src={`${film.poster.url}`} width={300} height={450} />
							}
							<div className={s.aboutFilm}>
								<h3 className={s.name}>{film.name}{` (${film.year})`}</h3>

								<div className={s.raitings}>
									<Raiting name="Кинопоиск" raiting={film.rating.kp} />
									<Raiting name="IMDb" raiting={film.rating.imdb} />
								</div>

								<div className={s.filmParam}>
            			<p>Страна</p>
            			<span>{film.countries.map((el)=> {
										return el.name + ' '
									})}</span>
          			</div>

								<div className={s.filmParam}>
            			<p>Жанр: </p>
            			<span>
              			{film.genres.map((el: any) => {
                			return el.name + " "
              			})}
            			</span>
          			</div>

								<div className={s.filmParam}>
            			<p>Время:</p>
            			<span>{film.movieLength || film.seriesLength} мин.</span>
          			</div>

								<h2 className={s.description}>{film.description}</h2>
							 	<Link href={`movies/${film.id}`} className={s.link}>
          				Подробнее
        				</Link>
							</div>
						</div>
					}
				
				</>
      ))}
	</div> );
}
 
export default SearchFilms;