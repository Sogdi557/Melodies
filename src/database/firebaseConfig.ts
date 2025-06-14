import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyBzBl_TsuGDNj0c9aXdza8FQPtIiFb2SW4',
	authDomain: 'milodi-7fb86.firebaseapp.com',
	projectId: 'milodi-7fb86',
	storageBucket: 'milodi-7fb86.appspot.com',
	messagingSenderId: '215375676582',
	appId: '1:215375676582:web:PUT_YOUR_ACTUAL_APP_ID_HERE',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
