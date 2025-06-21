import { useEffect, useState } from 'react'
import styles from './style.module.scss'
import { Plus } from 'lucide-react'
import fetchSpotifyData from '../../pages/cart/Cart'

interface Song {
	id: string
	title: string
	subtitle: string
	image: string
	category?: string
}

export default function WeeklyTopSongsWidget() {
	const [songs, setSongs] = useState<Song[]>([])
	const [visibleCount, setVisibleCount] = useState(10)

	useEffect(() => {
		const loadSongs = async () => {
			try {
				const fetched = await fetchSpotifyData('new', undefined)
				console.log(fetched) // Посмотрите структуру данных
				if (Array.isArray(fetched)) {
					setSongs(fetched) // Без фильтра для теста
				} else {
					setSongs([])
				}
			} catch (error) {
				setSongs([])
			}
		}
		loadSongs()
	}, [])

	const handleViewAll = () => {
		setVisibleCount(prev => Math.min(prev + 5, songs.length))
	}

	return (
		<section className={styles.weeklyTopSongs}>
			<div className={styles.header}>
				<h2>
					Weekly Top <span className={styles.highlight}>Songs</span>
				</h2>
			</div>
			<div className={styles.songsList}>
				{/* {songs.slice(0, visibleCount).map(song => ( */}
				{songs
					.slice() // копируем массив
					.sort(() => Math.random() - 0.5) // перемешиваем
					.slice(0, visibleCount) // берем нужное количество
					.map(song => (
						<div key={song.id} className={styles.songCard}>
							<img
								src={song.image}
								alt={song.title}
								className={styles.cover}
								onError={e => {
									;(e.target as HTMLImageElement).src = '/placeholder.jpg'
								}}
							/>
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
