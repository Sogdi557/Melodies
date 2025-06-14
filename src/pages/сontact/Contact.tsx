import styles from './style.module.scss'
import HeaderWidget from '../../widgets/headerWidget/HeaderWidget'
import FooterWidget from '../../widgets/footerWidget/FooterWidget'

const Contact = () => {
	return (
		<section className={styles.contactSection}>
			<HeaderWidget />

			<div className={styles.glowBg} />

			<div className={styles.contactContent}>
				<h1>
					Contact <span>Us</span>
				</h1>
				<div className={styles.contactGlowLine} />

				<p>
					We're here to connect with you! Whether you're an artist, listener, or
					partner — we'd love to hear from you.
				</p>

				<h2>General Inquiries</h2>
				<p>
					Email: <strong>info@beatwave.app</strong>
				</p>
				<p>
					Phone: <strong>+1 (800) 123-4567</strong>
				</p>

				<h2>Artist Support</h2>
				<p>
					Email: <strong>artists@beatwave.app</strong>
				</p>
				<p>Share your work and get featured!</p>

				<h2>Business Partnerships</h2>
				<p>
					Email: <strong>partners@beatwave.app</strong>
				</p>
				<p>We're open to collaborations and creative opportunities.</p>

				<h2>Our Office</h2>
				<p>
					BeatWave Inc.
					<br />
					1200 Music Blvd,
					<br />
					Los Angeles, CA 90001
				</p>
			</div>
			<div className='footer'>
				<FooterWidget />
			</div>
		</section>
	)
}

export default Contact
