import Link from 'next/link'
import s from './Footer.module.scss'

export const Footer = () => (
	<footer className={s.footer}>
		<div className={s.inner}>
			<div className={s.invitation}>
				<div>
					<p className={s.eyebrow}>ТИТРЫ? ЕЩЁ НЕ ВРЕМЯ.</p>
					<h2>
						Впереди ещё столько
						<br />
						<span>хорошего кино.</span>
					</h2>
				</div>
				<Link href="/#collections" className={s.pick}>
					Найти свою историю <span aria-hidden="true">↗</span>
				</Link>
			</div>
			<div className={s.middle}>
				<Link className={s.brand} href="/" aria-label="FilmFinder — на главную">
					filmfinder<span>.</span>
				</Link>
				<p>Для вечеров, которые хочется запомнить.</p>
				<nav aria-label="Подборки в футере">
					<Link href="/#popular">Популярное</Link>
					<Link href="/#russia">Наше кино</Link>
					<Link href="/#fantastic">Фантастика</Link>
					<Link href="/#horror">Ужасы</Link>
				</nav>
			</div>
			<div className={s.bottom}>
				<span>© {new Date().getFullYear()} FilmFinder</span>
				<a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
					Данные о фильмах — TMDB <span aria-hidden="true">↗</span>
				</a>
				<span className={s.endnote}>СОХРАНЯЙТЕ ЛЮБОПЫТСТВО</span>
			</div>
		</div>
	</footer>
)
