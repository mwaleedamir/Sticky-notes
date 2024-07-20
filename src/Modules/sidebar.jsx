// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import Plus from '../Pages/small_icons/plus';
// import Modal from '../Pages/Modal';

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [boards, setBoards] = useState([]);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const addBoard = (title) => {
//     const newBoard = {
//       id: boards.length + 1,
//       title,
//     };
//     const set = setBoards([...boards, newBoard]);
//     localStorage.setItem(set)
//     closeModal(); // Close modal after adding board
//   };

//   return (
//     <div className="flex relative h-[98vh] min-w-56">
//       <div className="absolute top-4 left-4 z-50 text-2xl cursor-pointer sm:relative" onClick={toggleSidebar}>
//         {isOpen ? <FaBars /> : <FaTimes />}
//       </div>
//       <div className={`absolute top-0 left-0 h-full w-56 bg-gray-800 text-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-40`}>
//         <nav className="mt-16">
//           <ul className="space-y-4">
//             <li>
//               <button onClick={openModal} className="flex px-4 py-2 hover:bg-gray-700">
//                 Your Boards <Plus />
//               </button>
//               {isModalOpen && <Modal isOpen={isModalOpen} closeModal={closeModal} addBoard={addBoard} />}
//             </li>
//             {/* {boards.map(board => (
//               <li key={board.id}>
//                 <Link to={`/user/create/${board.id}`} className="flex px-4 py-2 hover:bg-gray-700">{board.title}</Link>
//               </li> ))} */}
              
//               {localStorage.getItem(boards.map(board => (
//               <li key={board.id}>
//                 <Link to={`/user/create/${board.id}`} className="flex px-4 py-2 hover:bg-gray-700">{board.title}</Link>
//               </li> )))}
//               <li>

//               </li>
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Plus from '../Pages/small_icons/plus';
import Modal from '../Pages/Modal';
import Ellipses from '../Pages/small_icons/ellipses';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    // Retrieve boards from localStorage
    const storedBoards = JSON.parse(localStorage.getItem('boards'));
    if (storedBoards) {
      setBoards(storedBoards);
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addBoard = (title) => {
    const newBoard = {
      id: boards.length + 1,
      title,
    };
    const updatedBoards = [...boards, newBoard];
    setBoards(updatedBoards);
    // Save to localStorage
    localStorage.setItem('boards', JSON.stringify(updatedBoards));
  };

  return (
    <div className="flex relative h-[98vh] min-w-56">
      <div className="absolute top-4 left-4 z-50 text-2xl cursor-pointer sm:relative" onClick={toggleSidebar}>
        {isOpen ? <FaBars /> : <FaTimes />}
      </div>
      <div className={`absolute top-0 left-0 h-full w-56 bg-gray-800 text-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-40`}>
        <nav className="mt-16">
          <ul className="space-y-4">
            <li>
              <button onClick={openModal} className="flex px-4 py-2 hover:bg-gray-700">
                Your Boards <Plus />
              </button>
              {isModalOpen && <Modal isOpen={isModalOpen} closeModal={closeModal} addBoard={addBoard} />}
            </li>
            {boards.map(board => (
              <li className='flex flex-row' key={board.id}>
                <Link to={`/user/create/${board.id}`} className=" w-full flex px-4 py-2 hover:bg-gray-700">{board.title}</Link>
               <button >
               <Ellipses/>
                </button> 
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
