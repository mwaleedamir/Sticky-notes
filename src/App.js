import Dashboard from './Pages/Dashboard';
import Signup from './Pages/signup';
import Login from './Pages/login';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Adminlayout from './Layouts/adminlayout';
import Userlayout from './Layouts/userlayout';
import Publiclayout from './Layouts/publiclayout';
import UserRegistered from './AdminPages/userregister';
import AdminDashboard from './AdminPages/AdminDashboard';
import Create from './Pages/Create';
import CreateAdmin from './AdminPages/createAdmin';
import {DndContext} from '@dnd-kit/core';


const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Adminlayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "register", element: <UserRegistered /> },
      { path: 'createadmin/:boardId', element: <CreateAdmin/> },
    ],
  },
  {
    path: '/user',
    element: <Userlayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'create/:boardId', element: <Create /> },
    ],
  },
  {
    path: '/',
    element: <Publiclayout />,
    children: [
      { index: true, element: <Signup /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

function App() {
  return (
    <>
      <DndContext>
        <Toaster />
        <RouterProvider router={router} />
      </DndContext>
    </>
  );
}

export default App;
