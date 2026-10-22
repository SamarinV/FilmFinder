import { Circles } from 'react-loader-spinner'
import s from './Loader.module.scss'

type Props = {
	isLoading: boolean
}

const Loader = ({ isLoading }: Props) => {
	if (!isLoading) return null
	return (
		<div className={s.loader}>
			<Circles height="80" width="80" color="#ECEDE6" ariaLabel="circles-loading" />
		</div>
	)
}

export default Loader
