'use client'

import { ReactNode, useRef } from 'react'
import s from './CollectionMovie.module.scss'

export default function CollectionRail({
	id,
	title,
	subtitle,
	children,
}: {
	id: string
	title: string
	subtitle: string
	children: ReactNode
}) {
	const rail = useRef<HTMLDivElement>(null)
	const scroll = (direction: number) => {
		if (!rail.current) return
		rail.current.scrollBy({
			left: direction * rail.current.clientWidth * 0.8,
			behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
		})
	}
	return (
		<section className={s.wrapper} id={id} aria-labelledby={`${id}-title`}>
			<div className={s.heading}>
				<div>
					<p className={s.subtitle}>{subtitle}</p>
					<h2 className={s.title} id={`${id}-title`}>
						{title}
					</h2>
				</div>
				<div className={s.controls}>
					<button
						type="button"
						onClick={() => scroll(-1)}
						aria-label={`Прокрутить подборку «${title}» назад`}
					>
						←
					</button>
					<button
						type="button"
						onClick={() => scroll(1)}
						aria-label={`Прокрутить подборку «${title}» вперёд`}
					>
						→
					</button>
				</div>
			</div>
			<div className={s.filmsCollection} ref={rail}>
				{children}
			</div>
		</section>
	)
}
