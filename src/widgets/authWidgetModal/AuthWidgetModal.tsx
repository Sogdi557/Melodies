// import React, { useState, useEffect } from 'react'
// import styles from './style.module.scss'
// import { auth } from '../../database/firebaseConfig'
// import {
// 	signInWithEmailAndPassword,
// 	GoogleAuthProvider,
// 	signInWithPopup,
// 	signOut,
// 	onAuthStateChanged,
// 	createUserWithEmailAndPassword,
// } from 'firebase/auth'

// interface Props {
// 	isOpen: boolean
// 	onClose: () => void
// 	onLoginSuccess?: (email: string) => void
// }

// const AuthWidgetModal: React.FC<Props> = ({
// 	isOpen,
// 	onClose,
// 	onLoginSuccess,
// }) => {
// 	const [email, setEmail] = useState('')
// 	const [password, setPassword] = useState('')
// 	const [name, setName] = useState('')
// 	const [number, setNumber] = useState('')
// 	const [agree, setAgree] = useState(false)
// 	const [error, setError] = useState('')
// 	const [isLoading, setIsLoading] = useState(false)
// 	const [userEmail, setUserEmail] = useState<string | null>(null)
// 	const [isLoginMode, setIsLoginMode] = useState(true)

// 	useEffect(() => {
// 		const unsubscribe = onAuthStateChanged(auth, user => {
// 			setUserEmail(user?.email ?? null)
// 		})
// 		return () => unsubscribe()
// 	}, [])

// 	if (!isOpen) return null

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault()
// 		setError('')

// 		if (!agree) return setError('Please agree to the terms of service')
// 		if (!email) return setError('Please enter email')
// 		if (isLoginMode) {
// 			if (!password) return setError('Please enter password')
// 		} else {
// 			if (!name) return setError('Please enter your name')
// 			if (!number) return setError('Please enter your phone number')
// 			if (!password) return setError('Please enter password')
// 		}

// 		try {
// 			setIsLoading(true)
// 			if (isLoginMode) {
// 				const userCredential = await signInWithEmailAndPassword(
// 					auth,
// 					email,
// 					password
// 				)
// 				onLoginSuccess?.(userCredential.user.email || '')
// 				onClose()
// 			} else {
// 				const userCredential = await createUserWithEmailAndPassword(
// 					auth,
// 					email,
// 					password
// 				)
// 				onLoginSuccess?.(userCredential.user.email || '')
// 				onClose()
// 			}
// 		} catch (error: any) {
// 			setError('Error: ' + (error.message || 'Please check your data'))
// 		} finally {
// 			setIsLoading(false)
// 		}
// 	}

// 	const handleGoogleLogin = async () => {
// 		setError('')
// 		try {
// 			setIsLoading(true)
// 			const provider = new GoogleAuthProvider()
// 			const result = await signInWithPopup(auth, provider)
// 			onLoginSuccess?.(result.user.email || '')
// 			onClose()
// 		} catch (error: any) {
// 			setError(
// 				'Error with Google login: ' +
// 					(error.message || 'Please try again later')
// 			)
// 		} finally {
// 			setIsLoading(false)
// 		}
// 	}

// 	const handleLogout = async () => {
// 		try {
// 			await signOut(auth)
// 			setUserEmail(null)
// 			setEmail('')
// 			setPassword('')
// 			setName('')
// 			setNumber('')
// 			setAgree(false)
// 			onClose()
// 		} catch (error) {
// 			setError('Logout error: ' + (error as any).message)
// 		}
// 	}

// 	return (
// 		<div className={styles.fullScreenContainer}>
// 			<button onClick={onClose} className={styles.closeButton}>
// 				×
// 			</button>

// 			<div className={styles.loginContent}>
// 				<img
// 					className={styles.logo}
// 					src='https://gen.kg/images/logo.svg'
// 					alt='logo'
// 				/>

// 				{userEmail ? (
// 					<div className={styles.welcomeSection}>
// 						<h1>You are logged in as:</h1>
// 						<p>{userEmail}</p>
// 						<button className={styles.submitButton} onClick={handleLogout}>
// 							Logout
// 						</button>
// 					</div>
// 				) : (
// 					<>
// 						<div className={styles.welcomeSection}>
// 							<h1>{isLoginMode ? 'Welcome back!' : 'Join our platform!'}</h1>
// 							<p>
// 								{isLoginMode
// 									? 'Login with email and password or via Google'
// 									: 'Become a member by providing some basic information'}
// 							</p>
// 						</div>

