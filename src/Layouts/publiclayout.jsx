import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function Publiclayout(){

  const user =  useSelector((state) => state.Auth.user)
  const navigate = useNavigate()
  useEffect(()=>{
    if(user === 'user'){
      navigate('/user')
    }
    if(user === 'admin'){
      navigate('/admin')
    }
  },[user,navigate])

  return (
    <div>
      <Outlet/>
    </div> 
  )
}

