import React from 'react'
import axios from 'axios'

const clientId = '9db623453ae2426281bd71fac38fbcdf'
const clientSecret = '187f1cb1c3b34998b17dce975fad783f'

let accessToken: string | null = null

export const getAccessToken = async (): Promise<string | null> => {
	if (accessToken) return accessToken

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

		accessToken = response.data.access_token
		return accessToken
	} catch (error) {
		console.error('Ошибка при получении токена Spotify:', error)
		return null
	}
}

export const fetchSpotifyData = async (
	type: 'artist' | 'track' | 'new',
	query: string = 'a'
) => {
	const token = await getAccessToken()
	if (!token) return []

	let url = ''
	switch (type) {
		case 'artist':
			url = `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=50`
			break
		case 'track':
			url = `https://api.spotify.com/v1/search?q=${query}&type=track&limit=50`
			break
		case 'new':
			url = `https://api.spotify.com/v1/browse/new-releases?limit=50`
			break
	}

	try {
		const response = await axios.get(url, {
			headers: { Authorization: `Bearer ${token}` },
		})

		const seen = new Set()

		if (type === 'artist') {
			return response.data.artists.items
				.filter(
					(item: any) =>
						item.images[0] && !seen.has(item.name) && seen.add(item.name)
				)
				.map((item: any) => ({
					id: item.id,
					title: item.name,
					subtitle: 'Artist',
					image: item.images[0].url,
				}))
		}

		if (type === 'track') {
			return response.data.tracks.items
				.filter(
					(item: any) =>
						item.album.images[0] && !seen.has(item.name) && seen.add(item.name)
				)
				.map((item: any) => ({
					id: item.id,
					title: item.name,
					subtitle: item.artists[0]?.name,
					image: item.album.images[0].url,
				}))
		}

		if (type === 'new') {
			return response.data.albums.items
				.filter(
					(item: any) =>
						item.images[0] && !seen.has(item.name) && seen.add(item.name)
				)
				.map((item: any) => ({
					id: item.id,
					title: item.name,
					subtitle: item.artists[0]?.name,
					image: item.images[0].url,
				}))
		}

		return []
	} catch (error) {
		console.error('Ошибка при загрузке данных Spotify:', error)
		return []
	}
}

export const handleNext = (
	startIndex: number,
	artistsLength: number,
	setStartIndex: React.Dispatch<React.SetStateAction<number>>
) => {
	if (startIndex + 6 < artistsLength) {
		setStartIndex(prev => prev + 1)
	}
}

export const handlePrev = (
	startIndex: number,
	setStartIndex: React.Dispatch<React.SetStateAction<number>>
) => {
	if (startIndex > 0) {
		setStartIndex(prev => prev - 1)
	}
}

export default fetchSpotifyData