// 						<div className={styles.header}>
// 							<button
// 								className={isLoginMode ? styles.active : ''}
// 								onClick={() => setIsLoginMode(true)}
// 							>
// 								Login
// 							</button>
// 							<button
// 								className={!isLoginMode ? styles.active : ''}
// 								onClick={() => setIsLoginMode(false)}
// 							>
// 								Sign Up
// 							</button>
// 						</div>

// 						<form onSubmit={handleSubmit} className={styles.phoneForm}>
// 							{!isLoginMode && (
// 								<div className={styles.inputItem}>
// 									<div className={styles.inputGroup}>
// 										<label className={styles.label}>Name</label>
// 										<div className={styles.inputField}>
// 											<svg
// 												width='25'
// 												height='24'
// 												viewBox='0 0 25 24'
// 												fill='none'
// 												xmlns='http://www.w3.org/2000/svg'
// 											>
// 												<path
// 													d='M12.5 4C11.4391 4 10.4217 4.42143 9.67157 5.17157C8.92143 5.92172 8.5 6.93913 8.5 8C8.5 9.06087 8.92143 10.0783 9.67157 10.8284C10.4217 11.5786 11.4391 12 12.5 12C13.5609 12 14.5783 11.5786 15.3284 10.8284C16.0786 10.0783 16.5 9.06087 16.5 8C16.5 6.93913 16.0786 5.92172 15.3284 5.17157C14.5783 4.42143 13.5609 4 12.5 4ZM6.5 8C6.5 6.4087 7.13214 4.88258 8.25736 3.75736C9.38258 2.63214 10.9087 2 12.5 2C14.0913 2 15.6174 2.63214 16.7426 3.75736C17.8679 4.88258 18.5 6.4087 18.5 8C18.5 9.5913 17.8679 11.1174 16.7426 12.2426C15.6174 13.3679 14.0913 14 12.5 14C10.9087 14 9.38258 13.3679 8.25736 12.2426C7.13214 11.1174 6.5 9.5913 6.5 8ZM8.5 18C7.70435 18 6.94129 18.3161 6.37868 18.8787C5.81607 19.4413 5.5 20.2044 5.5 21C5.5 21.2652 5.39464 21.5196 5.20711 21.7071C5.01957 21.8946 4.76522 22 4.5 22C4.23478 22 3.98043 21.8946 3.79289 21.7071C3.60536 21.5196 3.5 21.2652 3.5 21C3.5 19.6739 4.02678 18.4021 4.96447 17.4645C5.90215 16.5268 7.17392 16 8.5 16H16.5C17.8261 16 19.0979 16.5268 20.0355 17.4645C20.9732 18.4021 21.5 19.6739 21.5 21C21.5 21.2652 21.3946 21.5196 21.2071 21.7071C21.0196 21.8946 20.7652 22 20.5 22C20.2348 22 19.9804 21.8946 19.7929 21.7071C19.6054 21.5196 19.5 21.2652 19.5 21C19.5 20.2044 19.1839 19.4413 18.6213 18.8787C18.0587 18.3161 17.2956 18 16.5 18H8.5Z'
// 													fill='white'
// 												/>
// 											</svg>
// 											<input
// 												type='text'
// 												name='name'
// 												placeholder='Enter Your Name'
// 												value={name}
// 												onChange={e => setName(e.target.value)}
// 												required
// 											/>
// 										</div>
// 									</div>

