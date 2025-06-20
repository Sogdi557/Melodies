import LandingWidget from '../../widgets/landingWidget/LandingWidget'
import FooterWidget from '../../widgets/footerWidget/FooterWidget'
import style from './style.module.scss'
import TrendingSongsWidget from '../../widgets/trendingSongsWidget/TrendingSongsWidget'
import MusicVideoWidget from '../../widgets/musicVideoWidget/MusicVideoWidget'
import PopularArtistsWidget from '../../widgets/popularArtistsWidget/PopularArtistsWidget'
import WeeklyTopSongsWidget from '../../widgets/weeklyTopSongsWidget/WeeklyTopSongsWidget'
import TopAlbums from '../../widgets/topAlbumsWidget/TopAlbums'
import MoodPlaylist from '../../widgets/moodPlaylistWidget/MoodPlaylist'
import NewReleaseSongs from '../../widgets/newReleaseSongsWidget/NewReleaseSongs'
// import { useLocation } from 'react-router-dom'
// import { useEffect } from 'react'

// const ScrollToTop = () => {
// 	const { pathname } = useLocation()

// 	useEffect(() => {
// 		window.scrollTo({ top: 0, behavior: 'smooth' }) // плавная прокрутка
// 	}, [pathname])
// }

export default function Home() {
	return (
		<div className={style.as}>
			<LandingWidget />
			<WeeklyTopSongsWidget />
			<NewReleaseSongs />
			<TrendingSongsWidget />
			<PopularArtistsWidget />
			<MusicVideoWidget />
			<TopAlbums />
			<MoodPlaylist />
			<FooterWidget />
		</div>
	)
}
