import React, { useEffect } from 'react';

import './App.css';

import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignuPage from './pages/SignuPage';
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import Cart from './features/cart/Cart';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/component/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/AuthSlice';
import { fetchAllItemsByuserIdAsync } from './features/cart/CartSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
           <Home/>
      </Protected>
     
    ),
  },
  {
    path: "/login",
    element: (<LoginPage/>),
  },
  {
    path: "/signup",element
    : (<SignuPage/>),
  },
  {
    
    path: "/cart",
    element: (<Protected><Cart/></Protected>),
  },
  {
   
    path: "/checkout",
    element: (<Protected><Checkout/></Protected>),
  },
  {
   
    path: "/product-detail/:id",
    element: (<Protected><ProductDetailPage/></Protected>),
  },
  {
    path:'/order-success/:id',
    element:(<OrderSuccessPage></OrderSuccessPage>)
  },
  {
    path:'*',
    element:(<PageNotFound></PageNotFound>)
  }
]);

function App() {
  const dispatch=useDispatch();
  const user=useSelector(selectLoggedInUser);

  useEffect(() => {
    if (user && user.id) {  // Check if user and user.id exist
      dispatch(fetchAllItemsByuserIdAsync(user.id));
    }
  }, [dispatch, user]);
  return (
    <div className="App">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
