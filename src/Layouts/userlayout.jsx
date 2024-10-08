import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function Userlayout() {
  const user = useSelector((state) => state.auth.user)
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
    </div>
  )
}

