import './App.css';
import About from './Modules/About';
import Home from './Modules/Home';
import NavBar from './Modules/navbar';
import Signup from './Modules/signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavBar /><Home />
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <NavBar /><About />
        </>
      )
    },
    {
      path: "/signup",
      element: (
        <>
          <NavBar /><Signup />
        </>
      ),
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
