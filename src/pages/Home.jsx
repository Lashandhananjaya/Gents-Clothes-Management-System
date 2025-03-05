import React, { useState } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import SparePartCard from "./SparePartCard";
import CartPopup from "./CartPopup"; // Import the new component

const Home = () => {
  const [showCart, setShowCart] = useState(false);
  const [spareParts, setSpareParts] = useState([
    { id: 1, name: "Brake Pads", description: "High-quality brake pads for all vehicle types.", price: "$50" },
    { id: 2, name: "Oil Filter", description: "Premium oil filters for smooth engine performance.", price: "$15" },
    { id: 3, name: "Air Filter", description: "Efficient air filters for clean airflow.", price: "$20" },
    { id: 4, name: "Spark Plugs", description: "Durable spark plugs for better ignition.", price: "$30" },
  ]);

  const navigate = useNavigate();

  const deleteSparePart = (id) => {
    setSpareParts(spareParts.filter((part) => part.id !== id));
  };

  return (
    <div className="home">
      <div className="hero container">
        <div className="hero-text">
          <h1>We Ensure Better Service</h1>
          <p>Streamline vehicle spare parts management and service appointments with our all-in-one system</p>
          <div className="hero-buttons">
            <Link to="/Login">
              <button className="btn btn-login">Log In</button>
            </Link>
            <Link to="/Signup">
              <button className="btn btn-signup">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="spare-parts_container">
        <h2>Featured Spare Parts</h2>
        <button className="add-button" onClick={() => navigate("/add-spare-part")}>
          Add Spare Part
        </button>
        <button className="cart-button" onClick={() => setShowCart(true)}>
          Show Cart
        </button>
        <div className="card-container">
          {spareParts.map((part) => (
            <SparePartCard key={part.id} part={part} onDelete={deleteSparePart} />
          ))}
        </div>
      </div>

      {showCart && <CartPopup onClose={() => setShowCart(false)} />}
    </div>
  );
};

export default Home;
