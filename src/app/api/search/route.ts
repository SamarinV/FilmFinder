import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const query = req.nextUrl.searchParams.get('query')
	const page = req.nextUrl.searchParams.get('page') || '1'

	const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&language=ru-RU&page=${page}`, {
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
		},
	})

	const data = await response.json()

	return NextResponse.json(data)
}
