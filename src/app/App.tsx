import './App.css'
// import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import About from '../pages/about/About'
import ContactUs from '../pages/contactUs/ContactUs'
// import Cart from '../pages/cart/Cart'
import CatalogPage from '../pages/catalogPage/CatalogPage'
import NotFoundPage from '../pages/notFoundPage/NotFoundPage'
import Home from '../pages/home/Home'
import Discover from '../pages/discover/Discover'
import AppHeaderWidget from '../widgets/appHeaderWidget/AppHeaderWidget'
import Albums from '../pages/albums/Albums'

function App() {
	return (
		<div className='qwe'>
			<AppHeaderWidget />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/discover' element={<Discover />} />
				<Route path='/albums' element={<Albums />} />
				<Route path='/about' element={<About />} />
				<Route path='/contactUs' element={<ContactUs />} />
				{/* <Route path='/blog' element={<Blog />} /> */}
				{/* <Route path='/cart' element={<Cart />} /> */}
				<Route path='/catalog' element={<CatalogPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
			{/* <FooterWidget /> */}
		</div>
	)
}
export default App
