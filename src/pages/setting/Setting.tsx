import React, { useState } from 'react'
import styles from './style.module.scss'

const Settings = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [number, setNumber] = useState('')
	const [darkMode, setDarkMode] = useState(false)
	const [isSaving, setIsSaving] = useState(false)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		setIsSaving(true)
		// Simulate API call
		setTimeout(() => {
			setIsSaving(false)
		}, 1500)
	}

	return (
		<div
			className={`${styles.settingsContainer} ${
				darkMode ? styles.darkMode : ''
			}`}
		>
			<div className={styles.glowEffect}></div>

			<div className={styles.settingsHeader}>
				<h2>
					Account <span>Settings</span>
				</h2>
				<div className={styles.glowLine}></div>
			</div>

			<form onSubmit={handleSubmit} className={styles.settingsForm}>
				<div className={styles.formRow}>
					<div className={styles.formGroup}>
						<label>Your Name</label>
						<input
							type='text'
							value={name}
							onChange={e => setName(e.target.value)}
							placeholder='Enter your name'
							className={styles.formInput}
						/>
					</div>

					<div className={styles.formGroup}>
						<label>Phone Number</label>
						<input
							type='tel'
							value={number}
							onChange={e => setNumber(e.target.value)}
							placeholder='Enter your number'
							className={styles.formInput}
						/>
					</div>
				</div>

				<div className={styles.formGroup}>
					<label>Email Address</label>
					<input
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder='Enter your email'
						className={styles.formInput}
					/>
				</div>

				<div className={styles.toggleGroup}>
					<label>Dark Mode</label>
					<div
						className={`${styles.toggle} ${darkMode ? styles.active : ''}`}
						onClick={() => setDarkMode(!darkMode)}
					>
						<div className={styles.toggleHandle}></div>
					</div>
				</div>

				<button type='submit' className={styles.saveButton} disabled={isSaving}>
					{isSaving ? <div className={styles.spinner}></div> : 'Save Changes'}
				</button>

				<div className={styles.socialDivider}>
					<span>or connect with</span>
				</div>

				<button type='button' className={styles.socialButton}>
					<img src='/icons/google-icon.svg' alt='Google' />
					Google Account
				</button>
			</form>
		</div>
	)
}

export default Settings
