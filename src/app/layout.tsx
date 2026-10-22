import type { Metadata } from 'next'
import { Manrope, Unbounded } from 'next/font/google'
import './globals.scss'
import { Footer } from '@/common/UI/Footer/Footer'
import { Header } from '@/common/UI/Header/Header'

const manrope = Manrope({ subsets: ['latin', 'cyrillic'], variable: '--font-body', display: 'swap' })
const unbounded = Unbounded({ subsets: ['latin', 'cyrillic'], variable: '--font-display', display: 'swap' })

export const metadata: Metadata = {
	title: { default: 'FilmFinder', template: '%s — FilmFinder' },
	description: 'Поиск фильмов, подборки и подробная информация о кино.',
	icons: {
		icon: [
			{ url: '/favicon.ico?v=2', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
			{ url: '/favicon.svg', type: 'image/svg+xml' },
		],
		apple: '/apple-touch-icon.png',
	},
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="ru">
			<body className={`${manrope.variable} ${unbounded.variable}`}>
				<a href="#main-content" className="skip-link">
					К содержимому
				</a>
				<Header />
				<main id="main-content">{children}</main>
				<Footer />
			</body>
		</html>
	)
}
