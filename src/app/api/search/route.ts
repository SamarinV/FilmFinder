import { NextRequest, NextResponse } from 'next/server'
import { Movies } from '@/common/types'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const query = searchParams.get('query') || ''
	const page = searchParams.get('page') || '1'

	const apiKey = 'GJ51QF5-0BA4QRA-HCCMFJY-SXTZRF2'
	const res = await fetch(`https://api.kinopoisk.dev/v1.4/movie/search?page=${page}&limit=10&query=${query}`, {
		headers: { 'X-API-KEY': apiKey },
	})

	if (!res.ok) {
		return NextResponse.json({ error: 'Failed to fetch from Kinopoisk' }, { status: 500 })
	}

	const data: Movies = await res.json()
	return NextResponse.json(data)
}
