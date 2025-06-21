import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import AuthModal from '../authWidgetModal/AuthWidgetModal'
import fetchSpotifyData from '../../pages/cart/Cart'
import styles from './style.module.scss'

const LandingWidget = () => {
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
	const [authType, setAuthType] = useState<'login' | 'signup'>('login')
	const [isSearchOpen, setIsSearchOpen] = useState(false)
	const [query, setQuery] = useState('')
	const [searchResults, setSearchResults] = useState<any[]>([])

	const openAuthModal = (type: 'login' | 'signup') => {
		setAuthType(type)
		setIsAuthModalOpen(true)
	}

	const closeAuthModal = () => {
		setIsAuthModalOpen(false)
	}

	const handleSearch = async () => {
		if (!query.trim()) {
			setIsSearchOpen(false)
			return
		}
		const results = await fetchSpotifyData('artist', query)
		setSearchResults(results)
		setIsSearchOpen(true)
	}

	const closeSearch = () => {
		setIsSearchOpen(false)
		setQuery('')
		setSearchResults([])
	}

	return (
		<div className={styles.LandingWidget}>
			<div className={styles.landing}>
				<header className={styles.header}>
					<div className={styles.searchBar}>
						<span className={styles.searchIcon}>
							<svg
								width='25'
								height='26'
								viewBox='0 0 25 26'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									opacity='0.6'
									fill-rule='evenodd'
									clip-rule='evenodd'
									d='M10.0156 16.5896C11.4196 17.7114 13.1999 18.253 14.9907 18.1032C16.7816 17.9534 18.4471 17.1236 19.6453 15.7841C20.8434 14.4447 21.4831 12.6973 21.4332 10.9009C21.3832 9.10445 20.6472 7.39535 19.3765 6.12459C18.1057 4.85384 16.3966 4.11789 14.6002 4.06791C12.8038 4.01792 11.0564 4.65769 9.71695 5.85582C8.3775 7.05394 7.54765 8.71947 7.39785 10.5103C7.24805 12.3012 7.78966 14.0815 8.91145 15.4855L3.54061 20.8552C3.46386 20.9268 3.40229 21.013 3.35959 21.1089C3.31689 21.2047 3.29393 21.3081 3.29208 21.413C3.29023 21.5179 3.30953 21.6221 3.34882 21.7194C3.38811 21.8167 3.44659 21.9051 3.52078 21.9792C3.59497 22.0534 3.68334 22.1119 3.78062 22.1512C3.8779 22.1905 3.98209 22.2098 4.08699 22.2079C4.19189 22.2061 4.29534 22.1831 4.39117 22.1404C4.48701 22.0977 4.57326 22.0362 4.64478 21.9594L10.0156 16.5896ZM18.2719 14.9625C19.0364 14.1979 19.5571 13.2238 19.7682 12.1633C19.9793 11.1029 19.8713 10.0036 19.4578 9.00452C19.0443 8.00542 18.3439 7.15131 17.4452 6.55014C16.5464 5.94897 15.4896 5.62773 14.4084 5.627C13.3271 5.62627 12.2698 5.9461 11.3703 6.54605C10.4707 7.14601 9.7692 7.99917 9.35438 8.99772C8.93956 9.99626 8.83005 11.0954 9.03971 12.1561C9.24937 13.2169 9.76877 14.1917 10.5323 14.9573L10.5375 14.9625L10.5427 14.9667C11.5686 15.9903 12.9589 16.5648 14.4081 16.564C15.8574 16.5632 17.247 15.9872 18.2719 14.9625Z'
									fill='white'
								/>
							</svg>
						</span>
						<input
							type='text'
							value={query}
							onChange={e => setQuery(e.target.value)}
							onKeyDown={e => e.key === 'Enter' && handleSearch()}
							placeholder='Search For Musics, Artists, ...'
						/>
					</div>
					<nav className={styles.navMenu}>
						<NavLink
							to='/about'
							className={({ isActive }) => (isActive ? styles.active : '')}
						>
							About Us
						</NavLink>
						<NavLink
							to='/contact'
							className={({ isActive }) => (isActive ? styles.active : '')}
						>
							Contact
						</NavLink>
						<NavLink
							to='/premium'
							className={({ isActive }) => (isActive ? styles.active : '')}
						>
							Premium
						</NavLink>
					</nav>
					<div className={styles.authButtons}>
						<button
							className={styles.loginBtn}
							onClick={() => openAuthModal('login')}
						>
							Login
						</button>
						<button
							className={styles.signupBtn}
							onClick={() => openAuthModal('signup')}
						>
							Sign Up
						</button>
					</div>

					<AuthModal
						isOpen={isAuthModalOpen}
						onClose={closeAuthModal}
						initialType={authType}
					/>
				</header>

				<main className={styles.mainContent}>
					<div className={styles.textSection}>
						<h1>
							All the <span className={styles.highlight}>BEST Songs</span>{' '}
							<br />
							in One Place
						</h1>
						<p>
							On our website, you can access an amazing collection of popular
							and new songs. Stream your favorite tracks in high quality and
							enjoy without interruptions. Whatever your taste in music, we have
							it all for you!
						</p>
						<div className={styles.buttons}>
							<button className={styles.discoverBtn}>Discover Now</button>
							<button className={styles.playlistBtn}>Create Playlist</button>
						</div>
					</div>
					<div className={styles.imageSection}>
						<div className={styles.placeholderImage}></div>
					</div>
				</main>
			</div>

			{/* Результаты поиска */}
			{isSearchOpen && searchResults.length > 0 && (
				<div
					className={styles.searchOverlay}
					onClick={closeSearch} // клик по фону закроет окно
				>
					<div
						className={styles.searchResults}
						onClick={e => e.stopPropagation()} // клик внутри не закроет окно
					>
						<button className={styles.closeButton} onClick={closeSearch}>
							&times;
						</button>
						{searchResults.map(track => (
							<div className={styles.trackCard} key={track.id}>
								<div
									className={styles.cover}
									style={{ backgroundImage: `url(${track.image})` }}
								/>
								<div className={styles.trackInfo}>
									<h3>{track.title}</h3>
									<p>{track.subtitle}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

export default LandingWidget
