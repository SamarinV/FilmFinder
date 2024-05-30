"use client"

import s from "./PreviewMovie.module.scss"
import { Film } from "../types/types"
import Link from "next/link"

type Props = {
  data: Film
}

const PreviewMovie = ({ data }: Props) => {
  return (
    <div
      className={s.content}
      style={{
        backgroundImage: `linear-gradient(0deg, rgb(20, 20, 20) 4%, rgba(20, 20, 20, 0.46) 100%), url(${data.backdrop.url})`,
      }}
    >
      <h1>
        {data.name} ({data.year})
      </h1>
      {data.slogan && (
        <div className={s.filmParam}>
          <span>{data.slogan}</span>
        </div>
      )}
      <Link href={`movies/${data.id}`} className={s.link}>
        Подробнее
      </Link>
    </div>
  )
}

export default PreviewMovie
