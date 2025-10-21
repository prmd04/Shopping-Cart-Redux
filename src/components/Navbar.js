import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cart = useSelector(state => state.cart.cart);
  const wishlist = useSelector(state => state.cart.wishlist);

  const totalItemInWishList = wishlist.reduce((sum,item)=>sum+item.quantity,0);

  const totalItem = cart.reduce((sum,item)=>sum+item.quantity,0);
  return (
    <div id="header">
      <div id="logo">
        <h2>Shoppe</h2>
      </div>
      <div id="cart-wishlist">
        <div className="icon-container">
          <NavLink to='/cart'><h3>Cart</h3></NavLink>
          <span className="badge">{totalItem}</span>
        </div>
        <div className="icon-container">
          <NavLink to='/wishlist'><h3>Wishlist</h3></NavLink>
          <span className="badge">{totalItemInWishList}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