// 									<div className={styles.inputGroup}>
// 										<label className={styles.label}>Number</label>
// 										<div className={styles.inputField}>
// 											<svg
// 												width='25'
// 												height='24'
// 												viewBox='0 0 25 24'
// 												fill='none'
// 												xmlns='http://www.w3.org/2000/svg'
// 											>
// 												<path
// 													d='M7.53858 2.26703L8.96143 1.83846C9.60914 1.64305 10.3058 1.69003 10.9214 1.97062C11.537 2.25122 12.0295 2.74625 12.3069 3.36332L13.1923 5.33303C13.4309 5.86365 13.4973 6.45566 13.3824 7.02598C13.2674 7.5963 12.9767 8.11631 12.5511 8.51303L11.004 9.9556C10.9855 9.97399 10.9699 9.99509 10.9577 10.0182C10.7957 10.349 11.0417 11.2327 11.8123 12.5682C12.6814 14.0733 13.3526 14.6682 13.6637 14.5765L15.6943 13.955C16.2504 13.7852 16.8457 13.7937 17.3967 13.9792C17.9478 14.1647 18.427 14.518 18.7671 14.9896L20.0254 16.7322C20.4205 17.2793 20.6035 17.9513 20.5404 18.6232C20.4773 19.2951 20.1725 19.9212 19.6826 20.3853L18.6 21.4096C18.2235 21.7662 17.7664 22.0264 17.2676 22.1681C16.7688 22.3097 16.2431 22.3286 15.7354 22.223C12.7209 21.5956 10.02 19.1682 7.60972 14.9939C5.19858 10.817 4.44686 7.25989 5.41543 4.33446C5.57757 3.84469 5.85521 3.40115 6.2249 3.0413C6.59459 2.68146 7.04461 2.41589 7.53858 2.26703ZM7.91143 3.49789C7.61504 3.58716 7.34449 3.74647 7.12265 3.96234C6.90081 4.17822 6.73418 4.44432 6.63686 4.73817C5.80201 7.25903 6.47829 10.4613 8.72401 14.351C10.968 18.2382 13.4006 20.4239 15.9986 20.9639C16.3032 21.0271 16.6186 21.0157 16.9179 20.9306C17.2171 20.8455 17.4913 20.6893 17.7171 20.4753L18.7989 19.4519C19.0628 19.2021 19.227 18.8649 19.2611 18.5031C19.2951 18.1413 19.1967 17.7794 18.984 17.4847L17.7257 15.7413C17.5426 15.4874 17.2846 15.2972 16.988 15.1973C16.6913 15.0974 16.3708 15.0928 16.0714 15.1842L14.0357 15.8073C12.9094 16.1425 11.85 15.2039 10.6997 13.2102C9.72515 11.5233 9.38743 10.3045 9.80401 9.45332C9.88515 9.2876 9.99315 9.1416 10.128 9.01532L11.6751 7.57274C11.9044 7.35913 12.061 7.07909 12.1229 6.77194C12.1849 6.46479 12.1491 6.14595 12.0206 5.86017L11.1343 3.89132C10.9849 3.55897 10.7197 3.29234 10.3882 3.14123C10.0566 2.99013 9.68139 2.96487 9.33258 3.07017L7.91143 3.49789Z'
// 													fill='white'
// 												/>
// 											</svg>
// 											<input
// 												type='tel'
// 												name='number'
// 												placeholder='Enter Your Number'
// 												value={number}
// 												onChange={e => setNumber(e.target.value)}
// 												required
// 											/>
// 										</div>
// 									</div>
// 								</div>
// 							)}

// 							<div className={styles.inputGroup}>
// 								<label className={styles.label}>E-Mail</label>
// 								<div className={styles.inputField}>
// 									<svg
// 										width='25'
// 										height='24'
// 										viewBox='0 0 25 24'
// 										fill='none'
// 										xmlns='http://www.w3.org/2000/svg'
// 									>
// 										<g clipPath='url(#clip0_413_2450)'>
// 											<path
// 												d='M2.25 3H22.75C23.716 3 24.5 3.784 24.5 4.75V18.75C24.5 19.2141 24.3156 19.6592 23.9874 19.9874C23.6592 20.3156 23.2141 20.5 22.75 20.5H2.25C1.78587 20.5 1.34075 20.3156 1.01256 19.9874C0.684374 19.6592 0.5 19.2141 0.5 18.75V4.75C0.5 3.784 1.284 3 2.25 3ZM2 7.412V18.75C2 18.888 2.112 19 2.25 19H22.75C22.8163 19 22.8799 18.9737 22.9268 18.9268C22.9737 18.8799 23 18.8163 23 18.75V7.412L13.48 13.845C12.888 14.245 12.112 14.245 11.52 13.845L2 7.412ZM2 4.75V5.602L12.36 12.602C12.4013 12.6299 12.4501 12.6449 12.5 12.6449C12.5499 12.6449 12.5987 12.6299 12.64 12.602L23 5.602V4.75C23 4.6837 22.9737 4.62011 22.9268 4.57322C22.8799 4.52634 22.8163 4.5 22.75 4.5H2.25C2.1837 4.5 2.12011 4.52634 2.07322 4.57322C2.02634 4.62011 2 4.6837 2 4.75Z'
// 												fill='white'
// 											/>
// 										</g>
// 										<defs>
// 											<clipPath id='clip0_413_2450'>
// 												<rect
// 													width='24'
// 													height='24'
// 													fill='white'
// 													transform='translate(0.5)'
// 												/>
// 											</clipPath>
// 										</defs>
// 									</svg>
// 									<input
// 										type='email'
// 										name='email'
// 										placeholder='Enter Your E-Mail'
// 										value={email}
// 										onChange={e => setEmail(e.target.value)}
// 										required
// 									/>
// 								</div>
// 							</div>

