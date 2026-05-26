import { Circles } from 'react-loader-spinner'
import s from './Loader.module.scss'

type Props = {
	isLoaading: boolean
}

const Loader = ({ isLoaading }: Props) => {
	if (!isLoaading) return null
	return (
		<div className={s.loader}>
			<Circles height="80" width="80" color="#ECEDE6" ariaLabel="circles-loading" />
		</div>
	)
}

export default Loader
