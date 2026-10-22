'use client'

import Link from 'next/link'

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<div className="status-page" role="alert">
			<h1>Не удалось загрузить страницу</h1>
			<p>Сервис фильмов временно недоступен. Попробуйте ещё раз.</p>
			<button type="button" onClick={reset}>
				Повторить
			</button>
			<Link href="/">На главную</Link>
		</div>
	)
}
