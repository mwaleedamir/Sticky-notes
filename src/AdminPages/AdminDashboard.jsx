import React from 'react';
import TestingKanban from '../Modules/TestingKanban'
import AdminNavbar from './AdminNavbar';

const AdminDashboard = () => {

  return (
    <>
      <AdminNavbar/>
        <div className='px'>
      <h1 className=' flex justify-center  text-5xl'>  Welcome to Admin Dashboard </h1>
     
      <TestingKanban />
    </div>
    </>
  );
}

export default AdminDashboard;
