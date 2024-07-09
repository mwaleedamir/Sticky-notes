import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function Adminlayout(){

const user =  useSelector((state)=>state.Auth.user)
console.log(user)
  const nav = useNavigate()
  useEffect(()=>{
    if (!user || user.role !== 'admin'){
      nav('/user/login')
    }
  },[user])

  return (
    <div>
      <Outlet/>
    </div>
  )
}

