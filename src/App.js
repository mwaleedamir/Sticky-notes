import Dashboard from './Pages/Dashboard';
import Signup from './Pages/signup';
import Login from './Pages/login';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Adminlayout from './Layouts/adminlayout';
import Userlayout from './Layouts/userlayout';
import Publiclayout from './Layouts/publiclayout';
import UserRegistered from './AdminPages/userregister';
import UsersLogin from './AdminPages/userlogin';
import AdminHistory from './AdminPages/History';
import History from './Pages/History';
import AdminDashboard from './AdminPages/AdminDashboard';
import Create from './Pages/Create';
import DynamicPage from './Pages/DynamicPage';
import Modal from './Pages/Modal';

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Adminlayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "register", element: <UserRegistered /> },
      { path: "history", element: <AdminHistory /> },
      { path: "userlogin", element: <UsersLogin /> },
    ],
  },
  {
    path: '/user',
    element: <Userlayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "history", element: <History /> },
      { path: "modal", element: <Modal /> },
      { path: "pages/:pageId", element: <DynamicPage /> },
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
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
