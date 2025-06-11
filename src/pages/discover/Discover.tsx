import styles from './style.module.scss'
import HeaderWidget from '../../widgets/headerWidget/HeaderWidget'
import FooterWidget from '../../widgets/footerWidget/FooterWidget'

export default function Discover() {
	return (
		<div className={styles.as}>
			<HeaderWidget />
			<FooterWidget />
		</div>
	)
}
