import React from 'react';
import AdminNavbar from './AdminNavbar';
import Sidebar from '../Modules/sidebar';
import bg from '../Pages/icons/5.jpeg'
const AdminDashboard = () => {

  return (
    <>
     <AdminNavbar bg = {bg}/>
        <div className='px'>
      <h1 className=' flex justify-center  text-5xl'>  Welcome to Admin Dashboard </h1> 
      <div className="flex dark:bg-gray-800">
        <Sidebar role='admin' page='createadmin' />
      </div>
    </div>
    </>
  );
}

export default AdminDashboard;
