import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { get } from '../services/ApiEndpoint';

const DynamicPage = () => {
  const { pageId } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await get(`/pages/dynamic/${pageId}`);
        setPage(response.data);
      } catch (error) {
        console.error('Error fetching page data:', error);
      }
    };

    fetchPage();
  }, [pageId]);

  if (!page) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{page.title}</h1>
      {/* <div dangerouslySetInnerHTML={{ __html: page.content }} /> */}
    </div>
  );
};

export default DynamicPage;
