import React, { useState } from 'react'

const Dropdown = () => {
    const [updateName,setUpdateName] = useState('')
    const [DeleteName, setDeleteName] = useState('')


    const handleUpdateName = async(e) => {
        const response = await put('/items/items/:id',{
            name: updateName
        })
    }
  return (
    <div>
      <button>Dropdown</button>
      <div className="dropdown-content">
        <button>update name</button>
        <button>Delete</button>
    </div>
    </div>
  )
}

export default Dropdown
