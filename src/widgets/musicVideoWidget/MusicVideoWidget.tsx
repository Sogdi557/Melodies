import styles from './style.module.scss'
import { Plus } from 'lucide-react'

const artists = [
	{ name: 'Eminiem', image: '../../../public/captSongsWidget/skyfall.png' },
]

const PopularArtists = () => {
	return (
		<div className={styles.wrapper}>
			<h2>
				Popular <span>Artists</span>
			</h2>
			<div className={styles.artists}>
				{artists.map(artist => (
					<div key={artist.name} className={styles.artist}>
						<img src={artist.image} alt={artist.name} />
						<p>{artist.name}</p>
					</div>
				))}
				<div className={styles.viewAll}>
					<button className={styles.viewButton}>
						<Plus />
					</button>
					<span className={styles.viewText}>View All</span>
				</div>
			</div>
		</div>
	)
}

export default PopularArtists
