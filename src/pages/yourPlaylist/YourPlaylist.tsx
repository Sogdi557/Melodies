import { useEffect, useState } from 'react'
import styles from './style.module.scss'
import HeaderWidget from '../../widgets/headerWidget/HeaderWidget'
import FooterWidget from '../../widgets/footerWidget/FooterWidget'
import fetchSpotifyData from '../../pages/cart/Cart'

const AboutUs = () => {
	return (
		<section className={styles.aboutSection}>
			<HeaderWidget />
			<div className={styles.glowBg} />
			<div className={styles.glowBgSecondary} />

			<div className={styles.aboutContent}>
				<h1>
					About <span>Us</span>
				</h1>
				<div className={styles.aboutGlowLine} />
				<p>
					We are passionate about delivering the best music streaming experience
					to our users. With a vast collection of songs, artists, and genres, we
					bring music closer to your heart.
				</p>
				<p>
					Our platform is built for discovery — whether you're into trending
					pop, timeless classics, or underground beats. Designed for both
					listeners and creators, we aim to be your daily music companion.
				</p>

				<div className={styles.infoCard}>
					<h2>Our Vision</h2>
					<p>
						Empower artists, delight listeners. We strive to build the bridge
						between creativity and community, offering intuitive tools and
						beautiful design for a seamless audio journey.
					</p>
				</div>

				<div className={styles.infoCard}>
					<h2>Why Choose Us</h2>
					<ul className={styles.featuresList}>
						<li>Curated playlists by music experts</li>
						<li>Personalized recommendations powered by AI</li>
						<li>Lightning-fast, sleek interface with vibrant aesthetics</li>
						<li>Always evolving, always listening to feedback</li>
					</ul>
				</div>

				<div className={styles.statsContainer}>
					<div className={styles.statItem}>
						<span className={styles.statNumber}>10M+</span>
						<span className={styles.statLabel}>Active Users</span>
					</div>
					<div className={styles.statItem}>
						<span className={styles.statNumber}>50M+</span>
						<span className={styles.statLabel}>Songs</span>
					</div>
					<div className={styles.statItem}>
						<span className={styles.statNumber}>1M+</span>
						<span className={styles.statLabel}>Artists</span>
					</div>
				</div>
			</div>
		</section>
	)
}

interface Playlist {
	id: string
	title: string
	songs: number
	duration: string
	image: string
}

const YourPlaylist = () => {
	const [playlists, setPlaylists] = useState<Playlist[]>([])

	useEffect(() => {
		const loadPlaylists = async () => {
			try {
				const fetched = await fetchSpotifyData('track')
				if (Array.isArray(fetched)) {
					const mapped: Playlist[] = fetched.map((item: any, idx: number) => ({
						id: item.id || `playlist-${idx}`,
						title: item.title || item.name || 'Unknown',
						songs: item.songs || item.tracks?.total || 0,
						duration: item.duration || item.total_duration || 'Unknown',
						image:
							item.image ||
							item.imageUrl ||
							(item.images && item.images[0]?.url) ||
							'/playlists/default.jpg',
					}))
					setPlaylists(mapped)
				} else {
					setPlaylists([])
				}
			} catch (error) {
				setPlaylists([])
			}
		}
		loadPlaylists()
	}, [])

	return (
		<section className={styles.playlistSection}>
			<div className={styles.playlistHeader}>
				<h2>
					Your <span>Playlists</span>
				</h2>
				<div className={styles.playlistGlowLine} />
			</div>

			<div className={styles.playlistGrid}>
				{playlists.map(playlist => (
					<div key={playlist.id} className={styles.playlistCard}>
						<div className={styles.playlistImageContainer}>
							<img
								src={playlist.image}
								alt={playlist.title}
								className={styles.playlistImage}
							/>
							{/* <div className={styles.playlistOverlay}>
								<button className={styles.playButton}>
									<span>▶</span>
								</button>
							</div> */}
						</div>
						<div className={styles.playlistInfo}>
							<h3>{playlist.title}</h3>
							<p>
								{playlist.songs} songs • {playlist.duration}
							</p>
						</div>
					</div>
				))}
			</div>

			{/* <button className={styles.viewAllButton}>
				View All Playlists
				<span className={styles.arrowIcon}>→</span>
			</button> */}
			<FooterWidget />
		</section>
	)
}

export { AboutUs, YourPlaylist }
