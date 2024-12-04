import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar.jsx'
import Footer from '../footer/Footer.jsx'
function Layout() {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
  
    </div>
  )
}

export default Layout
