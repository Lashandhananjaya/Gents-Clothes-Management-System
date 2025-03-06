import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import ClothingItemCard from "./ClothingItemCard";
import CartPopup from "./CartPopup";

const Home = () => {
  const [showCart, setShowCart] = useState(false);
  const [username, setUsername] = useState("");
  const [clothingItems, setClothingItems] = useState([]);
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) setUsername(storedUsername);

    // Fetch clothing items
    fetch("http://localhost:5000/clothing-items")
      .then(res => res.json())
      .then(setClothingItems)
      .catch(error => console.error("Error fetching items:", error));

    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    fetch("http://localhost:5000/cart")
      .then(res => res.json())
      .then(setCart)
      .catch(error => console.error("Error fetching cart:", error));
  };

  const deleteClothingItem = async (id) => {
    await fetch(`http://localhost:5000/clothing-items/${id}`, { method: "DELETE" });
    setClothingItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="home">
      <div className="hero container">
        <div className="hero-text">
          <h1>Fashion Inventory Management</h1>
          <p>Streamline clothing inventory management with our modern system</p>
          
          <div className="hero-buttons">
            {username ? (
              <div className="user-section">
                <span className="welcome-text">Welcome, {username}!</span>
                <button className="btn btn-logout" onClick={() => {
                  localStorage.removeItem("username");
                  setUsername("");
                  navigate("/");
                }}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/Login">
                  <button className="btn btn-login">Log In</button>
                </Link>
                <Link to="/Signup">
                  <button className="btn btn-signup">Sign Up</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="clothing-items_container">
        <h2>Featured Clothing Items</h2>
        <div className="action-buttons">
          <button className="add-button" onClick={() => navigate("/add-clothing-item")}>
            Add New Item
          </button>
          <button className="cart-button" onClick={() => setShowCart(true)}>
            Show Cart ({cart.length})
          </button>
        </div>

        <div className="card-container">
          {clothingItems.map(item => (
            <ClothingItemCard 
              key={item.id} 
              item={item} 
              onDelete={deleteClothingItem} 
              updateCart={fetchCartItems} 
            />
          ))}
        </div>
      </div>

      {showCart && (
        <CartPopup 
          cart={cart} 
          updateCart={fetchCartItems} 
          onClose={() => setShowCart(false)} 
        />
      )}
    </div>
  );
};

export default Home;