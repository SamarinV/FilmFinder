'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Circles } from 'react-loader-spinner'

import { TMDBMovie, TMDBMoviesResponse } from '@/common/types'
import { PreviewMovie } from '../PreviewMovie/PreviewMovie'
import s from './SearchList.module.scss'

type Props = {
	query: string | undefined
}

const SearchList = ({ query }: Props) => {
	const [films, setFilms] = useState<TMDBMovie[]>([])
	const [page, setPage] = useState(0)
	const [maxPages, setMaxPages] = useState(1)
	const [isLoading, setIsLoading] = useState(false)

	const loadMoreRef = useRef<HTMLDivElement>(null)

	const loadMore = useCallback(async () => {
		if (isLoading || page >= maxPages || !query) return

		try {
			setIsLoading(true)

			const res = await fetch(`/api/search?query=${query}&page=${page + 1}`)

			if (!res.ok) {
				throw new Error('Failed to fetch')
			}

			const data: TMDBMoviesResponse = await res.json()
			setFilms((prev) => {
				const uniqueFilms = data.results.filter((newFilm) => !prev.some((prevFilm) => prevFilm.id === newFilm.id))

				return [...prev, ...uniqueFilms]
			})

			setPage(data.page)

			setMaxPages(data.total_pages)
		} catch (err) {
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}, [query, page, maxPages, isLoading])

	useEffect(() => {
		if (!query?.trim()) return
		setFilms([])
		setPage(0)
		setMaxPages(1)
	}, [query])

useEffect(() => {
	if (query && page === 0) {
		loadMore()
	}
}, [query, page])

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0]

				if (entry.isIntersecting && !isLoading && page < maxPages) {
					loadMore()
				}
			},
			{
				root: null,
				rootMargin: '0px',
				threshold: 0.5,
			},
		)

		if (loadMoreRef.current) {
			observer.observe(loadMoreRef.current)
		}

		return () => {
			if (loadMoreRef.current) {
				observer.unobserve(loadMoreRef.current)
			}
		}
	}, [page, maxPages, isLoading])

	return (
		<div className={s.wrapper}>
			{query && <p>Результаты поиска для: {query}</p>}

			{films.length > 0 &&
				films.map((film) => {
					if (!film.poster_path || !film.title) return null

					return <PreviewMovie key={film.id} film={film} />
				})}

			{isLoading && <Circles height="80" width="80" color="#ECEDE6" ariaLabel="circles-loading" />}

			<div ref={loadMoreRef}></div>
		</div>
	)
}

export default SearchList
