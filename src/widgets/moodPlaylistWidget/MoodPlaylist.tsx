import { useEffect, useState } from 'react'
import styles from './style.module.scss'
import { Plus } from 'lucide-react'
import fetchSpotifyData from '../../pages/cart/Cart'

interface Album {
	id: string
	title: string
	artist: string
	image: string
}

export default function TopAlbums() {
	const [albums, setAlbums] = useState<Album[]>([])

	useEffect(() => {
		const loadAlbums = async () => {
			const fetched = await fetchSpotifyData('new')
			if (Array.isArray(fetched)) {
				setAlbums(
					fetched.map((item: any) => ({
						id: item.id,
						title: item.title,
						artist: item.subtitle,
						image: item.image,
					}))
				)
			} else {
				setAlbums([])
			}
		}
		loadAlbums()
	}, [])

	return (
		<section className={styles.weeklyTopSongs}>
			<div className={styles.header}>
				<h2>
					Mood <span className={styles.highlight}>Playlist </span>
				</h2>
			</div>

			<div className={styles.songsList}>
				{albums
					.slice() // создаем копию массива
					.sort(() => Math.random() - 0.5) // перемешиваем
					.map(album => (
						<div key={album.id} className={styles.songCard}>
							<img
								src={album.image}
								alt={album.title}
								className={styles.cover}
							/>
							<div className={styles.songInfo}>
								<h4 className={styles.title}>{album.title}</h4>
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
