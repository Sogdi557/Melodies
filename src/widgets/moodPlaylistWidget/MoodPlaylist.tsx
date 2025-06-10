import React from 'react'
import styles from './style.module.scss'
import { Plus } from 'lucide-react'

const songs = [
	{
		title: 'Chill Playlist',
		image: '../../../public/captSongsWidget/skyfall.png',
	},
]

export default function MoodPlaylist() {
	return (
		<section className={styles.weeklyTopSongs}>
			<div className={styles.header}>
				<h2>
					Mood <span className={styles.highlight}>Playlist</span>
				</h2>
			</div>

			<div className={styles.songsList}>
				{songs.map((song, index) => (
					<div key={index} className={styles.songCard}>
						<img src={song.image} alt={song.title} className={styles.cover} />
						<div className={styles.songInfo}>
							<h4 className={styles.title}>{song.title}</h4>
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
