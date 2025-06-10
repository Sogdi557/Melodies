import styles from './style.module.scss'
import { Plus } from 'lucide-react'

const songs = [
	{
		title: 'Scorpion',
		artist: 'Drake',
		image: '../../../public/captSongsWidget/skyfall.png',
	},
]

export default function TopAlbums() {
	return (
		<section className={styles.weeklyTopSongs}>
			<div className={styles.header}>
				<h2>
					Top <span className={styles.highlight}>Albums</span>
				</h2>
			</div>

			<div className={styles.songsList}>
				{songs.map((song, index) => (
					<div key={index} className={styles.songCard}>
						<img src={song.image} alt={song.title} className={styles.cover} />
						<div className={styles.songInfo}>
							<h4 className={styles.title}>{song.title}</h4>
							<p className={styles.artist}>{song.artist}</p>
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
