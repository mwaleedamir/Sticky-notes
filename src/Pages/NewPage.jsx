// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const NewPage = ({ addPage }) => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addPage({ title, content });
//     navigate('/');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className='flex justify-center bg-slate-300 text-2xl'>
//         <label>Title</label>
//         <input
//         className='flex justify-center bg-slate-600'
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Content</label>
//         <textarea
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         />
//       </div>
//       <button type="submit">Add Page</button>
//     </form>
//   );
// };

// export default NewPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {post, get,put} from '../services/ApiEndpoint'
import {useSelector} from 'react-redux'

const PageEditor = () => {
  const { pageId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const user = useSelector((state) => state.Auth)

  useEffect(() => {
    if (pageId) {
      const fetchPage = async () => {
        const response = await get(`/pages/dynamic/${pageId}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      };

      fetchPage();
    }
  }, [pageId]);

  const handleSave = async () => {
    if (pageId) {
      await put(`/pages/dynamic/${pageId}`, { title, content });
    } else {
      await post('/pages/dynamic', {
        title,
        content,
        userId: user._id,  // Replace with actual user ID from your authentication system
      });
    }
    navigate('/user');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{pageId ? 'Edit Page' : 'Create Page'}</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded"
        placeholder="Page Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded"
        rows="10"
        placeholder="Page Content"
      />
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save
      </button>
    </div>
  );
};

export default PageEditor;
