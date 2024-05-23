import Link from "next/link"
import SearchIcon from "../../../public/icons/search.svg"
import CinemaIcon from "../../../public/icons/movie.png"
import s from "./Header.module.scss"
import Image from "next/image"

export const Header = () => {
  return (
    <>
      <nav className={s.nav}>
        <Link href={"/"}>
          <Image src={CinemaIcon} className={s.cinemaIcon} alt="HomePage" />
        </Link>
        <div className={s.searchContainer}>
          <input className={s.input} placeholder="Поиск" />
          <SearchIcon className={s.searchIcon} />
        </div>
      </nav>

      <header className={s.header}>
				Header content
			</header>
    </>
  )
}
