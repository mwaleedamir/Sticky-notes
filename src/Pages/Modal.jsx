import React, { useState } from 'react';
import Cross from '../Pages/small_icons/cross';

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

export default Modal;
