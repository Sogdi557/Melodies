import React, { useState } from 'react'
import styles from './style.module.scss'
import HeaderWidget from '../../widgets/headerWidget/HeaderWidget'
import FooterWidget from '../../widgets/footerWidget/FooterWidget'

const AddPlaylist = () => {
	const [isFormOpen, setIsFormOpen] = useState(false)
	const [playlistName, setPlaylistName] = useState('')
	const [description, setDescription] = useState('')
	const [isPublic, setIsPublic] = useState(true)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Здесь будет логика создания плейлиста
		console.log({ playlistName, description, isPublic })
		setIsFormOpen(false)
		setPlaylistName('')
		setDescription('')
	}

	return (
		<div className={styles.addPlaylistContainer}>
			<HeaderWidget />
			{!isFormOpen ? (
				<button
					className={styles.addButton}
					onClick={() => setIsFormOpen(true)}
				>
					<span className={styles.plusIcon}>+</span>
					<span>Add New Playlist</span>
				</button>
			) : (
				<div className={styles.formContainer}>
					<div className={styles.formHeader}>
						<h3>Create New Playlist</h3>
						<button
							className={styles.closeButton}
							onClick={() => setIsFormOpen(false)}
						>
							&times;
						</button>
					</div>

					<form onSubmit={handleSubmit} className={styles.playlistForm}>
						<div className={styles.formGroup}>
							<label htmlFor='playlistName'>Playlist Name</label>
							<input
								type='text'
								id='playlistName'
								value={playlistName}
								onChange={e => setPlaylistName(e.target.value)}
								required
								className={styles.formInput}
								placeholder='My Awesome Playlist'
							/>
						</div>

						<div className={styles.formGroup}>
							<label htmlFor='description'>Description</label>
							<textarea
								id='description'
								value={description}
								onChange={e => setDescription(e.target.value)}
								className={styles.formTextarea}
								placeholder="What's this playlist about?"
								rows={3}
							/>
						</div>

						<div className={styles.formGroup}>
							<label className={styles.switch}>
								<input
									type='checkbox'
									checked={isPublic}
									onChange={e => setIsPublic(e.target.checked)}
								/>
								<span className={styles.slider}></span>
								<span className={styles.switchLabel}>
									{isPublic ? 'Public Playlist' : 'Private Playlist'}
								</span>
							</label>
						</div>

						<div className={styles.formActions}>
							<button
								type='button'
								className={styles.cancelButton}
								onClick={() => setIsFormOpen(false)}
							>
								Cancel
							</button>
							<button type='submit' className={styles.createButton}>
								Create Playlist
							</button>
						</div>
					</form>
				</div>
			)}
			<FooterWidget />
		</div>
	)
}

export default AddPlaylist
