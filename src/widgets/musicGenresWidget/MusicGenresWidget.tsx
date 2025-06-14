import { useEffect, useState } from 'react'
import styles from './style.module.scss'
import { Plus } from 'lucide-react'
import fetchSpotifyData from '../../pages/cart/Cart'

interface Playlist {
	id: string
	title: string
	image: string
}

export default function MoodPlaylist() {
	const [playlists, setPlaylists] = useState<Playlist[]>([])

	useEffect(() => {
		const loadPlaylists = async () => {
			const fetched = await fetchSpotifyData('new')
			if (Array.isArray(fetched)) {
				setPlaylists(
					fetched.map((item: any) => ({
						id: item.id,
						title: item.title || item.name,
						image: item.image || item.images?.[0]?.url || '',
					}))
				)
			} else {
				setPlaylists([])
			}
		}
		loadPlaylists()
	}, [])

	return (
		<section className={styles.weeklyTopSongs}>
			<div className={styles.header}>
				<h2>
					Music <span className={styles.highlight}>Genres</span>
				</h2>
			</div>

			<div className={styles.songsList}>
				{playlists
					.slice() // копия массива
					.sort(() => Math.random() - 0.5) // базовое перемешивание
					.map(playlist => (
						<div key={playlist.id} className={styles.songCard}>
							<img
								src={playlist.image}
								alt={playlist.title}
								className={styles.cover}
							/>
							<div className={styles.songInfo}>
								<h4 className={styles.title}>{playlist.title}</h4>
							</div>
						</div>
					))}

				<div className={styles.viewAll}>
					<button className={styles.viewButton}>
						<Plus />
					</button>
					<span className={styles.viewText}>View All</span>
				</div>
			</div>
		</section>
	)
}
