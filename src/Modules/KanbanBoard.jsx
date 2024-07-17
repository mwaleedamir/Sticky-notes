import React, { useState } from 'react';
import Plus from '../Pages/small_icons/plus';

// pakistan force online consultant

const KanbanBoard = () => {
    const [column ,setColumn] = useState([])

    const addColumn = () =>{
        setColumn([...column,{}])
    }

    return (
        <>
            <div className='flex flex-wrap'>
                {column.map((item , index) => (
                    <div key={index} className='w-[20%] p-4'>
                        <div className='border border-gray-200 p-4'>
                            {/* TODO: Add Kanban Board */}
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-center'>
                <button onClick={addColumn} className='bg-blue-200 flex justify-center'>
                    <Plus/>
                    Add Column
                </button>
            </div>
        </>
    )
  return (
    <>
      <div className='m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40]'>
        <div className='m-auto'>
            <button className='bg-blue-200 flex justify-center'>
                <Plus/>
                Add Column
            </button>
        </div>


      </div>
    </>
  )
}

export default KanbanBoard