// 							<div className={styles.inputGroup}>
// 								<label className={styles.label}>Password</label>
// 								<input
// 									type='password'
// 									value={password}
// 									onChange={e => setPassword(e.target.value)}
// 									placeholder='Password'
// 									className={styles.phoneInput}
// 									required
// 								/>
// 							</div>

// 							<label className={styles.agreeCheckbox}>
// 								<input
// 									type='checkbox'
// 									checked={agree}
// 									onChange={e => setAgree(e.target.checked)}
// 								/>
// 								I agree to the terms of service
// 							</label>

// 							{error && <div className={styles.errorMessage}>{error}</div>}

// 							<button
// 								type='submit'
// 								className={styles.submitButton}
// 								disabled={isLoading}
// 							>
// 								{isLoading
// 									? isLoginMode
// 										? 'Logging in...'
// 										: 'Signing up...'
// 									: isLoginMode
// 									? 'Login'
// 									: 'Sign Up'}
// 							</button>

// 							<div className={styles.divider}>
// 								<span>Or</span>
// 							</div>

// 							<button
// 								className={styles.googleButton}
// 								onClick={handleGoogleLogin}
// 								disabled={isLoading}
// 								type='button'
// 							>
// 								{isLoginMode ? 'Login with Google' : 'Sign up with Google'}
// 							</button>
// 						</form>
// 					</>
// 				)}
// 			</div>
// 		</div>
// 	)
// }

// export default AuthWidgetModal

// import React, { useState, useEffect } from 'react'
// import styles from './style.module.scss'
// import { auth } from '../../database/firebaseConfig'
// import {
// 	signInWithEmailAndPassword,
// 	GoogleAuthProvider,
// 	signInWithPopup,
// 	signOut,
// 	onAuthStateChanged,
// 	createUserWithEmailAndPassword,
// } from 'firebase/auth'

// interface AuthModalProps {
// 	isOpen: boolean
// 	onClose: () => void
// 	initialType: 'login' | 'signup'
// 	onLoginSuccess?: (email: string) => void
// }

// const AuthModal: React.FC<AuthModalProps> = ({
// 	isOpen,
// 	onClose,
// 	initialType,
// 	onLoginSuccess,
// }) => {
// 	const [email, setEmail] = useState('')
// 	const [password, setPassword] = useState('')
// 	const [name, setName] = useState('')
// 	const [number, setNumber] = useState('')
// 	const [agree, setAgree] = useState(false)
// 	const [error, setError] = useState('')
// 	const [isLoading, setIsLoading] = useState(false)
// 	const [userEmail, setUserEmail] = useState<string | null>(null)
// 	const [isLoginMode, setIsLoginMode] = useState(initialType === 'login')

// 	useEffect(() => {
// 		setIsLoginMode(initialType === 'login')
// 	}, [initialType])

// 	useEffect(() => {
// 		const unsubscribe = onAuthStateChanged(auth, user => {
// 			setUserEmail(user?.email ?? null)
// 		})
// 		return () => unsubscribe()
// 	}, [])

// 	if (!isOpen) return null

// 	const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault()
// 		setError('')

// 		if (!email) return setError('Please enter email')
// 		if (!password) return setError('Please enter password')
// 		if (!isLoginMode) {
// 			if (!name) return setError('Please enter your name')
// 			if (!number) return setError('Please enter your phone number')
// 			if (!agree) return setError('Please agree to the terms of service')
// 		}

// 		try {
// 			setIsLoading(true)
// 			if (isLoginMode) {
// 				const userCredential = await signInWithEmailAndPassword(
// 					auth,
// 					email,
// 					password
// 				)
// 				onLoginSuccess?.(userCredential.user.email || '')
// 			} else {
// 				const userCredential = await createUserWithEmailAndPassword(
// 					auth,
// 					email,
// 					password
// 				)
// 				onLoginSuccess?.(userCredential.user.email || '')
// 			}
// 			onClose()
// 		} catch (error: any) {
// 			setError('Error: ' + (error.message || 'Please check your data'))
// 		} finally {
// 			setIsLoading(false)
// 		}
// 	}

// 	const handleGoogleAuth = async () => {
// 		setError('')
// 		try {
// 			setIsLoading(true)
// 			const provider = new GoogleAuthProvider()
// 			const result = await signInWithPopup(auth, provider)
// 			onLoginSuccess?.(result.user.email || '')
// 			onClose()
// 		} catch (error: any) {
// 			setError(
// 				'Error with Google login: ' +
// 					(error.message || 'Please try again later')
// 			)
// 		} finally {
// 			setIsLoading(false)
// 		}
// 	}

