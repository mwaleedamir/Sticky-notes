import axios from 'axios';
import React, { useState } from 'react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [name, setName] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [info, setInfo] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (info.password !== info.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/auth/signup', info);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/login', { email: info.email, password: info.password });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const togglePage = () => {
    setIsLogin(!isLogin);
  };

  const togglePasswordVisibility = () => {
    const passwordField = document.getElementById('password');
    if (passwordField.type === 'password') {
      passwordField.type = 'text';
    } else {
      passwordField.type = 'password';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
        {isLogin ? (
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  value={info.email}
                  onChange={handleInputChange}
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Email address"
                />
              </div>
              <div className="-mt-px">
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  value={info.password}
                  onChange={handleInputChange}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Password"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  value={info.name}
                  onChange={handleInputChange}
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  value={info.email}
                  onChange={handleInputChange}
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Email address"
                />
              </div>
              <div className="-mt-px">
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  value={info.password}
                  onChange={handleInputChange}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Password"
                  onDoubleClick={togglePasswordVisibility}
                />
              </div>
              <div className="-mt-px">
                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                <input
                  value={info.confirmPassword}
                  onChange={handleInputChange}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Confirm Password"
                  onDoubleClick={togglePasswordVisibility}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </form>
        )}
        <div className="mt-4 text-center">
          <button
            onClick={togglePage}
            className="text-indigo-600 hover:underline"
          >
            {isLogin ? 'Create an account' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
