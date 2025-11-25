import s from './Footer.module.scss'

export const Footer = () => {
	const currentYear = new Date().getFullYear()
	return (
		<footer className={s.footer}>
			<span>2024 - {currentYear}</span>
		</footer>
	)
}
