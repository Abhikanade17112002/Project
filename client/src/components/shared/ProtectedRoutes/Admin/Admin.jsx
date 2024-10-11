import { getUserInfo } from '@/store/userSlice/userSlice'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'


const Admin = ({children}) => {
    const location = useLocation() ;
    const userInfo = useSelector(getUserInfo) ;
    const pathName = location.pathname ;

    if( userInfo && userInfo.role === "student" && pathName.includes("/admin"))
    {
        return < Navigate to={"/"}/>
    }
    if( userInfo && userInfo.role === "recruiter" && !pathName.includes("/admin"))
    {
            return < Navigate to={"/admin/companies"}/>
    }
  return children ;
}

export default Admin ;
