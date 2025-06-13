import React from 'react'
import TrendungHitsMixWidget from '../../widgets/trendingHitsMixWidget/TrendingHitsMixWidget'
import FooterWidget from '../../widgets/footerWidget/FooterWidget'
import TrendingSongsWidget from '../../widgets/trendingSongsWidget/TrendingSongsWidget'
import WeeklyTopWidget from '../../widgets/weeklyTopSongsWidget/WeeklyTopSongsWidget'
import MoodPlaylistWidget from '../../widgets/moodPlaylistWidget/MoodPlaylist'
import PopularArtists from '../../widgets/popularArtistsWidget/PopularArtistsWidget'
export default function Arists() {
	return (
		<div className='as'>
			<TrendungHitsMixWidget />
			<TrendingSongsWidget />
			<WeeklyTopWidget />
			<WeeklyTopWidget />
			<MoodPlaylistWidget />
			<PopularArtists />
			<FooterWidget />
		</div>
	)
}