// 	const handleLogout = async () => {
// 		try {
// 			await signOut(auth)
// 			setUserEmail(null)
// 			setEmail('')
// 			setPassword('')
// 			setName('')
// 			setNumber('')
// 			setAgree(false)
// 			onClose()
// 		} catch (error) {
// 			setError('Logout error: ' + (error as any).message)
// 		}
// 	}

// 	return (
// 		<div className={styles.modalOverlay} onClick={onClose}>
// 			<div className={styles.modalContent} onClick={e => e.stopPropagation()}>
// 				<button className={styles.closeButton} onClick={onClose}>
// 					×
// 				</button>

// 				{userEmail ? (
// 					<div className={styles.loggedInView}>
// 						<h2>Welcome, {userEmail}</h2>
// 						<button className={styles.logoutButton} onClick={handleLogout}>
// 							Logout
// 						</button>
// 					</div>
// 				) : (
// 					<>
// 						<div className={styles.tabs}>
// 							<button
// 								className={`${styles.tabButton} ${
// 									isLoginMode ? styles.active : ''
// 								}`}
// 								onClick={() => setIsLoginMode(true)}
// 							>
// 								Login
// 							</button>
// 							<button
// 								className={`${styles.tabButton} ${
// 									!isLoginMode ? styles.active : ''
// 								}`}
// 								onClick={() => setIsLoginMode(false)}
// 							>
// 								Sign Up
// 							</button>
// 						</div>

// 						<form onSubmit={handleSubmit} className={styles.authForm}>
// 							{!isLoginMode && (
// 								<>
// 									<div className={styles.formGroup}>
// 										<label>Name</label>
// 										<input
// 											type='text'
// 											value={name}
// 											onChange={e => setName(e.target.value)}
// 											placeholder='Enter your name'
// 										/>
// 									</div>
// 									<div className={styles.formGroup}>
// 										<label>Phone Number</label>
// 										<input
// 											type='tel'
// 											value={number}
// 											onChange={e => setNumber(e.target.value)}
// 											placeholder='Enter your phone number'
// 										/>
// 									</div>
// 								</>
// 							)}

// 							<div className={styles.formGroup}>
// 								<label>Email</label>
// 								<input
// 									type='email'
// 									value={email}
// 									onChange={e => setEmail(e.target.value)}
// 									placeholder='Enter your email'
// 								/>
// 							</div>

// 							<div className={styles.formGroup}>
// 								<label>Password</label>
// 								<input
// 									type='password'
// 									value={password}
// 									onChange={e => setPassword(e.target.value)}
// 									placeholder={
// 										isLoginMode ? 'Enter your password' : 'Create password'
// 									}
// 								/>
// 							</div>

// 							{!isLoginMode && (
// 								<div className={styles.agreeCheckbox}>
// 									<input
// 										type='checkbox'
// 										checked={agree}
// 										onChange={e => setAgree(e.target.checked)}
// 									/>
// 									<span>I agree to the terms of service</span>
// 								</div>
// 							)}

// 							{error && <div className={styles.errorMessage}>{error}</div>}

// 							<button
// 								type='submit'
// 								className={styles.submitButton}
// 								disabled={isLoading}
// 							>
// 								{isLoading
// 									? isLoginMode
// 										? 'Logging in...'
// 										: 'Signing up...'
// 									: isLoginMode
// 									? 'Login'
// 									: 'Sign Up'}
// 							</button>
// 						</form>

// 						<div className={styles.divider}>or</div>

// 						<button
// 							className={styles.googleButton}
// 							onClick={handleGoogleAuth}
// 							disabled={isLoading}
// 							type='button'
// 						>
// 							{isLoginMode ? 'Login with Google' : 'Sign up with Google'}
// 						</button>
// 					</>
// 				)}
// 			</div>
// 		</div>
// 	)
// }

// export default AuthModal

import React, { useState, useEffect } from 'react'
import styles from './style.module.scss'
import { auth } from '../../database/firebaseConfig'
import {
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	sendSignInLinkToEmail,
	isSignInWithEmailLink,
	signInWithEmailLink,
} from 'firebase/auth'

interface AuthModalProps {
	isOpen: boolean
	onClose: () => void
	initialType: 'login' | 'signup'
	onLoginSuccess?: (email: string) => void
}

