import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router
import { FaBars, FaTimes } from 'react-icons/fa'; // Using Font Awesome icons
import Plus from '../Pages/small_icons/plus';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=' flex relative h-[90vh] min-w-56'>
      <div className="none top-4 left-4 z-50 text-2xl cursor-pointer sm:relative" onClick={toggleSidebar}>
        {isOpen ? <FaBars /> : <FaTimes /> }
      </div>
      <div className={`absolute top-0 left-0 h-full w-56 bg-gray-800 text-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-40`}>
        <nav className="mt-16">
          <ul className="space-y-4">
            <li>
              <Link to="/user/create" className="flex px-4 py-2 hover:bg-gray-700">Create</Link>
            </li>
            <li>
              <Link to="/user/newpage" className="flex px-4 py-2 hover:bg-gray-700">Your Boards <Plus/> </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'} z-30`} onClick={toggleSidebar}></div> */}
    </div>
  );
};

export default Sidebar;
