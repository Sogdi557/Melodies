// import React from 'react'
import styles from './style.module.scss'
import { Plus } from 'lucide-react'

const songs = [
	{
		title: '112',
		artist: 'jazzek',
		image: '../../../public/captSongsWidget/skyfall.png',
	},
]

export default function NewReleaseSongs() {
	return (
		<section className={styles.weeklyTopSongs}>
			<div className={styles.header}>
				<h2>
					New Release <span className={styles.highlight}>Songs</span>
				</h2>
			</div>
			<div className={styles.songsList}>
				{songs.map((Release, index) => (
					<div key={index} className={styles.songCard}>
						<img
							src={Release.image}
							alt={Release.title}
							className={styles.cover}
						/>
						<div className={styles.songInfo}>
							<h4 className={styles.title}>{Release.title}</h4>
							<p className={styles.artist}>{Release.artist}</p>
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
