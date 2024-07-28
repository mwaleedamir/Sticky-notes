import React, { useEffect, useState } from 'react';
import { get } from '../services/ApiEndpoint';
import AdminNavbar from './AdminNavbar';
import bg from '../Pages/icons/forest1.jpg';

const UserRegistered = () => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const request = await get('/auth/signup');
        setUserData(request.data);  // Assuming request.data is an array of user data
      } catch (error) {
        setError(error);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <AdminNavbar bg={bg} />
      <div className='p-4'>
        <h1 className='text-xl font-bold mb-4'>Admin</h1>
        {error && <p className='text-red-500'>Error: {error.message}</p>}
        {userData.length > 0 ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 flex justify-between font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {user.email}
                      <div>
                      {user.role}
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No users registered yet.</p>
        )}
      </div>
    </>
  );
}

export default UserRegistered;
