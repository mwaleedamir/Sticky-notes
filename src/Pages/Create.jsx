import React from 'react';
import Sidebar from '../Modules/sidebar';
import Navbar from '../Modules/Navbar';
import bg from '../Pages/icons/img1.jpeg';
import { useParams } from 'react-router-dom';
import TestingKanban from '../Modules/TestingKanban';

const Create = () => {
  const { boardId } = useParams();
  console.log("board id comming form create " ,boardId)
  return (
    <>
      <Navbar bg={bg} />
      <div className="flex dark:bg-gray-800">
        <Sidebar role = 'user' page ='create'/>
        <div className="pl-[250px] pt-4 overfl ">
          <h1 className="text-2xl font-semibold">{boardId}</h1>
          <TestingKanban boardId={boardId}  />
        </div>
      </div>
    </>
  );
};

export default Create;
