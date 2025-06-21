import FooterWidget from '../../widgets/footerWidget/FooterWidget'
import TrendingSongsWidget from '../../widgets/trendingSongsWidget/TrendingSongsWidget'
import WeeklyTopWidget from '../../widgets/weeklyTopSongsWidget/WeeklyTopSongsWidget'
import MoodPlaylistWidget from '../../widgets/moodPlaylistWidget/MoodPlaylist'
import PopularArtists from '../../widgets/popularArtistsWidget/PopularArtistsWidget'
import TrendingHitsMixWidget from '../../widgets/trendingHitsMixWidget/TrendingHitsMixWidget'
import styles from './style.module.scss'

export default function Agists() {
	return (
		<div className={styles.as}>
			<TrendingHitsMixWidget />
			<TrendingSongsWidget />
			<WeeklyTopWidget />
			<WeeklyTopWidget />
			<MoodPlaylistWidget />
			<PopularArtists />
			<FooterWidget />
		</div>
	)
}
