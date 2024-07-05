// import React from 'react'

// const Signup = () => {
//   return (
//     <>
//     <div className=' h-64 bg-slate-600 static' >

//         <div className="w-72 h-72 bg-red-400 justify-center content-center  align-middle absolute right-1/4 top-1/4 ">
//             <h1 className='flex content-center'>signup</h1>
//             <form>
//                 <input className='' type='text' placeholder='placeholder'/>
//                 {/* <input className="w-56 pl-2 active: outline-transparent " type="text" name="textBox" placeholder="Textbox" id="" /> */}
//             </form>
//         </div>
//     </div>
    

//     <div className="h-80 bg-black"></div>



//     </>
//   )
// }

// export default Signup


import React, { useState } from 'react';

const AuthPage = () => {
  const[name, setname] = useState('')
  const[email,setemail] = useState('')
  const[password,setpassword] = useState('')
  const[confirmPassword,setconfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name,email,password,confirmPassword)
  }
  

  // const passConfirm = () => {
  //   (password === confirmPassword)
  // }



  const [isLogin, setIsLogin] = useState(true);

  const togglePage = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
        {isLogin ? (
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <div>
                
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  value={email}
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Email address"
                  onChange={(e)=> setemail(e.target.value)}

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
                  className="relative block w-full px-3 py-2 border border-gray-300 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Password"
                  onChange={(e)=> setpassword(e.target.value)}
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
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm">
              <div>
              <label htmlFor="name" className="sr-only" >Name</label>
                <input
                  value={name}
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Name"
                  onChange={(e)=> setname(e.target.value)}
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
                  onChange={(e)=> setemail(e.target.value)}
                />
              </div>
              <div className="-mt-px">
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  value = {password}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Password"
                  onChange={(e)=> setpassword(e.target.value)}
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
                  onChange={(e)=> setconfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <button
              onClick={()=>{handleSubmit()}}
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
