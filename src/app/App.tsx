import './App.css'
import { Route, Routes } from 'react-router-dom'
import About from '../pages/about/About'
import Home from '../pages/home/Home'
import Discover from '../pages/discover/Discover'
import AppHeaderWidget from '../widgets/appHeaderWidget/AppHeaderWidget'
import Albums from '../pages/albums/Albums'
import Artists from '../pages/artists/Artists'
import Contact from '../pages/сontact/Contact'
import Premuim from '../pages/premuim/Premuim'
import PecentlyAdded from '../pages/pecentlyAdded/RecentlyAdded'
import MostPlayed from '../pages/mostPlayed/MostPlayed'
import YourFavorites from '../pages/yourFavorites/YourFavorites'

function App() {
	return (
		<div className='qwe'>
			<AppHeaderWidget />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/discover' element={<Discover />} />
				<Route path='/albums' element={<Albums />} />
				<Route path='/artists' element={<Artists />} />
				<Route path='/about' element={<About />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/premium' element={<Premuim />} />
				<Route path='/pecentlyAdded' element={<PecentlyAdded />} />
				<Route path='/mostPlayed' element={<MostPlayed />} />
				<Route path='/youFavorites' element={<YourFavorites />} />
			</Routes>
			{/* <FooterWidget /> */}
		</div>
	)
}
export default App
