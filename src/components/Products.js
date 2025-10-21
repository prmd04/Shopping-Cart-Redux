import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./feature/CartSlice";
import ProductCard from "./ProductCard";
import { AddToCart,AddToWishList } from "./feature/CartSlice";
import '../styles/products.css'

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const { products, error, loading } = useSelector((state) => state.cart);

  {
    loading && <h3>Loading....</h3>;
  }
  {
    error && <h3 style={{ color: red }}>{error}</h3>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card-wrapper">
          <ProductCard
            key={product.id}
            product={product}
          />
          <button onClick={() => dispatch(AddToCart(product))} className="btn-cart">
            Add to Cart
          </button>
          <button onClick={() => dispatch(AddToWishList(product))} className="btn-wishlist">
            Add to Wishlist
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
