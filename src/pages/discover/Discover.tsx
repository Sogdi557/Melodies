import styles from './style.module.scss'
import HeaderWidget from '../../widgets/headerWidget/HeaderWidget'
import FooterWidget from '../../widgets/footerWidget/FooterWidget'
import MoodPlaylist from '../../widgets/moodPlaylistWidget/MoodPlaylist'
import PopularArtists from '../../widgets/popularArtistsWidget/PopularArtistsWidget'
import MusicVideoSection from '../../widgets/musicVideoWidget/MusicVideoWidget'
import NewReleaseSongs from '../../widgets/weeklyTopSongsWidget/WeeklyTopSongsWidget'
import TopAlbums from '../../widgets/topAlbumsWidget/TopAlbums'
import MusicGenres from '../../widgets/musicGenresWidget/MusicGenresWidget'

export default function Discover() {
	return (
		<div className={styles.as}>
			<HeaderWidget />
			<MusicGenres />
			<MoodPlaylist />
			<PopularArtists />
			<MusicVideoSection />
			<NewReleaseSongs />
			<TopAlbums />
			<FooterWidget />
		</div>
	)
}
