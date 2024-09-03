import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Plus from '../Pages/small_icons/plus';
import Ellipses from '../Pages/small_icons/ellipses';
import { useSelector, useDispatch } from 'react-redux';
import { post, get, remove, put } from '../services/ApiEndpoint.js';
import { setBoard } from '../redux/BoardSlice.js';
import Modal from '../Pages/Modal.jsx';

const Sidebar = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boards, setBoards] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [editingBoardId, setEditingBoardId] = useState(null);
  const [newTitle, setNewTitle] = useState('');

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth._id);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await get('/board/boards');
        setBoards(response.data);
        dispatch(setBoard(response.data));
      } catch (error) {
        console.log('fetch ERROR:', error);
      }
    };

    if (userId) {
      fetchBoards();
    }
  }, [userId, dispatch]);

  const addBoard = async (title) => {
    try {
      await post('/board/boards', { title, userId });
      const response = await get('/board/boards');
      setBoards(response.data);
      dispatch(setBoard(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBoard = async (boardId) => {
    try {
      await remove(`/board/boards/${boardId}`);
      const response = await get('/board/boards');
      setBoards(response.data);
      dispatch(setBoard(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const updateBoard = async (boardId, newTitle) => {
    try {
      await put(`/board/boards/${boardId}`, { title: newTitle });
      const response = await get('/board/boards');
      setBoards(response.data);
      dispatch(setBoard(response.data));
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

  const toggleDropdown = (boardId) => {
    setActiveDropdown(activeDropdown === boardId ? null : boardId);
  };

  const handleEditBoard = (boardId, currentTitle) => {
    setEditingBoardId(boardId);
    setNewTitle(currentTitle);
    setActiveDropdown(null);
  };

  const handleSaveEdit = () => {
    if (newTitle.trim() === '') return;
    updateBoard(editingBoardId, newTitle);
    setEditingBoardId(null);
    setNewTitle('');
  };

  return (
    <>
      <div className="flex fixed h-[98vh] min-w-56">
        <div className="fixed top-10 left-5 h-10 z-50 text-2xl cursor-pointer sm:relative" onClick={toggleSidebar}>
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
              {boards.filter(board => board.userId === userId).map((board) => (
                <li className="flex flex-row text-white" key={board._id}>
                  <Link to={`/${props.role}/${props.page}/${board._id}`} className="w-full flex px-4 py-2 hover:bg-gray-700">
                    {editingBoardId === board._id ? (
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onBlur={handleSaveEdit}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveEdit();
                          if (e.key === 'Escape') setEditingBoardId(null);
                        }}
                        className="w-full px-2 py-1 text-black border rounded-md"
                        autoFocus
                      />
                    ) : (
                      board.title
                    )}
                  </Link>
                  <div className="relative">
                    <button className="pr-4" onClick={() => toggleDropdown(board._id)}>
                      <Ellipses />
                    </button>
                    {activeDropdown === board._id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                        <ul className="py-1">
                          <li>
                            <button
                              onClick={() => handleEditBoard(board._id, board.title)}
                              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              Edit
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => deleteBoard(board._id)}
                              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <Modal isOpen={isModalOpen} closeModal={closeModal} addBoard={addBoard} />
    </>
  );
};

export default Sidebar;
