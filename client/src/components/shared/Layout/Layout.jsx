import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const Layout = () => {
  return (
    <div className="w-full">
       <Navbar></Navbar>
       <Outlet></Outlet>
    </div>
   
  
  )
}

export default Layout ;
