import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import MasterLayout from './Components/MasterLayout/MasterLayout';
import Register from './Components/Register/Register';
import SignIn from './Components/SignIn/SignIn';
import Notes from './Components/Notes/Notes';

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <MasterLayout />,
      children: [
        { index: true, element: <Register /> },
        { path: '/register', element: <Register /> },
        { path:'/SignIn', element:<SignIn/> },
        { path: '/notes', element: <Notes /> }
      ]
    }
  ]);

  return (
    <RouterProvider router={routes} />
  );
}

export default App;




