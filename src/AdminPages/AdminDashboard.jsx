import React from 'react';
import DescriptionArrays from '../Modules/DescriptionArrays';
import AdminNavbar from './AdminNavbar';

const AdminDashboard = () => {

  return (
    <>
      <AdminNavbar/>
        <div className='px'>
      <h1 className=' flex justify-center  text-5xl'>  Welcome to Admin Dashboard </h1>
     
      <DescriptionArrays />
    </div>
    </>
  );
}

export default AdminDashboard;
