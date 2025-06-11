import { useEffect, useRef, useState } from 'react'
import styles from './style.module.scss'
import { Plus } from 'lucide-react'
import { fetchSpotifyData } from '../../pages/cart/Cart'

interface Song {
	id: string
	title: string
	subtitle: string
	image: string
}

export default function NewReleaseSongs() {
	const [songs, setSongs] = useState<Song[]>([])
	const [visibleCount, setVisibleCount] = useState(5)

	useEffect(() => {
		const loadSongs = async () => {
			const fetched = await fetchSpotifyData('new')
			setSongs(fetched)
		}
		loadSongs()
	}, [])

	const handleViewAll = () => {
		setVisibleCount(prev => Math.min(prev + 1, songs.length))
	}

	return (
		<section className={styles.weeklyTopSongs}>
			<div className={styles.header}>
				<h2>
					New Release <span className={styles.highlight}>Songs</span>
				</h2>
			</div>
			<div className={styles.songsList}>
				{songs.slice(0, visibleCount).map((song, index) => (
					<div key={song.id} className={styles.songCard}>
						<img src={song.image} alt={song.title} className={styles.cover} />
						<div className={styles.songInfo}>
							<h4 className={styles.title}>{song.title}</h4>
							<p className={styles.artist}>{song.subtitle}</p>
						</div>
					</div>
				))}

				{visibleCount < songs.length && (
					<div className={styles.viewAll}>
						<button className={styles.viewButton} onClick={handleViewAll}>
							<Plus />
						</button>
						<span className={styles.viewText}>View All</span>
					</div>
				)}
			</div>
		</section>
	)
}
