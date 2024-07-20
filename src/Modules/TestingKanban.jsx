import React, { useEffect, useState } from 'react'
import Plus from '../Pages/small_icons/plus'
import {post} from '../services/ApiEndpoint'
import { toast } from 'react-toastify'

const TestingKanban = () => {
    const [column ,setColumn] = useState([])
    const [columnName,SetColumnName] = useState('')
    const [columnId,setColumnId] = useState(Math.floor(Math.random()*10001))

    useEffect(()=>{
        // const responses = await get('/board/columns',{columnName , columnId })
        localStorage.getItem('ColumnInfo', JSON.parse(ColumnInfo))

    },[])

    const AddColumn = async() =>{
        try {
            const ColumnInfo = [...column, {columnName , columnId, userId }]
            const response = await post('/board/columns',{columnName , columnId, userId })
            SetColumnName(columnName)
            setColumn(ColumnInfo)
            setColumnId(columnId + 1) 
            localStorage.setItem('ColumnInfo', JSON.stringify(ColumnInfo))
            if(response.status === 201) {
                toast.success(response.message)
            }
            SetColumnName('')
        } catch (error) {
            console.log("In adding column",error)
            toast.error(error.message,'Failed to add column')
        }
       
    }

  return (
    <div className='flex min-h-screen w-full py-3 overflow-x-auto overflow-y-hidden '>
    <div className=' '>
        <input type="text"
         value={columnName}
         onChange={(e) => SetColumnName(e.target.value)}
        placeholder='Add Column' className='text-white justify-around items-center h-[50px] w-[250px] min-w-[250px] bg-black border-2 border-black ring-rose-500 hover:ring-2'/>
      <button onClick={AddColumn} className='text-white justify-around items-center h-[50px] w-[250px] min-w-[250px] cursor-pointer bg-black border-2 border-black ring-rose-500 hover:ring-2 flex flex-row' >  Add Columm  <Plus/></button>
    </div>
    <div>
        { column.map((columnName,index) =>
        (<div key={index} className='h-[50px] w-[250px] min-w-[250px] text-white justify-around items-center border-2 border-black ring-rose-500 hover:ring-2'>
            Column {index+1}
            <li>{columnName}</li>
        </div>)
        )}
    </div>
    </div>
  )
}

export default TestingKanban
