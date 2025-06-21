import styles from './style.module.scss'
import { NavLink } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaTwitter, FaPhoneAlt } from 'react-icons/fa'

const Footer = () => {
	return (
		<footer className={styles.Footer}>
			<div className={styles.container}>
				<div className={styles.about}>
					<h2>About</h2>
					<p>
						Melodies is a website that has been created for over{' '}
						<span className={styles.highlight}>5 year's</span> now and it is one
						of the most famous music player website’s in the world. in this
						website you can listen and download songs for free. also of you want
						no limitation you can buy our{' '}
						<NavLink to='/premium' className={styles.link}>
							premium pass’s.
						</NavLink>
					</p>
				</div>

				<div className={styles.links}>
					<div>
						<h3>Melodies</h3>
						<NavLink to='/songs'>Songs</NavLink>
						<NavLink to='/radio'>Radio</NavLink>
						<NavLink to='/podcast'>Podcast</NavLink>
					</div>
					<div>
						<h3>Access</h3>
						<NavLink to='/explore'>Explor</NavLink>
						<NavLink to='/artists'>Artists</NavLink>
						<NavLink to='/playlists'>Playlists</NavLink>
						<NavLink to='/albums'>Albums</NavLink>
						<NavLink to='/trending'>Trending</NavLink>
					</div>
					<div>
						<h3>Contact</h3>
						<NavLink to='/about'>About</NavLink>
						<NavLink to='/policy'>Policy</NavLink>
						<NavLink to='/social'>Social Media</NavLink>
						<NavLink to='/support'>Sopport</NavLink>
					</div>
				</div>

				<div className={styles.right}>
					<NavLink
						to='/somepage'
						onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					>
						Melodies
					</NavLink>
					<NavLink to='/' className={styles.logo}>
						Melodies
					</NavLink>
					<div className={styles.icons}>
						<FaFacebookF />
						<FaInstagram />
						<FaTwitter />
						<FaPhoneAlt />
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
