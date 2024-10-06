import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className=' py-20 min-h-screen bg-gray-50'>
      <Outlet></Outlet>
    </div>
  )
}

export default AuthLayout
