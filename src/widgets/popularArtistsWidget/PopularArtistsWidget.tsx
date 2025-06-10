import styles from './style.module.scss'
import { Plus } from 'lucide-react'

const MusicVideoSection = () => {
	const videos = [
		{
			title: 'Gossip',
			artist: 'Måneskin',
			views: '3M views',
			imageUrl: '../../../public/captSongsWidget/skyfall.png',
		},
	]

	return (
		<>
			<section className={styles.section}>
				<h2>
					<span className={styles.white}>Music </span>
					<span className={styles.pink}>Video</span>
				</h2>
				<div className={styles.videoGrid}>
					{videos.map((video, idx) => (
						<div className={styles.card} key={idx}>
							<img
								className={styles.thumbnail}
								src={video.imageUrl}
								alt={video.title}
							/>
							<div className={styles.info}>
								<div className={styles.title}>{video.title}</div>
								<div className={styles.meta}>
									<span>{video.artist}</span>
									<span>{video.views}</span>
								</div>
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
		</>
	)
}

export default MusicVideoSection
