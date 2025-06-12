import React from 'react'
import styles from './style.module.scss'
import HeaderTrendingSongsWidget from '../../widgets/headerTrendingWidget/HeaderTrendingWidget'
import TrendingBeatsWidget from '../../widgets/trendingBeatsWidget/TrendingBeatsWidget'
import FooterWidget from '../../widgets/footerWidget/FooterWidget'

export default function Albums() {
	return (
		<div className={styles.as}>
			<HeaderTrendingSongsWidget />
			<TrendingBeatsWidget />
			<FooterWidget />
		</div>
	)
}
