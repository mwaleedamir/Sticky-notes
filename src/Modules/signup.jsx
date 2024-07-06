import React, { useState } from 'react';
import Login from './login';
// import axios from 'axios';

const AuthPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password, confirmPassword);
  }

  const togglePage = () => {
    setIsLogin(!isLogin);
  };

  return (
    isLogin ? (
      <div className="flex flex-col items-center justify-center bg-slate-950 min-h-screen">
        <div className="w-full max-w-md p-8 space-y-8 rounded bg-slate-500 shadow-md">
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm">
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                value={name}
                id="name"
                name="name"
                type="text"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                value={email}
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="-mt-px">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                value={password}
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="-mt-px">
              <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
              <input
                value={confirmPassword}
                id="confirm-password"
                name="confirm-password"
                type="password"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={togglePage}
              className="text-indigo-900 hover:underline"
            >
              {isLogin ? 'Create an account' : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    ) : (
      <Login />
    )
  );
};

export default AuthPage;
