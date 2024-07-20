import React from 'react';
import Sidebar from '../Modules/sidebar';
import Navbar from '../Modules/Navbar';
import bg from '../Pages/icons/img1.jpeg';
// import DescriptionArrays from '../Modules/KanbanBoard';
import { useParams } from 'react-router-dom';
import TestingKanban from '../Modules/TestingKanban';

const Create = () => {
  const { boardId } = useParams();
  return (
    <>
      <Navbar bg={bg} />
      <div className="flex dark:bg-gray-800">
        <Sidebar />
        <div className="pl-4 pt-4">
          <h1 className="text-2xl font-semibold">Board {boardId}</h1>
          <TestingKanban/>
          {/* <DescriptionArrays id = {boardId} /> */}
        </div>
      </div>
    </>
  );
};

export default Create;
