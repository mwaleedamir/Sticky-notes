import React, { useState } from 'react';
import backgroundImage from './icons/1.jpg';
// import backgroundImage from './icons/forest1.jpg';
import {Link} from 'react-router-dom'
import {post} from '../services/ApiEndpoint.js'
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { setUser } from '../redux/AuthSlice.js';


const Login = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword,setShowPassword] = useState(false)
  const nav = useNavigate();
  const dispatch = useDispatch()


  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const request = await post('/auth/login',{email,password})
      const response = request.data
      if(request.status === 200){
        if(response.user.role === 'admin'){
          nav('/admin')
        }else if(response.user.role === 'user'){
          nav('/user')
        }
        toast.success(response.message)
        dispatch(setUser(response.user))
                                            
      }
    } catch (error) {
      if(error.message){
        toast.error(error.response.data.message)
      }
      console.log(error)
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})`}}>
      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-white mb-6">LOGIN</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              value={email}
              id="email"
              name="email"
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              value={password}
              id="password"
              name="password"
              type= {showPassword ? "text": "password" }
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" id="remember-me" onChange={togglePasswordVisibility} checked={showPassword} className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 text-sm text-white">Show password</label>
              
            </div>
      
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Login
          </button>
          <p className="text-white text-center text-xl hover:text-green-400"> <Link to={'/'}>Don't have an account ?</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
