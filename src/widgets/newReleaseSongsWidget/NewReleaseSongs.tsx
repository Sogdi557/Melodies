import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './style.module.scss'
import { Plus } from 'lucide-react'

interface Song {
	title: string
	artist: string
	image: string
}

const clientId = '9db623453ae2426281bd71fac38fbcdf'
const clientSecret = '187f1cb1c3b34998b17dce975fad783f'

export default function NewReleaseSongs() {
	const [songs, setSongs] = useState<Song[]>([])
	const [visibleCount, setVisibleCount] = useState(5)

	const getAccessToken = async () => {
		const params = new URLSearchParams()
		params.append('grant_type', 'client_credentials')
		params.append('client_id', clientId)
		params.append('client_secret', clientSecret)

		try {
			const res = await axios.post(
				'https://accounts.spotify.com/api/token',
				params,
				{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
			)
			return res.data.access_token
		} catch (err) {
			console.error('Ошибка получения токена', err)
			return null
		}
	}

	const fetchNewReleases = async () => {
		const token = await getAccessToken()
		if (!token) return

		try {
			const res = await axios.get(
				'https://api.spotify.com/v1/browse/new-releases?limit=50',
				{ headers: { Authorization: `Bearer ${token}` } }
			)

			const seen = new Set()
			const uniqueSongs = res.data.albums.items
				.filter(
					(item: any) => item && item.images.length && !seen.has(item.name)
				)
				.map((item: any) => {
					seen.add(item.name)
					return {
						title: item.name,
						artist: item.artists[0]?.name || 'Unknown',
						image: item.images[0].url,
					}
				})
			setSongs(uniqueSongs)
		} catch (err) {
			console.error('Ошибка получения релизов', err)
		}
	}

	useEffect(() => {
		fetchNewReleases()
	}, [])

	return (
		<section className={styles.weeklyTopSongs}>
			<div className={styles.header}>
				<h2>
					New Release <span className={styles.highlight}>Songs</span>
				</h2>
			</div>
			<div className={styles.songsList}>
				{songs.slice(0, visibleCount).map((song, index) => (
					<div key={index} className={styles.songCard}>
						<img src={song.image} alt={song.title} className={styles.cover} />
						<div className={styles.songInfo}>
							<h4 className={styles.title}>{song.title}</h4>
							<p className={styles.artist}>{song.artist}</p>
						</div>
					</div>
				))}

				{visibleCount < songs.length && (
					<div className={styles.viewAll}>
						<button
							className={styles.viewButton}
							onClick={() => setVisibleCount(prev => prev + 1)}
						>
							<Plus />
						</button>
						<span className={styles.viewText}>View All</span>
					</div>
				)}
			</div>
		</section>
	)
}
