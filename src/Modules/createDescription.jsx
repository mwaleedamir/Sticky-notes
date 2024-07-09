import React, { useState } from 'react'
import DescriptionArrays from './DescriptionArrays'

const createDescription = () => {

    const [createDes,setcreatedes] = useState([])

    const Create = () => {
        setcreatedes(createDes.map())
    }

    return (
    <div>
      <button onClick={Create}></button>
    </div>
  )
}

export default createDescription


