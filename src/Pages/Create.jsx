import React from 'react'
import Sidebar from '../Modules/sidebar'
import Navbar from '../Modules/Navbar'
import bg from '../Pages/icons/img1.jpeg'
import DescriptionArrays from '../Modules/DescriptionArrays';
const Create = () => {
  return (
    <>
    <Navbar bg={bg}/>
    <div className='flex dark:bg-gray-800'>
            <Sidebar/>
            <div className='pl-4 pt-4'>
                <DescriptionArrays/>
            </div>
    </div>
    </>
  )
}

export default Create
