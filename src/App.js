import Home from './Pages/Home';
import Signup from './Pages/signup';
import Login from './Pages/login';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Admin from './Pages/Admin';
import Adminlayout from './Layouts/adminlayout';
import Userlayout from './Layouts/userlayout';
import Publiclayout from './Layouts/publiclayout';
function App() {
  
  const router = createBrowserRouter([
    
    {
      path: "/admin",
      element: <Adminlayout />,
      children: [
        {
          index: true,
          element: <Admin />,
        },
        {
          path: "dashboard",
          element: <Home />,
        },
      ],
    },
    {
      path:'/user',
      element:<Userlayout/>,
      children:[
        {
          index:true,
          element:<Home/>
        },
        {
          path: "dashboard",
          element: <Home />,
        },
      ]
    },

    {
      path:'/',
      element:<Publiclayout/>,
      children:[
        {
          index:true,
          element: <Signup />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ]
    },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
