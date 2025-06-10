import './App.css'
// import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import About from '../pages/about/About'
import ContactUs from '../pages/contactUs/ContactUs'
import Blog from '../pages/blog/Blog'
import Cart from '../pages/cart/Cart'
import CatalogPage from '../pages/catalogPage/CatalogPage'
import NotFoundPage from '../pages/notFoundPage/NotFoundPage'
import Home from '../pages/home/Home'
import HeaderWidget from '../widgets/headerWidget/HeaderWidget'

function App() {
	return (
		<div className='qwe'>
			<HeaderWidget />

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/contactUs' element={<ContactUs />} />
				{/* <Route path='/blog' element={<Blog />} /> */}
				<Route path='/cart' element={<Cart />} />
				<Route path='/catalog' element={<CatalogPage />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
			{/* <FooterWidget /> */}
		</div>
	)
}
export default App
