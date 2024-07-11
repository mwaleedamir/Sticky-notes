import React, { useState } from 'react';
import DescriptionArrays from '../Modules/DescriptionArrays';

const AdminDashboard = () => {
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(!show);
  }

  return (
    <div className='px-64'>
      <h1>  Welcome to Admin Dashboard </h1>
      <button onClick={handleShow}>
        Toggle Description
      </button>
      {show && <DescriptionArrays />}
    </div>
  );
}

export default AdminDashboard;
