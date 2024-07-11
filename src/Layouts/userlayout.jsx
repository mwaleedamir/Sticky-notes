import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import Home from '../Pages/Home'

export default function Userlayout() {
  const user = useSelector((state) => state.Auth.user)
  const navigate = useNavigate()
  console.log(user) 

  useEffect(()=>{
  if (!user){
    navigate('/login')
  }
  },[user,navigate])

  return (
    <div>
      <Outlet/>
      <Home/>
    </div>
  )
}

