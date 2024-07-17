import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { post } from '../services/ApiEndpoint.js';
import { toast } from 'react-hot-toast';
import React, { useState } from 'react';
import { logOut } from "../redux/Authslice.js";

const AdminNavbar = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const logingOut = async () => {
    try {
      const request = await post('/auth/logout');

      if (request.status === 200) {
        toast.success(request.data.message);
        dispatch(logOut());
        nav('/login');
      } else if (request.status === 400) {
        toast.success(request.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-gray-700 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/admin" className="text-xl font-bold">Admin Dashboard</Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block sm:hidden text-gray-400 hover:text-white focus:outline-none focus:text-white"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <div className={`sm:flex sm:items-center ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="sm:flex sm:space-x-6 mt-4 sm:mt-0">
            <li>
              <Link to="/admin" className="hover:text-gray-400">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/history" className="hover:text-gray-400 flex items-center">
                History
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-2 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/userlogin" className="hover:text-gray-400">User Logged in</Link>
            </li>
            <li>
              <Link to="/admin/register" className="hover:text-gray-400">User Registered</Link>
            </li>
            <li>
              <button onClick={logingOut} className="hover:text-gray-400">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
