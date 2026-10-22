import { NextRequest, NextResponse } from 'next/server'
import { searchMovies, TMDBError } from '../api'

export async function GET(req: NextRequest) {
	const query = req.nextUrl.searchParams.get('query')?.trim()
	const rawPage = req.nextUrl.searchParams.get('page') ?? '1'
	const page = Number(rawPage)
	if (
		!query ||
		query.length > 200 ||
		!/^\d+$/.test(rawPage) ||
		!Number.isInteger(page) ||
		page < 1 ||
		page > 500
	) {
		return NextResponse.json(
			{ error: 'Введите запрос до 200 символов и страницу от 1 до 500.' },
			{ status: 400 },
		)
	}
	try {
		const data = await searchMovies(query, page)
		if (!Array.isArray(data.results) || !Number.isInteger(data.page) || !Number.isInteger(data.total_pages)) {
			throw new TMDBError(502)
		}
		return NextResponse.json(data)
	} catch (error) {
		const status =
			error instanceof TMDBError && error.status === 429
				? 429
				: error instanceof TMDBError && error.status === 503
					? 503
					: 502
		return NextResponse.json({ error: 'Не удалось загрузить фильмы. Попробуйте ещё раз позже.' }, { status })
	}
}
