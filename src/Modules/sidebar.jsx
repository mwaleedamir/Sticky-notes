import React, { useState } from 'react';
import { Sidebar } from 'flowbite-react';
import { HiChartPie, HiTable} from 'react-icons/hi';
import { Link ,useNavigate} from "react-router-dom";
import DescriptionArrays from '../Modules/DescriptionArrays';
import {post} from '../services/ApiEndpoint.js';
import { toast } from 'react-hot-toast';
export function Component() {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const handleItemClick = (name) => {
    setActiveItem(name);
  };

  const nav = useNavigate();

  const logOut = async() =>{
    // e.preventDefault();
    try {
        const request = await post('/auth/logout')
        const response = await request.data
        if(response.status === 200){
            toast.success(response.message)
            nav('/login')
        }
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <div className="flex h-screen ">
      <Sidebar aria-label="Default sidebar example" className="">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <div className="p-4">
              <h1 className="text-2xl font-bold"><Link to="/">MERN APP</Link></h1>
            </div>
            <Sidebar.Item
              icon={HiChartPie}
              className={activeItem === 'Dashboard' ? 'bg-gray-200' : ''}
              onClick={() => handleItemClick('Dashboard')}
            >
             <Link to="/" className=" hover:text-blue-600">Dashboard</Link>   
            </Sidebar.Item>
             
            <Sidebar.Item
              icon={HiTable}
              className={activeItem === 'Sign Up' ? 'bg-gray-200' : ''}
              onSubmit={()=>logOut()}
            >
              <Link to="/login">Signout </Link> 
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
      <div className="flex-1 p-6 bg-gray-100">
        {/* Main content goes here */}

        <h2 className="text-3xl font-bold">Welcome to the Dashboard</h2>
        
        <DescriptionArrays />
      </div>
    </div>
  );
}
