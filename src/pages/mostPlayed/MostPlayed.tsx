import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import fetchSpotifyData from '../../pages/cart/Cart'
import FooterWidget from '../../widgets/footerWidget/FooterWidget'
import HeaderWidget from '../../widgets/headerWidget/HeaderWidget'

interface Track {
	id: string
	title: string
	artist: string
	cover: string
	plays: number
}

const MostPlayed: React.FC = () => {
	const [mostPlayedTracks, setMostPlayedTracks] = useState<Track[]>([])

	useEffect(() => {
		const loadTracks = async () => {
			try {
				const fetched = await fetchSpotifyData('track')
				if (Array.isArray(fetched)) {
					// Преобразуем данные к нужному формату
					const tracks: Track[] = fetched.map((item: any, idx: number) => ({
						id: item.id || `track-${idx}`,
						title: item.title || item.name || 'Unknown',
						artist:
							item.artist ||
							(item.artists
								? item.artists.map((a: any) => a.name).join(', ')
								: 'Unknown'),
						cover:
							item.cover ||
							item.image ||
							item.imageUrl ||
							(item.album && item.album.images
								? item.album.images[0]?.url
								: '/placeholder.jpg'),
						plays:
							item.plays ||
							item.playCount ||
							Math.floor(Math.random() * 100000),
					}))
					setMostPlayedTracks(tracks)
				} else {
					setMostPlayedTracks([])
				}
			} catch (error) {
				setMostPlayedTracks([])
			}
		}
		loadTracks()
	}, [])

	return (
		<section className={styles.mostPlayedSection}>
			<HeaderWidget />
			<h2>
				Most <span>Played</span>
			</h2>
			<div className={styles.line} />

			<div className={styles.trackGrid}>
				{mostPlayedTracks.map(track => (
					<div className={styles.trackCard} key={track.id}>
						<div
							className={styles.cover}
							style={{ backgroundImage: `url(${track.cover})` }}
						/>
						<div className={styles.trackInfo}>
							<h3>{track.title}</h3>
							<p>{track.artist}</p>
							<span className={styles.playCount}>
								{track.plays.toLocaleString()} plays
							</span>
						</div>
					</div>
				))}
			</div>
			<FooterWidget />
		</section>
	)
}

export default MostPlayed
