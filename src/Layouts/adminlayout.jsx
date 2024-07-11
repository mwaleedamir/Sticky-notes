import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import Adminsidebar from '../AdminPages/SideBarAdmin'


export default function Adminlayout(){
 
const user =  useSelector((state) => state.Auth.user)
console.log(user)
  const navigate = useNavigate()
  useEffect(()=>{
    if (!user || user.role !== 'admin'){
      navigate('/login')
    }

  },[user,navigate])
 
  return (
    <div>
      <Outlet/>
      <Adminsidebar/>
    </div>
  )
}

