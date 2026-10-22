import Link from 'next/link'

export default function NotFound() {
	return (
		<div className="status-page">
			<h1>Страница не найдена</h1>
			<p>Проверьте адрес или найдите другой фильм.</p>
			<Link href="/">На главную</Link>
		</div>
	)
}
