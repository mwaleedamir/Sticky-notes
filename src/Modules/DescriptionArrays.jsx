import React, { useState } from 'react';
import { post } from '../services/ApiEndpoint';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DescriptionArrays = () => {
  const [descriptions, setDescriptions] = useState([]);
  // const [showAddDescription, setShowAddDescription] = useState(false);
  const [newDescription, setNewDescription] = useState('');
  const [newDescriptionName, setNewDescriptionName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const user = useSelector((state) => state.Auth.data);
  const addDescription = async () => {
    if (!newDescription || !newDescriptionName) {
      toast.error('Description / Description Name cannot be empty');
      return;
    }

    setLoading(true);

    try {
      const response = await post('/items/items',{ 
        descriptionName: newDescriptionName, 
        description: newDescription, 
        userId: user._id  
      });
      if (response.status === 400) {
        toast.error(response.data.message);
        return;
      }

      setDescriptions([...descriptions, response.data]);
      setNewDescription('');
      setNewDescriptionName('');
      toast.success('Description added successfully');
    } catch (error) {
      toast.error('Failed to add description');
    } finally {
      setLoading(false);
    }
  };

  // const toggleAddDescription = () => {
  //   setShowAddDescription(!showAddDescription);
  // };
  //  {showAddDescription &&}
  return (
    <div className=" flex flex-col">
      <ToastContainer />
      <div className="w-56 max-w-md p-2 space-y-2 bg-white rounded shadow-md">
          <>
            {/* <h2 className="text-2xl font-bold text-center">Add Description</h2> */}
            <div className="mt-4 space-y-4">
              <input
                type="text"
                value={newDescriptionName}
                onChange={(e) => setNewDescriptionName(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter a description name"
              />
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter a new description"
              />
              <button
                onClick={addDescription}
                disabled={loading}
                className={`w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading && 'opacity-50'}`}
              >
                {loading ? 'Adding...' : 'Create'}
              </button>
            </div>
          </>

        <div className="mt-8">
          <h3 className="text-lg font-semibold">Descriptions List</h3>
          <ul className="mt-4 space-y-2">
            {descriptions.map((desc, index) => (
              <li key={index} className="px-4 py-2 bg-gray-100 rounded shadow">
                {desc.description}
              </li>
            ))}
           
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DescriptionArrays;