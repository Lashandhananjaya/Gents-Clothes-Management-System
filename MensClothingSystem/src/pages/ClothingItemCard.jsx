import React from "react";
import "./Home.css";

const ClothingItemCard = ({ item, onDelete, updateCart }) => {
  const addToCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clothingItemId: item.id }), // Changed from partId
      });

      if (response.ok) {
        alert(`${item.name} added to cart`); // Changed from part.name
        updateCart();
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="card">
      <div 
        className="color-swatch" 
        style={{ backgroundColor: item.color }}
        aria-label="Item color"
      ></div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <div className="item-details">
        <span>Size: {item.size}</span>
        <span>Category: {item.category}</span>
      </div>
      <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
      <div className="card-buttons">
        <button 
          className="card-button add-to-cart"
          onClick={addToCart}
          aria-label="Add to cart"
        >
          Add to Cart
        </button>
        <button 
          className="card-button delete-button" 
          onClick={() => onDelete(item.id)}
          aria-label="Remove item"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default ClothingItemCard;