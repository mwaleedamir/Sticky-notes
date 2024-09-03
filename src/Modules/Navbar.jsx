import { Link, useNavigate } from "react-router-dom";
import { post } from '../services/ApiEndpoint.js';
import { toast } from 'react-hot-toast';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logOut } from "../redux/AuthSlice.js";


const Navbar = (props) => {
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
        toast.error(request.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while logging out');
    }
  };

  return (
    <nav className="fixed w-full z-30 bg-cover bg-center shadow-lg p-4" style={{ backgroundImage: `url(${props.bg})` }}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/user" className="text-xl font-bold text-white">User Dashboard</Link>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block sm:hidden text-white hover:text-gray-200 focus:outline-none focus:text-gray-200"
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
              <Link to='/user' className="hover:text-gray-200 text-white">Dashboard</Link>
            </li>
            <li>
              <button onClick={logingOut} className="hover:text-gray-200 text-white">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
