import React, { useEffect, useState } from 'react';
import { get, put } from '../services/ApiEndpoint';
import { useSelector } from 'react-redux';
import AdminNavbar from './AdminNavbar';
import bg from '../Pages/icons/forest1.jpg';

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const user = useSelector((state) => state.Auth);

  const updateDesName = async() =>{
    try {
      const response = await put('/items/items/',{

      })
      console.log(response)
    } catch (error) {
      
    }
  }
  const updateDes = () =>{

  }
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
    <AdminNavbar bg={bg} />
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {historyData.map((item) => (
          <div key={item._id} className="bg-white p-6 rounded-lg shadow-lg">
            <h2 onClick={updateDesName()} className="text-xl font-semibold mb-2">{item.descriptionName}</h2>
            <h2 onClick={updateDes()} className="text-xl font-semibold mb-2">{item.description}</h2>
            <h2 onClick={updateDes()} className="text-xl font-semibold mb-2">{item.user._id}</h2>
          </div>
        ))}
      </div>
    </div>
            </>
  );
};

export default History;
