import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './style.module.scss'
import { Plus } from 'lucide-react'

interface Artist {
	name: string
	image: string
}

const clientId = '9db623453ae2426281bd71fac38fbcdf'
const clientSecret = '187f1cb1c3b34998b17dce975fad783f'

const PopularArtists = () => {
	const [artists, setArtists] = useState<Artist[]>([])
	const [visibleCount, setVisibleCount] = useState(6)

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
			console.error('Ошибка токена:', error)
			return null
		}
	}

	const fetchArtists = async () => {
		const token = await getAccessToken()
		if (!token) return

		try {
			const res = await axios.get(
				'https://api.spotify.com/v1/search?q=a&type=artist&limit=50',
				{ headers: { Authorization: `Bearer ${token}` } }
			)

			const unique: Artist[] = []
			const seen = new Set()

			for (const item of res.data.artists.items) {
				if (item.images[0] && !seen.has(item.name)) {
					seen.add(item.name)
					unique.push({ name: item.name, image: item.images[0].url })
				}
			}
			setArtists(unique)
		} catch (error) {
			console.error('Ошибка загрузки артистов:', error)
		}
	}

	useEffect(() => {
		fetchArtists()
	}, [])

	const visibleArtists = artists.slice(0, visibleCount)

	const handleNext = () => {
		setVisibleCount(prev => Math.min(prev + 1, artists.length))
	}

	return (
		<div className={styles.wrapper}>
			<h2>
				Popular <span>Artists</span>
			</h2>
			<div className={styles.artists}>
				{visibleArtists.map(artist => (
					<div key={artist.name} className={styles.artist}>
						<img src={artist.image} alt={artist.name} />
						<p>{artist.name}</p>
					</div>
				))}

				{visibleCount < artists.length && (
					<div className={styles.viewAll}>
						<button className={styles.viewButton} onClick={handleNext}>
							<Plus />
						</button>
						<span className={styles.viewText}>View All</span>
					</div>
				)}
			</div>
		</div>
	)
}

export default PopularArtists
