import React from 'react'
import styles from './style.module.scss'

const songs = [
	{
		number: 1,
		title: 'Sorfcore',
		artist: 'The neighborhood',
		date: 'Nov 4, 2023',
		album: 'Hard to Imagine the Neighbourhood Ever Changing',
		time: '3:26',
		image: '../../../public/captSongsWidget/skyfall.png',
	},
]

const HeartIcon = () => (
	<svg
		width='25'
		height='25'
		viewBox='0 0 25 25'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			d='M17.5647 3.32031C15.5763 3.32031 13.8473 4.24512 12.8304 5.79492C11.8135 4.24512 10.0845 3.32031 8.09608 3.32031C6.58988 3.32212 5.14587 3.94003 4.08083 5.03848C3.01578 6.13694 2.41667 7.62624 2.41492 9.17969C2.41492 12.0312 4.1382 14.999 7.53743 17.999C9.09506 19.3679 10.7776 20.578 12.5615 21.6123C12.6441 21.6581 12.7365 21.6821 12.8304 21.6821C12.9242 21.6821 13.0166 21.6581 13.0993 21.6123C14.8832 20.578 16.5657 19.3679 18.1233 17.999C21.5226 14.999 23.2458 12.0312 23.2458 9.17969C23.2441 7.62624 22.645 6.13694 21.5799 5.03848C20.5149 3.94003 19.0709 3.32212 17.5647 3.32031ZM12.8304 20.4209C11.2766 19.4961 3.55115 14.6211 3.55115 9.17969C3.5524 7.93688 4.03164 6.74535 4.88371 5.86655C5.73578 4.98776 6.89107 4.49348 8.09608 4.49219C10.0163 4.49219 11.6288 5.5498 12.3049 7.25293C12.3477 7.3604 12.4205 7.45231 12.5141 7.517C12.6076 7.58169 12.7177 7.61623 12.8304 7.61623C12.943 7.61623 13.0531 7.58169 13.1467 7.517C13.2403 7.45231 13.3131 7.3604 13.3559 7.25293C14.0319 5.5498 15.6445 4.49219 17.5647 4.49219C18.7697 4.49348 19.925 4.98776 20.7771 5.86655C21.6291 6.74535 22.1084 7.93688 22.1096 9.17969C22.1096 14.6211 14.3842 19.4961 12.8304 20.4209Z'
			fill='#EE10B0'
		/>
	</svg>
)

const TrendingSongs: React.FC = () => {
	return (
		<div className={styles.wrapper}>
			<h2>
				Trending <span>Songs</span>
			</h2>
			<div className={styles.header}>
				<div>Release Date</div>
				<div>album</div>
				<div>Time</div>
			</div>
			{songs.map(song => (
				<section key={song.number} className={styles.TrendingSongs}>
					<div className={styles.songsNumber}>
						<div className={styles.number}>#{song.number}</div>
					</div>
					<div className={styles.row}>
						<div className={styles.coverBlock}>
							<img src={song.image} alt={song.title} />
							<div className={styles.text}>
								<div className={styles.title}>{song.title}</div>
								<div className={styles.artist}>{song.artist}</div>
							</div>
						</div>
						<div className={styles.date}>{song.date}</div>
						<div className={styles.album}>{song.album}</div>
						<div className={styles.time}>
							<HeartIcon />
							<span>{song.time}</span>
						</div>
					</div>
				</section>
			))}

			<button className={styles.viewAll}>+ View All</button>
		</div>
	)
}

export default TrendingSongs
