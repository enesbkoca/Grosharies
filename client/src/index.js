import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './styles/index.css';

import App from './routes/App';
import About from './routes/About';
import Login from './routes/Login';
import AddItem from './routes/AddItem';
import Error from './routes/Error';
import {Header, Footer} from './utils';


const Layout = ({ children }) => {
  return (
      <div>
        <Header/>
        <div className="main-content">
          {children}
        </div>
        
        <Footer/>
      </div>
    )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><App /></Layout>,
    errorElement: <Layout><Error/></Layout>
  },
  {
    path: "/login",
    element: <Layout><Login /></Layout>
  },
  {
    path: "/about",
    element: <Layout><About /></Layout>
  },
  {
    path: "/additem",
    element: <Layout><AddItem /></Layout>
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

const API_URL = "http://localhost:5005/api"

export {API_URL}