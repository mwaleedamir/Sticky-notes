import React, { useState } from 'react'
import axios from 'axios'

const DescriptionArrays = () => {
    const [description,setdescription] = useState([])
    
    const addDescription = async() => {
      const Description = await axios.post('http://localhost:8080/items',description)

      setdescription(Description)

    }


  return (
   <>
   
   
   
   </>
  )
}

export default DescriptionArrays



