import React from 'react'
import TestingKanban from '../Modules/TestingKanban'
import AdminNavbar from './AdminNavbar';
import Sidebar from '../Modules/sidebar';
import bg from '../Pages/icons/img1.jpeg'
import { useParams } from 'react-router-dom';

const CreateAdmin = () => {
  const { boardId } = useParams();
  
  return ( 
    <div>
       <AdminNavbar bg = {bg}/>
        <div className='px'>
      <h1 className=' flex justify-center  text-5xl p'>  Welcome to Admin Dashboard </h1> 
      <div className="flex dark:bg-gray-800">
        <Sidebar role='admin' page='createadmin' />
        <div className="pl-[250px] pt-4 overfl ">
          <h1 className="text-2xl font-semibold">Board </h1>
          <TestingKanban boardId={boardId} />
        </div>
      </div>
    </div>
    </div>
  )
}

export default CreateAdmin
