import { useEffect, useState } from 'react'
import styles from './style.module.scss'
import { Heart } from 'lucide-react'
import fetchSpotifyData from '../../pages/cart/Cart'

interface Track {
	id: string
	title: string
	artist: string
	album: string
	time: string
	image: string
	release: string
}

export default function TrendingSongsWidget() {
	const [tracks, setTracks] = useState<Track[]>([])
	const [likedIds, setLikedIds] = useState<string[]>([])
	const [visibleCount, setVisibleCount] = useState(5)

	useEffect(() => {
		const fetchTracks = async () => {
			const fetched = await fetchSpotifyData('new')
			if (Array.isArray(fetched)) {
				setTracks(
					fetched.map((item: any) => ({
						id: item.id,
						title: item.title || item.name,
						artist: item.artist || item.artists?.[0]?.name || '',
						album: item.album || item.album_name || '',
						time: item.time || item.duration || '',
						image: item.image || item.images?.[0]?.url || '',
						release: item.release || item.release_date || '',
					}))
				)
			} else {
				setTracks([])
			}
		}
		fetchTracks()
	}, [])

	const toggleLike = (track: Track) => {
		if (likedIds.includes(track.id)) {
			setLikedIds(prev => prev.filter(id => id !== track.id))
		} else {
			setLikedIds(prev => [...prev, track.id])
		}
	}

	const handleViewAll = () => {
		setVisibleCount(prev => Math.min(prev + 1, tracks.length))
	}

	return (
		<div className={styles.wrapper}>
			<h2>
				Trending <span>Songs</span>
			</h2>
			{tracks
				.slice() // копируем массив
				.sort(() => Math.random() - 0.5) // перемешиваем
				.slice(0, visibleCount) // берем нужное количество
				.map((track, idx) => (
					<section key={track.id} className={styles.TrendingSongs}>
						<div className={styles.songsNumber}>
							<div className={styles.number}>{idx + 1}</div>
						</div>
						<div className={styles.row}>
							<div className={styles.coverBlock}>
								<img src={track.image} alt={track.title} />
								<div className={styles.text}>
									<div className={styles.title}>{track.title}</div>
									<div className={styles.artist}>{track.artist}</div>
								</div>
							</div>
							<div className={styles.date}>{track.release}</div>
							<div className={styles.album}>{track.album}</div>
							<div className={styles.time}>
								<Heart
									size={18}
									color={likedIds.includes(track.id) ? 'purple' : 'white'}
									fill={likedIds.includes(track.id) ? 'purple' : 'none'}
									onClick={() => toggleLike(track)}
									style={{ cursor: 'pointer' }}
								/>
								<span>{track.time}</span>
							</div>
						</div>
					</section>
				))}
			{visibleCount < tracks.length && (
				<button className={styles.viewAll} onClick={handleViewAll}>
					+ View All
				</button>
			)}
		</div>
	)
}
