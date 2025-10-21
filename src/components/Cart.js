import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import "../styles/Cart.css";
import { ChangeQuantity, RemoveFromCart, ApplyCoupon } from "./feature/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, discount, coupon } = useSelector((state) => state.cart);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [couponCode, setCouponCode] = useState("");
  const [message, setMessage] = useState("");

  const handleIncrement = (item) => {
    dispatch(ChangeQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1)
      dispatch(ChangeQuantity({ id: item.id, quantity: item.quantity - 1 }));
  };

  const handleRemove = (item) => {
    dispatch(RemoveFromCart({ id: item.id }));
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim() === "") {
      setMessage("Please enter a coupon code");
      return;
    }
    dispatch(ApplyCoupon(couponCode));
    if (couponCode.toLowerCase() === "save10" || couponCode.toLowerCase() === "save20") {
      setMessage(`Coupon "${couponCode.toUpperCase()}" applied successfully!`);
    } else {
      setMessage("Invalid coupon code");
    }
    setCouponCode("");
  };

  const finalTotal = (totalPrice - (discount || 0)).toFixed(2);

  return (
    <div className="cart-container">
      <div className="cart-products">
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <ProductCard product={item} />
              <div className="quantity-actions">
                <button onClick={() => handleDecrement(item)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)}>+</button>
                <button onClick={() => handleRemove(item)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="checkout">
        <h2>Checkout</h2>
        <p>Total Items: {cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
        <p>Item Price: ${totalPrice.toFixed(2)}</p>
        <p>Shipping Charge: $0.00</p>

        {/* Coupon Input Section */}
        <div className="coupon-section">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
          />
          <button onClick={handleApplyCoupon}>Apply</button>
        </div>
        {message && <p className="coupon-message">{message}</p>}

        {discount > 0 && <p>Discount: -${discount.toFixed(2)}</p>}

        <h3>Total Price: ${finalTotal}</h3>
        <button className="btn-checkout">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
