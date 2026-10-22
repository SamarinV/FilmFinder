'use client'

import { useEffect, useId, useRef, useState } from 'react'
import type { TMDBVideo } from '@/common/types'
import { selectTrailer, type Trailer } from '@/common/lib/trailers'
import s from './MovieTrailer.module.scss'

function TrailerDialog({
	trailer,
	movieTitle,
	onClose,
}: {
	trailer: Trailer
	movieTitle: string
	onClose: () => void
}) {
	const dialog = useRef<HTMLDialogElement>(null)
	const titleId = useId()
	const noteId = useId()
	const label = trailer.type === 'Teaser' ? 'Тизер' : 'Трейлер'
	useEffect(() => {
		const element = dialog.current
		const trigger = document.activeElement
		element?.showModal()
		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return () => {
			element?.close()
			document.body.style.overflow = previousOverflow
			if (trigger instanceof HTMLElement) trigger.focus()
		}
	}, [])
	return (
		<dialog
			ref={dialog}
			className={s.dialog}
			aria-labelledby={titleId}
			aria-describedby={noteId}
			onCancel={(event) => {
				event.preventDefault()
				onClose()
			}}
			onPointerDown={(event) => {
				if (event.target === event.currentTarget) onClose()
			}}
		>
			<div className={s.panel}>
				<div className={s.header}>
					<div>
						<p className={s.eyebrow}>
							{label} · {trailer.languageLabel}
						</p>
						<h2 id={titleId}>{movieTitle}</h2>
					</div>
					<button type="button" className={s.close} onClick={onClose} aria-label="Закрыть трейлер">
						×
					</button>
				</div>
				<div className={s.player}>
					<iframe
						src={trailer.embedUrl}
						title={`${label} фильма «${movieTitle}» — ${trailer.languageLabel}`}
						allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
						allowFullScreen
						referrerPolicy="strict-origin-when-cross-origin"
					/>
				</div>
				<div className={s.footer}>
					<p id={noteId}>
						Видео с {trailer.site}. Если плеер не загружается, попробуйте открыть на площадке. Доступность
						зависит от вашей сети.
					</p>
					<a href={trailer.watchUrl} target="_blank" rel="noopener noreferrer">
						Открыть на {trailer.site} <span aria-hidden="true">↗</span>
					</a>
				</div>
			</div>
		</dialog>
	)
}

export default function MovieTrailer({
	videos,
	movieTitle,
}: {
	videos: TMDBVideo[] | undefined
	movieTitle: string
}) {
	const [isOpen, setIsOpen] = useState(false)
	const trailer = selectTrailer(videos)
	if (!trailer) return null
	return (
		<div className={s.wrapper}>
			<button
				type="button"
				className={s.trigger}
				onClick={() => setIsOpen(true)}
				aria-haspopup="dialog"
				aria-expanded={isOpen}
			>
				<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
					<path d="M4 2.5a.5.5 0 0 1 .75-.43l9 5.5a.5.5 0 0 1 0 .86l-9 5.5A.5.5 0 0 1 4 13.5z" />
				</svg>
				{trailer.type === 'Teaser' ? 'Смотреть тизер' : 'Смотреть трейлер'}
			</button>
			<span className={s.source}>
				{trailer.languageLabel} · {trailer.site}
			</span>
			{isOpen && <TrailerDialog trailer={trailer} movieTitle={movieTitle} onClose={() => setIsOpen(false)} />}
		</div>
	)
}
