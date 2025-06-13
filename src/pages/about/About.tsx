import styles from './style.module.scss'
import HeaderWidget from '../../widgets/headerWidget/HeaderWidget'
import FooterWidget from '../../widgets/footerWidget/FooterWidget'

const AboutUs = () => {
	return (
		<section className={styles.aboutSection}>
			<HeaderWidget />

			<div className={styles.glowBg} />

			<div className={styles.aboutContent}>
				<h1>
					About <span>Us</span>
				</h1>
				<div className={styles.aboutGlowLine} />
				<p>
					We are passionate about delivering the best music streaming experience
					to our users. With a vast collection of songs, artists, and genres, we
					bring music closer to your heart.
				</p>
				<p>
					Our platform is built for discovery — whether you're into trending
					pop, timeless classics, or underground beats. Designed for both
					listeners and creators, we aim to be your daily music companion.
				</p>

				<h2>Our Vision</h2>
				<p>
					Empower artists, delight listeners. We strive to build the bridge
					between creativity and community, offering intuitive tools and
					beautiful design for a seamless audio journey.
				</p>

				<h2>Why Choose Us</h2>
				<p>
					• Curated playlists by music experts
					<br />
					• Personalized recommendations powered by AI
					<br />
					• Lightning-fast, sleek interface with vibrant aesthetics
					<br />• Always evolving, always listening to feedback
				</p>
			</div>
			<FooterWidget />
		</section>
	)
}

export default AboutUs
