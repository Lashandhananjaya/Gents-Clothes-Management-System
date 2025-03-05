import React, { useEffect, useState } from "react";
import "./CartPopup.css";

const CartPopup = ({ onClose }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/cart")
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        setTotal(data.reduce((sum, item) => sum + item.sparePart.price, 0));
      });
  }, []);

  const removeFromCart = (id) => {
    fetch(`http://localhost:5000/cart/${id}`, { method: "DELETE" })
      .then(() => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        setTotal(updatedCart.reduce((sum, item) => sum + item.sparePart.price, 0));
      });
  };

  return (
    <div className="cart-popup">
      <div className="cart-content">
        <h2>Your Cart</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.sparePart.name} - ${item.sparePart.price}
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <p><strong>Total:</strong> ${total.toFixed(2)}</p>
        <button className="checkout-btn">Pay</button>
        <button className="discard-btn" onClick={onClose}>Discard</button>
      </div>
    </div>
  );
};

export default CartPopup;
