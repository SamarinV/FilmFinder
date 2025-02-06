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

	  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(searchValue)}`
    }
  }
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <Link href={"/"}>
          <Image src={CinemaIcon} className={s.cinemaIcon} alt="HomePage" />
        </Link>
        <form className={s.searchContainer} onSubmit={onSubmit}>
          <input className={s.input} placeholder="Поиск" value={searchValue} onChange={(e)=> onChangeSearchValue(e)} />
          <SearchIcon onClick={onSubmit} className={s.searchIcon} />
        </form>
      </nav>

    </header>
  )
}



