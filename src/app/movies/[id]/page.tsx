import { getMovieById, TMDBError } from '@/app/api/api'
import { FilmContent } from '@/common/UI/FilmContent/FilmContent'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import type { Metadata } from 'next'

type Props = { params: Promise<{ id: string }> }

const loadMovie = cache(async (id: string) => {
	if (!/^\d+$/.test(id) || Number(id) < 1 || !Number.isSafeInteger(Number(id))) notFound()
	try {
		return await getMovieById(id)
	} catch (error) {
		if (error instanceof TMDBError && error.status === 404) notFound()
		throw error
	}
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const movie = await loadMovie((await params).id)
	return { title: movie.title, description: movie.overview?.slice(0, 160) || 'Информация о фильме.' }
}

export default async function MoviePage({ params }: Props) {
	const movie = await loadMovie((await params).id)
	return <FilmContent key={movie.id} data={movie} />
}
