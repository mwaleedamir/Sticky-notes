import React, { useState } from 'react';
import Cross from '../Pages/small_icons/cross';

const Modal = ({ isOpen, closeModal, addBoard }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addBoard(title);
    setTitle('');
    closeModal()
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="flex justify-end">
          <button onClick={closeModal} className="text-black hover:text-gray-500">
            <Cross />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-end">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-2 py-1 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add Title"
              required
            />
          </div>
          <div className="w-full flex items-center mt-2">
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
