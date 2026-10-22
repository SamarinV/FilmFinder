'use client'

import { useEffect, useRef, useState } from 'react'
import { Circles } from 'react-loader-spinner'
import { TMDBMovie, TMDBMoviesResponse } from '@/common/types'
import { PreviewMovie } from '../PreviewMovie/PreviewMovie'
import s from './SearchList.module.scss'

type Props = { query: string | undefined }

export default function SearchList({ query }: Props) {
	const [films, setFilms] = useState<TMDBMovie[]>([])
	const [isLoading, setIsLoading] = useState(Boolean(query?.trim()))
	const [error, setError] = useState<string | null>(null)
	const [finished, setFinished] = useState(false)
	const loadMoreRef = useRef<HTMLDivElement>(null)
	const retryRef = useRef<(() => void) | null>(null)

	useEffect(() => {
		const search = query?.trim()
		if (!search) return
		let active = true
		let inFlight = false
		let failed = false
		let nextPage = 1
		let maxPages = 1
		let controller: AbortController | null = null

		const loadMore = async () => {
			if (!active || inFlight || failed || nextPage > maxPages) return
			inFlight = true
			controller = new AbortController()
			setIsLoading(true)
			try {
				const params = new URLSearchParams({ query: search, page: String(nextPage) })
				const response = await fetch(`/api/search?${params}`, { signal: controller.signal })
				if (!response.ok) throw new Error('Search failed')
				const data: TMDBMoviesResponse = await response.json()
				if (!Array.isArray(data.results) || data.page !== nextPage || !Number.isInteger(data.total_pages)) {
					throw new Error('Invalid search response')
				}
				if (!active) return
				setFilms((previous) => {
					const ids = new Set(previous.map((film) => film.id))
					return [
						...previous,
						...data.results.filter((film) => {
							if (ids.has(film.id)) return false
							ids.add(film.id)
							return true
						}),
					]
				})
				nextPage = data.page + 1
				maxPages = Math.min(data.total_pages, 500)
				setFinished(nextPage > maxPages)
			} catch {
				if (!active || controller.signal.aborted) return
				failed = true
				setError('Не удалось загрузить фильмы. Попробуйте ещё раз.')
			} finally {
				inFlight = false
				if (active) setIsLoading(false)
			}
		}

		retryRef.current = () => {
			failed = false
			setError(null)
			void loadMore()
		}
		void loadMore()
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) void loadMore()
			},
			{ rootMargin: '200px' },
		)
		if (loadMoreRef.current) observer.observe(loadMoreRef.current)
		return () => {
			active = false
			controller?.abort()
			observer.disconnect()
			retryRef.current = null
		}
	}, [query])

	return (
		<div className={s.wrapper}>
			<h1>{query?.trim() ? `Результаты поиска: ${query.trim()}` : 'Введите название фильма в поиске'}</h1>
			{films.map((film) => (
				<PreviewMovie key={film.id} film={film} />
			))}
			{!isLoading && !error && finished && films.length === 0 && (
				<p role="status">Ничего не найдено. Попробуйте другое название.</p>
			)}
			{error && (
				<div role="alert">
					<p>{error}</p>
					<button type="button" onClick={() => retryRef.current?.()}>
						Повторить
					</button>
				</div>
			)}
			{isLoading && (
				<div role="status" aria-label="Загрузка фильмов">
					<Circles height="60" width="60" color="#ECEDE6" ariaLabel="Загрузка фильмов" />
				</div>
			)}
			{!isLoading && !error && !finished && films.length > 0 && (
				<button type="button" onClick={() => retryRef.current?.()}>
					Загрузить ещё
				</button>
			)}
			<div ref={loadMoreRef} style={{ minHeight: 1 }} aria-hidden="true" />
		</div>
	)
}
