
import React from "react";
import './../styles/App.css';
import Cart from "./Cart";
import Home from "./Home";
import Wishlist from "./Wishlist";
import {Routes,Route} from 'react-router-dom'

const App = () => {
  return (
    <div id="main">
       <Routes>
        <Route path='/' index element={<Home/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/wishlist" element={<Wishlist/>}></Route>
       </Routes>
    </div>
  )
}

export default App
