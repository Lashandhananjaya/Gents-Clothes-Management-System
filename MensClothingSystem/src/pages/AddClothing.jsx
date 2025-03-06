import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CirclePicker } from "react-color";
import "./AddClothing.css";

const AddClothingForm = ({ setClothingItems }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    size: "",
    color: "#ffffff",
    category: "Women"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/clothing-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const newItem = await response.json();
        setClothingItems(prev => [...prev, newItem]);
        navigate("/");
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="clothing-form-container">
      <h2>Add New Clothing Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Item Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Women">Women's Wear</option>
            <option value="Men">Men's Wear</option>
            <option value="Kids">Kids' Collection</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        <div className="form-group">
          <label>Size:</label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="e.g., S, M, L, XL"
            required
          />
        </div>

        <div className="form-group color-picker">
          <label>Select Color:</label>
          <CirclePicker
            color={formData.color}
            onChangeComplete={(color) => 
              setFormData({ ...formData, color: color.hex })
            }
          />
        </div>

        <div className="form-group">
          <label>Price ($):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Add to Inventory
        </button>
      </form>
    </div>
  );
};

export default AddClothingForm;