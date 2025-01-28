'use client'

import Image from "next/image"
import Link from "next/link"
import CinemaIcon from "../../../../public/icons/movie.png"
import SearchIcon from "../../../../public/icons/search.svg"
import s from "./Header.module.scss"
import { ChangeEvent, useState } from "react"

export const Header = () => {
	const [searchValue, setSearchValue] = useState('')
	const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <Link href={"/"}>
          <Image src={CinemaIcon} className={s.cinemaIcon} alt="HomePage" />
        </Link>
        <div className={s.searchContainer}>
          <input className={s.input} placeholder="Поиск" value={searchValue} onChange={(e)=> onChangeSearchValue(e)} />
          <SearchIcon className={s.searchIcon} />
        </div>
      </nav>

    </header>
  )
}



