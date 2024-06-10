import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';

function Header() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const {userId} = useContext(AuthContext); 
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/v1/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const controlMenu = isLoggedIn ? (
    <div className="relative">
      <button 
        onClick={toggleDropdown} 
        className="hover:text-teal-500 focus:outline-none">
        User Menu
      </button>
      {dropdownVisible && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
          <NavLink 
            to={`/profile/${userId}`} 
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
            Profile
          </NavLink>
          <button 
            onClick={handleLogout} 
            className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">
            Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <>
      <NavLink 
        to="/login" 
        className={({ isActive }) => "hover:text-teal-500 " + (isActive ? "text-teal-500" : "")}>
        Login
      </NavLink>
      <NavLink 
        to="/signup" 
        className={({ isActive }) => "hover:text-teal-500 " + (isActive ? "text-teal-500" : "")}>
        Sign Up
      </NavLink>
    </>
  );

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-20">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <NavLink to="/" className="text-2xl font-bold text-teal-600">
          Recipe Sharing
        </NavLink>

        <nav className="hidden md:flex space-x-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => "hover:text-teal-500 " + (isActive ? "text-teal-500" : "")}>
            Home
          </NavLink>
          <NavLink 
            to="/addRecipe" 
            className={({ isActive }) => "hover:text-teal-500 " + (isActive ? "text-teal-500" : "")}>
            Add Recipe
          </NavLink>
          <NavLink 
            to="/about" 
            className={({ isActive }) => "hover:text-teal-500 " + (isActive ? "text-teal-500" : "")}>
            About
          </NavLink>
        </nav>

        <div className="flex items-center space-x-4">
          {controlMenu}
        </div>
      </div>
    </header>
  );
}

export default Header;
