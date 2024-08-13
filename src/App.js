import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignuPage from './pages/SignuPage';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Cart from './features/cart/Cart';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home/>
    ),
  },
  {
    path: "/login",
    element: (<LoginPage/>),
  },
  {
    path: "/signup",
    element: (<SignuPage/>),
  },
  {
    
    path: "/cart",
    element: (<Cart/>),
  },
  {
   
    path: "/checkout",
    element: (<Checkout/>),
  },
  {
   
    path: "/product-detail",
    element: (<ProductDetailPage/>),
  },
]);

function App() {
  return (
    <div className="App">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