const AuthModal: React.FC<AuthModalProps> = ({
	isOpen,
	onClose,
	initialType,
	onLoginSuccess,
}) => {
	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [number, setNumber] = useState('')
	const [agree, setAgree] = useState(false)
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [userEmail, setUserEmail] = useState<string | null>(null)
	const [isLoginMode, setIsLoginMode] = useState(initialType === 'login')
	const [emailSent, setEmailSent] = useState(false)

	useEffect(() => {
		setIsLoginMode(initialType === 'login')
	}, [initialType])

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			setUserEmail(user?.email ?? null)
		})
		return () => unsubscribe()
	}, [])

	useEffect(() => {
		// Проверяем, был ли переход по ссылке для входа
		if (isSignInWithEmailLink(auth, window.location.href)) {
			handleEmailLinkSignIn()
		}
	}, [])

	const handleEmailLinkSignIn = async () => {
		try {
			setIsLoading(true)
			let email = window.localStorage.getItem('emailForSignIn')
			if (!email) {
				email = window.prompt('Please provide your email for confirmation')
			}

			if (email) {
				const result = await signInWithEmailLink(
					auth,
					email,
					window.location.href
				)
				window.localStorage.removeItem('emailForSignIn')
				onLoginSuccess?.(result.user.email || '')
				onClose()
			}
		} catch (error: any) {
			setError('Error: ' + (error.message || 'Email link sign in failed'))
		} finally {
			setIsLoading(false)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')

		if (!email) return setError('Please enter email')
		if (!isLoginMode) {
			if (!name) return setError('Please enter your name')
			if (!number) return setError('Please enter your phone number')
			if (!agree) return setError('Please agree to the terms of service')
		}

		try {
			setIsLoading(true)

			if (isLoginMode) {
				// Для входа отправляем ссылку на email
				const actionCodeSettings = {
					url: window.location.origin,
					handleCodeInApp: true,
				}

				await sendSignInLinkToEmail(auth, email, actionCodeSettings)
				window.localStorage.setItem('emailForSignIn', email)
				setEmailSent(true)
			} else {
				// Для регистрации также используем email-ссылку
				const actionCodeSettings = {
					url: window.location.origin,
					handleCodeInApp: true,
				}

				await sendSignInLinkToEmail(auth, email, actionCodeSettings)
				window.localStorage.setItem('emailForSignIn', email)
				setEmailSent(true)
			}
		} catch (error: any) {
			setError('Error: ' + (error.message || 'Please check your data'))
		} finally {
			setIsLoading(false)
		}
	}

	const handleGoogleAuth = async () => {
		setError('')
		try {
			setIsLoading(true)
			const provider = new GoogleAuthProvider()
			const result = await signInWithPopup(auth, provider)
			onLoginSuccess?.(result.user.email || '')
			onClose()
		} catch (error: any) {
			setError(
				'Error with Google login: ' +
					(error.message || 'Please try again later')
			)
		} finally {
			setIsLoading(false)
		}
	}

	const handleLogout = async () => {
		try {
			await signOut(auth)
			setUserEmail(null)
			setEmail('')
			setName('')
			setNumber('')
			setAgree(false)
			setEmailSent(false)
			onClose()
		} catch (error) {
			setError('Logout error: ' + (error as any).message)
		}
	}

	if (!isOpen) return null

	return (
		<div className={styles.modalOverlay} onClick={onClose}>
			<div className={styles.modalContent} onClick={e => e.stopPropagation()}>
				<button className={styles.closeButton} onClick={onClose}>
					×
				</button>

				{userEmail ? (
					<div className={styles.loggedInView}>
						<h2>Welcome, {userEmail}</h2>
						<button className={styles.logoutButton} onClick={handleLogout}>
							Logout
						</button>
					</div>
				) : emailSent ? (
					<div className={styles.emailSentView}>
						<h2>Check your email!</h2>
						<p>We've sent a sign-in link to {email}</p>
						<p>Click the link in the email to continue.</p>
						<button
							className={styles.backButton}
							onClick={() => setEmailSent(false)}
						>
							Back to form
						</button>
					</div>
				) : (
					<>
						<div className={styles.tabs}>
							<button
								className={`${styles.tabButton} ${
									isLoginMode ? styles.active : ''
								}`}
								onClick={() => setIsLoginMode(true)}
							>
								Login
							</button>
							<button
								className={`${styles.tabButton} ${
									!isLoginMode ? styles.active : ''
								}`}
								onClick={() => setIsLoginMode(false)}
							>
								Sign Up
							</button>
						</div>

						<form onSubmit={handleSubmit} className={styles.authForm}>
							{!isLoginMode && (
								<div className={styles.inputGroup}>
									<div className={styles.formGroup}>
										<label>Name</label>
										<div className={styles.inputFieldName}>
											<svg
												width='25'
												height='24'
												viewBox='0 0 25 24'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													d='M12.5 4C11.4391 4 10.4217 4.42143 9.67157 5.17157C8.92143 5.92172 8.5 6.93913 8.5 8C8.5 9.06087 8.92143 10.0783 9.67157 10.8284C10.4217 11.5786 11.4391 12 12.5 12C13.5609 12 14.5783 11.5786 15.3284 10.8284C16.0786 10.0783 16.5 9.06087 16.5 8C16.5 6.93913 16.0786 5.92172 15.3284 5.17157C14.5783 4.42143 13.5609 4 12.5 4ZM6.5 8C6.5 6.4087 7.13214 4.88258 8.25736 3.75736C9.38258 2.63214 10.9087 2 12.5 2C14.0913 2 15.6174 2.63214 16.7426 3.75736C17.8679 4.88258 18.5 6.4087 18.5 8C18.5 9.5913 17.8679 11.1174 16.7426 12.2426C15.6174 13.3679 14.0913 14 12.5 14C10.9087 14 9.38258 13.3679 8.25736 12.2426C7.13214 11.1174 6.5 9.5913 6.5 8ZM8.5 18C7.70435 18 6.94129 18.3161 6.37868 18.8787C5.81607 19.4413 5.5 20.2044 5.5 21C5.5 21.2652 5.39464 21.5196 5.20711 21.7071C5.01957 21.8946 4.76522 22 4.5 22C4.23478 22 3.98043 21.8946 3.79289 21.7071C3.60536 21.5196 3.5 21.2652 3.5 21C3.5 19.6739 4.02678 18.4021 4.96447 17.4645C5.90215 16.5268 7.17392 16 8.5 16H16.5C17.8261 16 19.0979 16.5268 20.0355 17.4645C20.9732 18.4021 21.5 19.6739 21.5 21C21.5 21.2652 21.3946 21.5196 21.2071 21.7071C21.0196 21.8946 20.7652 22 20.5 22C20.2348 22 19.9804 21.8946 19.7929 21.7071C19.6054 21.5196 19.5 21.2652 19.5 21C19.5 20.2044 19.1839 19.4413 18.6213 18.8787C18.0587 18.3161 17.2956 18 16.5 18H8.5Z'
													fill='white'
												/>
											</svg>

											<input
												type='text'
												value={name}
												onChange={e => setName(e.target.value)}
												placeholder='Enter your name'
											/>
										</div>
									</div>
									<div className={styles.formGroup}>
										<label>Number</label>
										<div className={styles.inputFieldName}>
											<svg
												width='25'
												height='24'
												viewBox='0 0 25 24'
												fill='none'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													d='M7.53858 2.26703L8.96143 1.83846C9.60914 1.64305 10.3058 1.69003 10.9214 1.97062C11.537 2.25122 12.0295 2.74625 12.3069 3.36332L13.1923 5.33303C13.4309 5.86365 13.4973 6.45566 13.3824 7.02598C13.2674 7.5963 12.9767 8.11631 12.5511 8.51303L11.004 9.9556C10.9855 9.97399 10.9699 9.99509 10.9577 10.0182C10.7957 10.349 11.0417 11.2327 11.8123 12.5682C12.6814 14.0733 13.3526 14.6682 13.6637 14.5765L15.6943 13.955C16.2504 13.7852 16.8457 13.7937 17.3967 13.9792C17.9478 14.1647 18.427 14.518 18.7671 14.9896L20.0254 16.7322C20.4205 17.2793 20.6035 17.9513 20.5404 18.6232C20.4773 19.2951 20.1725 19.9212 19.6826 20.3853L18.6 21.4096C18.2235 21.7662 17.7664 22.0264 17.2676 22.1681C16.7688 22.3097 16.2431 22.3286 15.7354 22.223C12.7209 21.5956 10.02 19.1682 7.60972 14.9939C5.19858 10.817 4.44686 7.25989 5.41543 4.33446C5.57757 3.84469 5.85521 3.40115 6.2249 3.0413C6.59459 2.68146 7.04461 2.41589 7.53858 2.26703ZM7.91143 3.49789C7.61504 3.58716 7.34449 3.74647 7.12265 3.96234C6.90081 4.17822 6.73418 4.44432 6.63686 4.73817C5.80201 7.25903 6.47829 10.4613 8.72401 14.351C10.968 18.2382 13.4006 20.4239 15.9986 20.9639C16.3032 21.0271 16.6186 21.0157 16.9179 20.9306C17.2171 20.8455 17.4913 20.6893 17.7171 20.4753L18.7989 19.4519C19.0628 19.2021 19.227 18.8649 19.2611 18.5031C19.2951 18.1413 19.1967 17.7794 18.984 17.4847L17.7257 15.7413C17.5426 15.4874 17.2846 15.2972 16.988 15.1973C16.6913 15.0974 16.3708 15.0928 16.0714 15.1842L14.0357 15.8073C12.9094 16.1425 11.85 15.2039 10.6997 13.2102C9.72515 11.5233 9.38743 10.3045 9.80401 9.45332C9.88515 9.2876 9.99315 9.1416 10.128 9.01532L11.6751 7.57274C11.9044 7.35913 12.061 7.07909 12.1229 6.77194C12.1849 6.46479 12.1491 6.14595 12.0206 5.86017L11.1343 3.89132C10.9849 3.55897 10.7197 3.29234 10.3882 3.14123C10.0566 2.99013 9.68139 2.96487 9.33258 3.07017L7.91143 3.49789Z'
													fill='white'
												/>
											</svg>

											<input
												type='tel'
												value={number}
												onChange={e => setNumber(e.target.value)}
												placeholder='Enter Your Number'
											/>
										</div>
									</div>
								</div>
							)}

							<div className={styles.formGroup}>
								<label>E-Mail</label>
								<div className={styles.inputField}>
									<svg
										width='25'
										height='24'
										viewBox='0 0 25 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<g clip-path='url(#clip0_413_2450)'>
											<path
												d='M2.25 3H22.75C23.716 3 24.5 3.784 24.5 4.75V18.75C24.5 19.2141 24.3156 19.6592 23.9874 19.9874C23.6592 20.3156 23.2141 20.5 22.75 20.5H2.25C1.78587 20.5 1.34075 20.3156 1.01256 19.9874C0.684374 19.6592 0.5 19.2141 0.5 18.75V4.75C0.5 3.784 1.284 3 2.25 3ZM2 7.412V18.75C2 18.888 2.112 19 2.25 19H22.75C22.8163 19 22.8799 18.9737 22.9268 18.9268C22.9737 18.8799 23 18.8163 23 18.75V7.412L13.48 13.845C12.888 14.245 12.112 14.245 11.52 13.845L2 7.412ZM2 4.75V5.602L12.36 12.602C12.4013 12.6299 12.4501 12.6449 12.5 12.6449C12.5499 12.6449 12.5987 12.6299 12.64 12.602L23 5.602V4.75C23 4.6837 22.9737 4.62011 22.9268 4.57322C22.8799 4.52634 22.8163 4.5 22.75 4.5H2.25C2.1837 4.5 2.12011 4.52634 2.07322 4.57322C2.02634 4.62011 2 4.6837 2 4.75Z'
												fill='white'
											/>
										</g>
										<defs>
											<clipPath id='clip0_413_2450'>
												<rect
													width='24'
													height='24'
													fill='white'
													transform='translate(0.5)'
												/>
											</clipPath>
										</defs>
									</svg>

									<input
										type='email'
										value={email}
										onChange={e => setEmail(e.target.value)}
										placeholder='Enter Your E-Mail'
									/>
								</div>
							</div>

							{!isLoginMode && (
								<div className={styles.agreeCheckbox}>
									<input
										type='checkbox'
										checked={agree}
										onChange={e => setAgree(e.target.checked)}
									/>
									<span>I agree to the terms of service</span>
								</div>
							)}

							{error && <div className={styles.errorMessage}>{error}</div>}

							<button
								type='submit'
								className={styles.submitButton}
								disabled={isLoading}
							>
								{isLoading
									? isLoginMode
										? 'Sending link...'
										: 'Registering...'
									: isLoginMode
									? 'Send Login Link'
									: 'Sign Up'}
							</button>
						</form>

						<div className={styles.divider}>or</div>

						<button
							className={styles.googleButton}
							onClick={handleGoogleAuth}
							disabled={isLoading}
							type='button'
						>
							<svg
								width='20'
								height='20'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
								className={styles.googleIcon}
							>
								<path
									d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
									fill='#4285F4'
								/>
								<path
									d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
									fill='#34A853'
								/>
								<path
									d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
									fill='#FBBC05'
								/>
								<path
									d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
									fill='#EA4335'
								/>
							</svg>
							{isLoginMode ? 'Login with Google' : 'Sign up with Google'}
						</button>
					</>
				)}
			</div>
		</div>
	)
}

export default AuthModal
