import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Addparts.css';

const AddSparePartForm = ({ addSparePart }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSparePart = {
      id: Date.now(), // Unique ID
      name,
      description,
      price: `$${price}`,
    };
    addSparePart(newSparePart); // Add the new spare part
    navigate('/'); // Redirect back to the home page
  };

  return (
    <div className="form-container">
      <h2>Add New Spare Part</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          Add Spare Part
        </button>
      </form>
    </div>
  );
};

export default AddSparePartForm;