import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPopup.css";

const CartPopup = ({ cart, updateCart, onClose }) => {
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setTotal(cart.reduce((sum, item) => sum + item.clothingItem.price, 0));
  }, [cart]);

  const handlePayment = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      // Delete all cart items
      await Promise.all(
        cart.map(item => 
          fetch(`http://localhost:5000/cart/${item.id}`, { method: "DELETE" })
        )
      );
      
      alert("Order Confirmed! Thank you for your purchase.");
      updateCart();
      onClose();
      navigate("/");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  const handleDiscard = async () => {
    if (cart.length === 0) return alert("Your cart is already empty!");

    try {
      await Promise.all(
        cart.map(item => 
          fetch(`http://localhost:5000/cart/${item.id}`, { method: "DELETE" })
        )
      );
      
      alert("Cart cleared successfully!");
      updateCart();
      onClose();
    } catch (error) {
      console.error("Failed to clear cart:", error);
      alert("Failed to clear cart. Please try again.");
    }
  };

  const removeFromCart = async (id) => {
    try {
      await fetch(`http://localhost:5000/cart/${id}`, { method: "DELETE" });
      updateCart();
    } catch (error) {
      console.error("Failed to remove item:", error);
      alert("Failed to remove item. Please try again.");
    }
  };

  return (
    <div className="cart-popup">
      <div className="cart-content">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        {cart.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty</p>
        ) : (
          <>
            <ul className="cart-items">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="item-info">
                    <span className="item-name">{item.clothingItem.name}</span>
                    <span className="item-price">${item.clothingItem.price.toFixed(2)}</span>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-summary">
              <div className="total-row">
                <span>Total:</span>
                <span className="total-price">${total.toFixed(2)}</span>
              </div>
              
              <div className="cart-actions">
                <button 
                  className="checkout-btn" 
                  onClick={handlePayment}
                  aria-label="Proceed to checkout"
                >
                  Checkout
                </button>
                <button 
                  className="discard-btn" 
                  onClick={handleDiscard}
                  aria-label="Clear entire cart"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPopup;