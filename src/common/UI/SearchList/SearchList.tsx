'use client'
import { Movie, Movies } from '@/common/types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Circles } from 'react-loader-spinner'
import { PreviewMovie } from '../PreviewMovie/PreviewMovie'
import s from './SearchList.module.scss'

type Props = {
	query: string | undefined
}

const SearchList = ({ query }: Props) => {
	const [films, setFilms] = useState<Movie[]>([])
	const [page, setPage] = useState(0)
	const [maxPages, setMaxPages] = useState(1)
	const [isLoading, setIsLoading] = useState(false)
	const loadMoreRef = useRef<HTMLDivElement>(null)
	const loadMore = useCallback(async () => {
		if (isLoading || page >= maxPages) return

		try {
			setIsLoading(true)
			const res = await fetch(`/api/search?query=${query}&page=${page + 1}`)
			if (!res.ok) throw new Error('Failed to fetch')
			const data: Movies = await res.json()
			setFilms((prev) => [...prev, ...data.docs])
			setPage((prev) => prev + 1)
			setMaxPages(data.pages)
		} catch (err) {
			console.error(err)
		} finally {
			setIsLoading(false)
		}
	}, [query, page, maxPages, isLoading])

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
			}
		)

		if (loadMoreRef.current) observer.observe(loadMoreRef.current)
		return () => {
			if (loadMoreRef.current) observer.unobserve(loadMoreRef.current)
		}
	}, [loadMoreRef.current, page, maxPages, isLoading])
	

	return (
		<div className={s.wrapper}>
			{query && <p>Результаты поиска для: {query}</p>}
			{films.length > 0 &&
				films.map((film, index) => {
					if (!film.poster?.previewUrl || film.name.length === 0) return null

					return <PreviewMovie film={film} />
				})}

			<Circles
				height="80"
				width="80"
				color="#ECEDE6"
				ariaLabel="circles-loading"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>

			<div ref={loadMoreRef}></div>
		</div>
	)
}

export default SearchList
