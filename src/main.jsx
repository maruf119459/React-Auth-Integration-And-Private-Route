import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from './components/Root/Root';
import Home from './components/Home/Home';
import AuthProvider from './Context/AuthProvider/AuthProvider';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Profile from './components/Profile/Profile';
import PrivateRout from './Context/PrivateRout/PrivateRout';
import { PrivateRout2 } from './Context/PrivateRout/PrivateRout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element:<Home />
      },
      {
        path: "/login",
        element: <PrivateRout2><Login /></PrivateRout2>
      },
      {
        path: "/registration",
        element: <PrivateRout2><Registration /></PrivateRout2>
      },
      {
        path: "/profile",
        element: <PrivateRout><Profile /></PrivateRout>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
