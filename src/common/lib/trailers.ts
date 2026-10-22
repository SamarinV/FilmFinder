import type { TMDBVideo } from '@/common/types'

export type Trailer = TMDBVideo & { embedUrl: string; watchUrl: string; languageLabel: string }

function toTrailer(video: TMDBVideo): Trailer | null {
	if (!video || !['Trailer', 'Teaser'].includes(video.type) || typeof video.key !== 'string') return null
	let embedUrl: string
	let watchUrl: string
	if (video.site === 'YouTube' && /^[a-zA-Z0-9_-]{11}$/.test(video.key)) {
		embedUrl = `https://www.youtube-nocookie.com/embed/${video.key}?rel=0&playsinline=1&hl=ru`
		watchUrl = `https://www.youtube.com/watch?v=${video.key}`
	} else if (video.site === 'Vimeo' && /^\d{1,12}$/.test(video.key)) {
		embedUrl = `https://player.vimeo.com/video/${video.key}?dnt=1`
		watchUrl = `https://vimeo.com/${video.key}`
	} else return null
	const languageLabel =
		video.iso_639_1 === 'ru'
			? 'На русском'
			: video.iso_639_1 === 'en'
				? 'На английском'
				: video.iso_639_1
					? `Язык: ${video.iso_639_1}`
					: 'Язык не указан'
	return { ...video, embedUrl, watchUrl, languageLabel }
}

// Prefer Russian, then a full trailer, then the official and most recent release.
export function selectTrailer(videos: readonly TMDBVideo[] | undefined): Trailer | null {
	if (!Array.isArray(videos)) return null
	const candidates = videos.map(toTrailer).filter((video): video is Trailer => video !== null)
	const rank = (video: Trailer) =>
		(video.iso_639_1 === 'ru' ? 0 : video.iso_639_1 === 'en' ? 100 : 200) +
		(video.type === 'Trailer' ? 0 : 20) +
		(video.official ? 0 : 10)
	candidates.sort(
		(a, b) => rank(a) - rank(b) || (Date.parse(b.published_at) || 0) - (Date.parse(a.published_at) || 0),
	)
	return candidates[0] ?? null
}
