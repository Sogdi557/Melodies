import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './style.module.scss'
import { Plus } from 'lucide-react'

interface Track {
	title: string
	artist: string
	imageUrl: string
	views: string
}

const clientId = '9db623453ae2426281bd71fac38fbcdf'
const clientSecret = '187f1cb1c3b34998b17dce975fad783f'

const MusicVideoSection = () => {
	const [allVideos, setAllVideos] = useState<Track[]>([])
	const [visibleVideos, setVisibleVideos] = useState<Track[]>([])
	const [currentIndex, setCurrentIndex] = useState(3)

	const getAccessToken = async (): Promise<string | null> => {
		try {
			const params = new URLSearchParams()
			params.append('grant_type', 'client_credentials')
			params.append('client_id', clientId)
			params.append('client_secret', clientSecret)

			const response = await axios.post(
				'https://accounts.spotify.com/api/token',
				params,
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}
			)
			return response.data.access_token
		} catch (error) {
			console.error('Ошибка получения токена:', error)
			return null
		}
	}

	const fetchTrendingTracks = async () => {
		const token = await getAccessToken()
		if (!token) return

		try {
			const response = await axios.get(
				'https://api.spotify.com/v1/browse/new-releases?limit=50',
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			const allItems = response.data.albums.items

			const filtered = allItems.filter((item: any) =>
				item.name.toLowerCase().includes('video')
			)
			const tracks: Track[] = allItems.map((item: any) => ({
				title: item.name,
				artist: item.artists.map((a: any) => a.name).join(', '),
				imageUrl: item.images[0]?.url || '',
				views: 'Popular',
			}))

			setAllVideos(tracks)
			setVisibleVideos(tracks.slice(0, 3))
		} catch (error) {
			console.error('Ошибка при загрузке треков:', error)
		}
	}

	const handleViewAll = () => {
		if (currentIndex >= allVideos.length) return

		const next = allVideos[currentIndex]

		const isDuplicate = visibleVideos.some(
			v => v.title === next.title && v.artist === next.artist
		)

		if (!isDuplicate) {
			setVisibleVideos(prev => [...prev, next])
		}
		setCurrentIndex(prev => prev + 1)
	}

	useEffect(() => {
		fetchTrendingTracks()
	}, [])

	return (
		<section className={styles.section}>
			<h2>
				<span className={styles.white}>Music </span>
				<span className={styles.pink}>Video</span>
			</h2>
			<div className={styles.videoGrid}>
				{visibleVideos.map((video, idx) => (
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
				{currentIndex < allVideos.length && (
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

export default MusicVideoSection
