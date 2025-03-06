import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <div className="services-container">
      <h1>Our Services</h1>
      <p>We offer a range of high-quality services to cater to your needs. Below are some of the services we offer:</p>
      
      <div className="services-list">
        <div className="service-item">
          <h2>Service 1</h2>
          <p>Description of Service 1. It could be anything from consulting, web development, to design services.</p>
        </div>

        <div className="service-item">
          <h2>Service 2</h2>
          <p>Description of Service 2. Expand on this section as needed for your app's offerings.</p>
        </div>

        <div className="service-item">
          <h2>Service 3</h2>
          <p>Description of Service 3. You can describe the third service offered here.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;

