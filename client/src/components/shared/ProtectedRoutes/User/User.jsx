import { getUserInfo } from '@/store/userSlice/userSlice'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import React from 'react'

const User = ({children}) => {
    const location = useLocation() ;
    const userInfo = useSelector(getUserInfo) ;
    const pathName = location.pathname ;
    console.log('====================================');
    console.log(pathName,userInfo,"CURRENT PATH USER CHECK");
    console.log('====================================');

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

export default User ;
