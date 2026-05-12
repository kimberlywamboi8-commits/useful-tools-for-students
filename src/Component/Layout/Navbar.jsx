import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="main-nav">
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Journal
      </NavLink>
      
      <NavLink 
        to="/create" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Share Look
      </NavLink>
      
      <NavLink 
        to="/discovery" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Discover
      </NavLink>
    </nav>
  );
};

export default Navbar;