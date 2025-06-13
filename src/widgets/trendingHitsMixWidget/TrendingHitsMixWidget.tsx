import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import fetchSpotifyData from '../../pages/cart/Cart'

interface Track {
	id: string
	title: string
	artist: string
	album: string
	releaseDate: string
	duration: string
	imageUrl: string
}

const msToMinSec = (ms: number) => {
	const min = Math.floor(ms / 60000)
	const sec = Math.floor((ms % 60000) / 1000)
	return `${min}:${sec < 10 ? '0' : ''}${sec}`
}

const TrendingHitsMixWidget = () => {
	const [track, setTrack] = useState<Track | null>(null)

	useEffect(() => {
		const fetchTrack = async () => {
			const fetched = await fetchSpotifyData('new')
			if (Array.isArray(fetched) && fetched.length > 0) {
				const t = fetched[0]
				setTrack({
					id: t.id,
					title: t.title || t.name,
					artist:
						t.artist ||
						(t.artists ? t.artists.map((a: any) => a.name).join(', ') : ''),
					album: t.album || t.album_name || (t.album && t.album.name) || '',
					releaseDate:
						t.releaseDate ||
						t.release_date ||
						(t.album && t.album.release_date) ||
						'',
					duration:
						t.duration || (t.duration_ms ? msToMinSec(t.duration_ms) : ''),
					imageUrl:
						t.imageUrl ||
						t.image ||
						(t.album && t.album.images ? t.album.images[0]?.url : ''),
				})
			} else {
				setTrack(null)
			}
		}
		fetchTrack()
	}, [])

	const bgImage = track?.imageUrl
		? `linear-gradient(120deg, rgba(0,0,0,0.0)), url(${track.imageUrl})`
		: undefined

	return (
		<section
			className={styles.wrapper}
			style={
				bgImage
					? {
							backgroundImage: bgImage,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
					  }
					: {}
			}
		>
			<div className={styles.topbar}>
				<button className={styles.backButton}>
					<svg
						width='50'
						height='50'
						viewBox='0 0 50 50'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M16.302 27.0834L27.9687 38.75L24.9999 41.6667L8.33325 25L24.9999 8.33337L27.9687 11.25L16.302 22.9167H41.6666V27.0834H16.302Z'
							fill='white'
						/>
					</svg>
				</button>
				<div className={styles.topActions}>
					<button>Share</button>
					<button>About</button>
					<button>Premium</button>
					<div className={styles.userIcon}>
						<svg
							width='40'
							height='40'
							viewBox='0 0 40 40'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M19.9999 6.66671C17.6679 6.66628 15.3765 7.27752 13.3545 8.43942C11.3325 9.60132 9.65055 11.2732 8.47663 13.2883C7.30271 15.3034 6.67784 17.5911 6.66438 19.9231C6.65092 22.2551 7.24935 24.5499 8.39994 26.5784C9.17762 25.5677 10.1773 24.7493 11.3217 24.1867C12.4662 23.624 13.7247 23.332 14.9999 23.3334H24.9999C26.2752 23.332 27.5337 23.624 28.6781 24.1867C29.8226 24.7493 30.8223 25.5677 31.5999 26.5784C32.7505 24.5499 33.3489 22.2551 33.3355 19.9231C33.322 17.5911 32.6972 15.3034 31.5232 13.2883C30.3493 11.2732 28.6674 9.60132 26.6454 8.43942C24.6234 7.27752 22.332 6.66628 19.9999 6.66671ZM33.2383 30.1267C35.4667 27.2217 36.672 23.6613 36.6666 20C36.6666 10.795 29.2049 3.33337 19.9999 3.33337C10.7949 3.33337 3.33327 10.795 3.33327 20C3.32777 23.6613 4.53311 27.2217 6.7616 30.1267L6.75327 30.1567L7.34494 30.845C8.90808 32.6726 10.8489 34.1394 13.0337 35.1444C15.2184 36.1495 17.5951 36.6688 19.9999 36.6667C23.3788 36.6729 26.6789 35.6466 29.4583 33.725C30.6432 32.9064 31.7176 31.9384 32.6549 30.845L33.2466 30.1567L33.2383 30.1267ZM19.9999 10C18.6739 10 17.4021 10.5268 16.4644 11.4645C15.5267 12.4022 14.9999 13.674 14.9999 15C14.9999 16.3261 15.5267 17.5979 16.4644 18.5356C17.4021 19.4733 18.6739 20 19.9999 20C21.326 20 22.5978 19.4733 23.5355 18.5356C24.4732 17.5979 24.9999 16.3261 24.9999 15C24.9999 13.674 24.4732 12.4022 23.5355 11.4645C22.5978 10.5268 21.326 10 19.9999 10Z'
								fill='white'
							/>
						</svg>
					</div>
				</div>
			</div>
			{track && (
				<div className={styles.content}>
					{/* <img
						src={track.imageUrl}
						alt='Playlist Cover'
						className={styles.cover}
					/> */}
					<p>{track.artist}fghjk</p>
				</div>
			)}
		</section>
	)
}

export default TrendingHitsMixWidget
