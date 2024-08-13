import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductAllList from '../features/product-list/component/ProductAllList'
// import ProductAllList from '../features/product-list/ProductAllList'
const Home = () => {
  return (
    <div>
         <Navbar>
        <ProductAllList/>
         </Navbar>
         
    </div>
  )
}

export default Home