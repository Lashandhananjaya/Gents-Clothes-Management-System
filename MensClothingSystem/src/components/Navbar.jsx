import React from 'react';
import './Navbar.css';
import logo_light from '/src/assets/logo.png';
import search_icon_light from '/src/assets/R.png';
import { Link } from 'react-router-dom';

// Component name should start with uppercase letter
const Navbar = () => {
  return (
    <div className='Navbar'>
      <img src={logo_light} alt="Fashion Logo" className="logo" />
      
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/About'>About</Link>
          </li>
          <li>
            <Link to='/Contact'>Contact</Link>
          </li>
          <li>
            <Link to='/Services'>Services</Link>
          </li>
        </ul>
      </nav>

      <div className='search-box'>
        <input type="text" placeholder='Search clothing items...' />
        <img src={search_icon_light} alt='Search' aria-label='Search' />   
      </div>
    </div>
  );
};

// Use PascalCase for component name
export default Navbar;