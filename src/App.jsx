import React, { useState } from 'react';
import Navbar from './components/Navbar';
import './index.css';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import Services from './pages/Services';
import Signup from './pages/Signup';
import { Routes, Route } from 'react-router-dom';
import AddSparePartForm from './pages/Addparts';

const App = () => {
  const [spareParts, setSpareParts] = useState([
    { id: 1, name: 'Brake Pads', description: 'High-quality brake pads for all vehicle types.', price: '$50' },
    { id: 2, name: 'Oil Filter', description: 'Premium oil filters for smooth engine performance.', price: '$15' },
    { id: 3, name: 'Air Filter', description: 'Efficient air filters for clean airflow.', price: '$20' },
    { id: 4, name: 'Spark Plugs', description: 'Durable spark plugs for better ignition.', price: '$30' },
  ]);

  const addSparePart = (newSparePart) => {
    setSpareParts([...spareParts, newSparePart]);
  };

  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home spareParts={spareParts} addSparePart={addSparePart} />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/add-spare-part" element={<AddSparePartForm addSparePart={addSparePart} />} />
      </Routes>
    </div>
  );
};

export default App;