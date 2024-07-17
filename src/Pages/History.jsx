import React, { useEffect, useState } from 'react';
import { get } from '../services/ApiEndpoint';
import { useSelector } from 'react-redux';
import Navbar from '../Modules/Navbar';
import bg from '../Pages/icons/forest2.jpg'

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const user = useSelector((state) => state.Auth);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await get(`/items/items?userId=${user._id}`);
        setHistoryData(response.data);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };
    if (user._id) {
      fetchHistory();
    }
  }, [user._id]);

  return (
    <>
    <Navbar bg={bg}/>
    <div className="p-4 bg-slate-300 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">History</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {historyData.map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-lg font-semibold mb-2">{item.descriptionName}</h2>
            <h2 className="text-lg font-semibold mb-2">{item.description}</h2>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default History;
