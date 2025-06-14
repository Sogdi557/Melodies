import { useEffect, useState } from 'react'
import styles from './style.module.scss'
import { Plus } from 'lucide-react'
import fetchSpotifyData from '../../pages/cart/Cart'

interface Song {
	id: string
	title: string
	subtitle: string
	image: string
	releaseDate?: string
	preview_url?: string
}

export default function NewReleaseSongs() {
	const [songs, setSongs] = useState<Song[]>([])
	const [visibleCount, setVisibleCount] = useState(10)

	useEffect(() => {
		const loadSongs = async () => {
			try {
				const fetched = await fetchSpotifyData('new', undefined)
				console.log('fetched:', fetched)
				if (Array.isArray(fetched)) {
					setSongs(fetched)
				} else {
					console.warn('Неверный формат данных:', fetched)
					setSongs([])
				}
			} catch (error) {
				console.error('Ошибка загрузки песен:', error)
			}
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
								{song.preview_url && (
									<audio
										controls
										src={song.preview_url}
										style={{ width: '100%' }}
									>
										Ваш браузер не поддерживает аудио.
									</audio>
								)}
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
