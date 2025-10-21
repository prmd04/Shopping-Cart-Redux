import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { AddToCart, RemoveFromWishList } from "./feature/CartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.cart.wishlist);

  return (
    <div className="wishlist-container">
      <h1>WishList</h1>
      <div className="wishlist-product">
        {wishlist.length === 0 ? (
          <p>wishlist is emepty</p>
        ) : (
          <div className="product-grid">
            {wishlist.map((product) => (
              <div key={product.id} className="product-card-wrapper">
                <ProductCard key={product.id} product={product} />
                <button
                  onClick={() => {
                    dispatch(AddToCart(product));
                    dispatch(RemoveFromWishList(product));
                  }}
                  className="btn-cart"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => dispatch(RemoveFromWishList(product))}
                  className="btn-wishlist"
                >
                  Remove from WishList
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
