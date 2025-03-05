import React from "react";
import "./Home.css";

const SparePartCard = ({ part, onDelete }) => {
  const addToCart = () => {
    fetch("http://localhost:5000/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ partId: part.id }),
    }).then(() => alert(`${part.name} added to cart`));
  };

  return (
    <div className="card">
      <h3>{part.name}</h3>
      <p>{part.description}</p>
      <p><strong>Price:</strong> {part.price}</p>
      <button className="card-button" onClick={addToCart}>
        Add to Cart
      </button>
      <button className="card-button delete-button" onClick={() => onDelete(part.id)}>
        Delete
      </button>
    </div>
  );
};

export default SparePartCard;
