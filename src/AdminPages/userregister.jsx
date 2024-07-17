import React, { useEffect, useState } from 'react'
import { get } from '../services/ApiEndpoint'
import AdminNavbar from './AdminNavbar';

const UserRegistered = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const request = await get('/admin/user');
        const email = request.data;
        setUserData(email);
      } catch (error) {
        setError(error);
      }
    }
    getUser();
  }, []);

  return (
    <>
    <AdminNavbar/>
    <div className='px-64'>
      Admin
      {error && <p>Error: {error.message}</p>}
      {userData && <p>{JSON.userData}</p>}
    </div>
    </>
  );
}

export default UserRegistered;
