import LandingWidget from '../../widgets/landingWidget/LandingWidget'
import FooterWidget from '../../widgets/footerWidget/FooterWidget'
import style from './style.module.scss'
// import SignUpForm from '../../widgets/signUpForm/SignUpForm'
import TrendingSongsWidget from '../../widgets/trendingSongsWidget/TrendingSongsWidget'
import MusicVideoWidget from '../../widgets/musicVideoWidget/MusicVideoWidget'
import PopularArtistsWidget from '../../widgets/popularArtistsWidget/PopularArtistsWidget'
import WeeklyTopSongsWidget from '../../widgets/weeklyTopSongsWidget/WeeklyTopSongsWidget'
import NewReleaseSongs from '../../widgets/newReleaseSongsWidget/NewReleaseSongs'
import TopAlbums from '../../widgets/topAlbumsWidget/TopAlbums'
import MoodPlaylist from '../../widgets/moodPlaylistWidget/MoodPlaylist'

export default function Home() {
	return (
		<div className={style.as}>
			<LandingWidget />
			<WeeklyTopSongsWidget />
			<NewReleaseSongs />
			<TrendingSongsWidget />
			<MusicVideoWidget />
			<PopularArtistsWidget />
			<TopAlbums />
			<MoodPlaylist />
			{/* <SignUpForm /> */}
			<FooterWidget />
		</div>
	)
}
