import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import fetchSpotifyData from '../../pages/cart/Cart'
import HeaderWidget from '../../widgets/headerWidget/HeaderWidget'
import FooterWidget from '../../widgets/footerWidget/FooterWidget'

interface Favorite {
	id: string
	title: string
	artist: string
	cover: string
	added: string
}

const YourFavorites: React.FC = () => {
	const [favoriteTracks, setFavoriteTracks] = useState<Favorite[]>([])

	useEffect(() => {
		const loadFavorites = async () => {
			try {
				const fetched = await fetchSpotifyData('track')
				if (Array.isArray(fetched)) {
					const tracks: Favorite[] = fetched.map((item: any, idx: number) => ({
						id: item.id || `fav-${idx}`,
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
						added: item.added || item.added_at || 'Unknown',
					}))
					setFavoriteTracks(tracks)
				} else {
					setFavoriteTracks([])
				}
			} catch (error) {
				setFavoriteTracks([])
			}
		}
		loadFavorites()
	}, [])

	return (
		<section className={styles.favoritesSection}>
			<HeaderWidget />
			<h2>
				Your <span>Favorites</span>
			</h2>
			<div className={styles.line} />

			<div className={styles.trackGrid}>
				{favoriteTracks.map(track => (
					<div key={track.id} className={styles.trackCard}>
						<div
							className={styles.cover}
							style={{ backgroundImage: `url(${track.cover})` }}
						/>
						<div className={styles.trackInfo}>
							<h3>{track.title}</h3>
							<p>{track.artist}</p>
							<span className={styles.addedTime}>Added: {track.added}</span>
						</div>
					</div>
				))}
			</div>
			<FooterWidget />
		</section>
	)
}

export default YourFavorites
