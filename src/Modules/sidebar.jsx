import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Plus from '../Pages/small_icons/plus';
import Ellipses from '../Pages/small_icons/ellipses';
import Cross from '../Pages/small_icons/cross';
import { useSelector, useDispatch } from 'react-redux';
import { post, get } from '../services/ApiEndpoint.js';
import { setBoard } from '../redux/BoardSlice.js';
import TestingKanban from './TestingKanban.jsx';

const Sidebar = (props,{boardId}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  // const [boardsId ,setBoardsId] = useState()
  const userId = useSelector((state) => state.auth._id);
  const columnId = useSelector((state) => state.column._id);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchBoards();
  }, [userId]);

  const fetchBoards = async () => {
    try {
      const response = await get('/board/boards');
      setBoards(response.data);
      console.log("columns id :- ", columnId);
      dispatch(setBoard(response.data));
    } catch (error) {
      console.log('fetch ERROR:', error);
    }
  };

  const addBoard = async (title) => {
    try {
      await post('/board/boards', { title, userId });
      fetchBoards();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const Modal = ({ isOpen, closeModal, addBoard }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      addBoard(title);
      setTitle('');
      closeModal();
    };

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-lg">
          <div className="flex justify-end mb-4">
            <button onClick={closeModal} className="text-black hover:text-gray-500">
              <Cross />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-end mb-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add Title"
                required
              />
            </div>
            <div className="w-full flex items-center">
              <button
                type="submit"
                className="w-full flex px-4 py-2 justify-center bg-blue-500 text-white hover:bg-blue-700 rounded-lg"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex fixed h-[98vh] min-w-56">
        <div className="fixed top-10 left-5 z-50 text-2xl cursor-pointer sm:relative" onClick={toggleSidebar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <div className={`fixed top-14 left-0 h-full w-56 bg-gray-800 text-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-40`}>
          <nav className="mt-16">
            <ul className="space-y-4">
              <li>
                <button onClick={openModal} className="w-full flex justify-around py-2 hover:bg-gray-700">
                  Your Boards <Plus />
                </button>
              </li>
              <div>
                <button >
                  
                </button>
              </div>
              {boards.map(board => (
                <li className = 'flex flex-row text-white' key={board._id}>
                  <button onClick={()=>{setIsOpen(false)}}>
                      {board.title}
                      <TestingKanban board_id = {board._id} />
                  </button>
                  {/* <Link to={`/${props.role}/${props.page}/${board._id}`} className="w-full flex px-4 py-2 hover:bg-gray-700">
                    {board.title}
                  </Link> */}
                  <button>
                    <Ellipses />
                  </button>
                </li>

              ))}
            </ul>
          </nav>
        </div>
      </div>
      {isModalOpen && <Modal isOpen={isModalOpen} closeModal={closeModal} addBoard={addBoard} />}
    </>
  );
};

export default Sidebar;
