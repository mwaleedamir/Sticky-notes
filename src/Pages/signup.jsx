import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from './icons/5.jpeg';
import { post } from '../services/ApiEndpoint.js';
import { toast } from 'react-hot-toast';

const Signup = () => {
  const [info, setInfo] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (info.password !== info.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    try { 
      const request = await post('/auth/signup', info);
      const response  = request.data;
      if (request.status === 200) {
        toast.success(response.message);
      }
      if (request.status === 400){
        toast.success(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Sign Up</h2>
        <form className="space-y-6" onSubmit={handleSignUp}>
          <div className="space-y-4">
            <h1 className='flex justify-center text-white text-2xl'>Welcome to my Notes</h1>
            <input
              value={info.name}
              onChange={handleInputChange}
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Name"
            />
            <input
              value={info.email}
              onChange={handleInputChange}
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Email address"
            />
            <input
              value={info.password}
              onChange={handleInputChange}
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Password"
            />
            <input
              value={info.confirmPassword}
              onChange={handleInputChange}
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Confirm Password"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="togglePassword"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              onChange={togglePasswordVisibility}
              checked={showPassword}
            />
            <label htmlFor="togglePassword" className="ml-2 text-sm text-white">Show Passwords</label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Sign Up
          </button>
          <p className="text-white text-center text-xl hover:text-green-400 mt-4">
            <Link to="/login">Have an account?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
