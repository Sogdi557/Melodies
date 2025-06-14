import { useEffect, useState } from 'react'
import styles from './style.module.scss'
import fetchSpotifyData from '../../pages/cart/Cart'
import FooterWidget from '../../widgets/footerWidget/FooterWidget'
import HeaderWidget from '../../widgets/headerWidget/HeaderWidget'

interface Story {
	id: string
	user: string
	image: string
}

export default function StoriesWidget() {
	const [stories, setStories] = useState<Story[]>([])

	useEffect(() => {
		async function loadStories() {
			try {
				const fetched = await fetchSpotifyData('new')
				if (Array.isArray(fetched)) {
					const apiStories: Story[] = fetched.map((item: any, idx: number) => ({
						id: item.id || `api-${idx}`,
						user: item.user || item.title || 'Unknown',
						image: item.image || item.imageUrl || '/stories/default.jpg',
					}))
					setStories([...apiStories])
				}
			} catch (error) {}
		}
		loadStories()
	}, [])

	return (
		<div className={styles.storiesWidget}>
			<HeaderWidget />
			<h3 className={styles.title}>Recently Added</h3>
			<div className={styles.storiesList}>
				{stories.map(story => (
					<div key={story.id} className={styles.story}>
						<img
							src={story.image}
							alt={story.user}
							className={styles.storyImage}
						/>
						<span className={styles.userName}>{story.user}</span>
					</div>
				))}
			</div>
			<FooterWidget />
		</div>
	)
}
