import React, { useState } from 'react';
import axios from 'axios';

const DescriptionArrays = () => {
  const [descriptions, setDescriptions] = useState([]);
  const [newDescription, setNewDescription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const addDescription = async () => {
    if (!newDescription) {
      setError('Description cannot be empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:8080/items/items', { description: newDescription });
      setDescriptions([...descriptions, response.data]);
      setNewDescription('');
    } catch (error) {
      setError('Failed to add description');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Add Description</h2>
        <div className="mt-4 space-y-4">
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter a new description"
          />
          <button
            onClick={addDescription}
            disabled={loading}
            className={`w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading && 'opacity-50'}`}
          >
            {loading ? 'Adding...' : 'Create'}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
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
