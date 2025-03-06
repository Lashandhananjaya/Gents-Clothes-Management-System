import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import AddClothingForm from "./pages/AddClothing";
import "./index.css";

const App = () => {
  const [clothingItems, setClothingItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/clothing-items")
      .then((res) => res.json())
      .then(setClothingItems)
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home clothingItems={clothingItems} setClothingItems={setClothingItems} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/add-clothing-item" element={<AddClothingForm setClothingItems={setClothingItems} />} />
      </Routes>
    </div>
  );
};

export default App;