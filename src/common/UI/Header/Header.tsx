import Image from "next/image"
import Link from "next/link"
import CinemaIcon from "../../../../public/icons/movie.png"
import SearchIcon from "../../../../public/icons/search.svg"
import s from "./Header.module.scss"

export const Header = () => {
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <Link href={"/"}>
          <Image src={CinemaIcon} className={s.cinemaIcon} alt="HomePage" />
        </Link>
        <div className={s.searchContainer}>
          <input className={s.input} placeholder="Поиск" />
          <SearchIcon className={s.searchIcon} />
        </div>
      </nav>

    </header>
  )
}



