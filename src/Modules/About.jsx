// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Crud() {
//   const [products, setProducts] = useState([]); // State to store products
//   const [new_info, setnew_info] = useState({ name: '', des: '' }); // State for form inputs
//   const [editingProduct, setEditingProduct] = useState(null); // State to track editing product

//   // Fetch products from API
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/');
//         setProducts(Array.isArray(response.data) ? response.data : []); // Ensure response data is an array
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };
//     fetchProduct();
//   }, []);

//   // Handle creating a new product
//   const handleCreateProduct = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:8080/items', new_info);
//       setProducts([...products, response.data]);
//       setnew_info({ name: '', des: '' }); // Clear the form
//     } catch (error) {
//       console.error('Error creating product:', error);
//     }
//   };

//   // Handle deleting a product
//   const handleDeleteProduct = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/items/${id}`);
//       setProducts(products.filter(product => product.id !== id));
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   // Handle editing a product
//   const handleEditProduct = (product) => {
//     setEditingProduct(product);
//     setnew_info({ name: product.name, des: product.des });
//   };

//   // Handle updating a product
//   const handleUpdateProduct = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`http://localhost:8080/items/${editingProduct.id}`, new_info);
//       setProducts(products.map(product => product.id === editingProduct.id ? response.data : product));
//       setEditingProduct(null); // Clear the editing state
//       setnew_info({ name: '', des: '' }); // Clear the form
//     } catch (error) {
//       console.error('Error updating product:', error);
//     }
//   };

//   return (
//     <div className="App p-4">
//       <h1 className="text-2xl font-bold mb-4">Product List</h1>
//       <ul className="mb-4">
//         {products.map(product => (
//           <li key={product.id} className="mb-2 flex justify-between items-center">
//             <span>{product.name} - ${product.des}</span>
//             <div>
//               <button 
//                 onClick={() => handleEditProduct(product)} 
//                 className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
//               >
//                 Edit
//               </button>
//               <button 
//                 onClick={() => handleDeleteProduct(product.id)} 
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <h2 className="text-xl font-semibold mb-2">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
//       <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct} className="mb-4">
//         <input
//           type="text"
//           placeholder="name"
//           value={new_info.name}
//           onChange={(e) => setnew_info({ ...new_info, name: e.target.value })}
//           className="border p-2 mb-2 w-full"
//         />
//         <input
//           type="text"
//           placeholder="des"
//           value={new_info.des}
//           onChange={(e) => setnew_info({ ...new_info, des: e.target.value })}
//           className="border p-2 mb-2 w-full"
//         />
//         <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
//           {editingProduct ? 'Update Product' : 'Add Product'}
//         </button>
//       </form>
//     </div>
//   );
// }
// export default Crud;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Crud() {
  const [products, setProducts] = useState([]); // State to store products
  const [new_info, setnew_info] = useState({ name: '', des: '' }); // State for form inputs
  const [editingProduct, setEditingProduct] = useState(null); // State to track editing product

  // Fetch products from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('http://localhost:8080/');
        setProducts(Array.isArray(response.data) ? response.data : []); // Ensure response data is an array
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProduct();
  }, []);

  // Handle creating a new product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/items', new_info);
      setProducts([...products, response.data]);
      setnew_info({ name: '', des: '' }); // Clear the form
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/items/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Handle editing a product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setnew_info({ name: product.name, des: product.des });
  };

  // Handle updating a product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/items/${editingProduct.id}`, new_info);
      setProducts(products.map(product => product.id === editingProduct.id ? response.data : product));
      setEditingProduct(null); // Clear the editing state
      setnew_info({ name: '', des: '' }); // Clear the form
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <ul className="mb-4">
        {products.map(product => (
          <li key={product.id} className="mb-2 flex justify-between items-center">
            <span>{product.name} - ${product.des}</span>
            <div>
              <button 
                onClick={() => handleEditProduct(product)} 
                className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDeleteProduct(product.id)} 
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
      <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct} className="mb-4">
        <input
          type="text"
          placeholder="name"
          value={new_info.name}
          onChange={(e) => setnew_info({ ...new_info, name: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          placeholder="des"
          value={new_info.des}
          onChange={(e) => setnew_info({ ...new_info, des: e.target.value })}
          className="border p-2 mb-2 w-full"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

export default Crud;