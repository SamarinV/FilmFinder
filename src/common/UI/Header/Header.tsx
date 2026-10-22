'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import s from './Header.module.scss'

export const Header = () => {
	const router = useRouter()
	const [searchValue, setSearchValue] = useState('')
	const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)
	const onSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		if (searchValue.trim()) router.push(`/search?${new URLSearchParams({ query: searchValue.trim() })}`)
	}
	return (
		<header className={s.header}>
			<nav className={s.nav} aria-label="Основная навигация">
				<Link href="/" className={s.brand} aria-label="FilmFinder — на главную">
					<span className={s.brandMark} aria-hidden="true">
						<svg viewBox="0 0 24 24" fill="none">
							<path d="M7 19V5h12M7 12h9" stroke="currentColor" strokeWidth="3" />
							<path d="M3 5h1M3 12h1M3 19h1" stroke="currentColor" strokeWidth="2" />
						</svg>
					</span>
					<span>
						film<span className={s.brandAccent}>finder</span>
						<span className={s.brandDot}>.</span>
					</span>
				</Link>
				<Link className={s.discover} href="/#collections">
					Открывать кино <span aria-hidden="true">↗</span>
				</Link>
				<form className={s.searchContainer} onSubmit={onSubmit} role="search">
					<label className="sr-only" htmlFor="movie-search">
						Название фильма
					</label>
					<input
						id="movie-search"
						type="search"
						maxLength={200}
						className={s.input}
						placeholder="Фильм для вашего вечера"
						value={searchValue}
						onChange={onChangeSearchValue}
					/>
					<button type="submit" className={s.searchButton} aria-label="Найти фильм">
						<svg
							className={s.searchIcon}
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							aria-hidden="true"
						>
							<circle cx="10.5" cy="10.5" r="7.5" />
							<path d="m16 16 6 6" />
						</svg>
					</button>
				</form>
			</nav>
		</header>
	)
}
