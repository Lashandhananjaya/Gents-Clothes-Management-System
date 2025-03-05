import React from 'react'
import'./Navbar.css'


import logo_light from '/src/assets/1234.png';
import search_icon_light from '/src/assets/R.png';
//import toogle_light from '/src/assets/night.png';
import { Link } from 'react-router-dom';



const navbar = () => {
  return (
    <div className='Navbar'>
        
        <img src={logo_light}alt="" className="logo"/>
        
        <ul>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/About'>About Us</Link>
            </li>
            <li>
              <Link to='/Contact'>Contact Us</Link>
            </li>
            <li>
              <Link to='/Services'>Services</Link>
              </li>
            
        </ul>
 
        <div className='search-box'>
         <input type="text" placeholder='search'/>
         <img src={search_icon_light} alt='Search icon light'/>   
        </div>
    
       
    </div>
  )
}

export default navbar
