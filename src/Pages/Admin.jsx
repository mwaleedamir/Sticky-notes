import React, { useEffect } from 'react'
import { get } from '../services/ApiEndpoint'
// import DescriptionArrays from '../Modules/DescriptionArrays'

const Admin = () => {

  useEffect(()=>{
    const getUser  = async() => {
        try {
          const request = await get('/admin/user')
          const response = request.data
          console.log(response)
          
        } catch (error) {
          console.log(error)
        }
      }
      getUser()
    },[])
  return (
    <div>
      Admin
    </div>
  )
}

export default Admin
