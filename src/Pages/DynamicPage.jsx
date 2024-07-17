import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {get} from '../services/ApiEndpoint.js'

const DynamicPage = () => {
  const { pageId } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      const response = await get(`/pages/dynamic/${pageId}`);
      setPage(response.data);
    };

    fetchPage();
  }, [pageId]);

  if (!page) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
};

export default DynamicPage;
