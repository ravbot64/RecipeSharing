import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../contexts/AuthContext';
import axios from 'axios'; // Assuming you're using axios for API calls

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(''); // Add a state for error display

  const { setFetchedRecipes } = useContext(AuthContext); // Descriptive renaming

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/v1/recipes/searchRecipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchTerm,
        }),
      });

      setFetchedRecipes(response.data.data); 

    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Unable to load recipes. Please try again later.');
    }
  };


 

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-teal-100 p-4 mb-8 rounded-md">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search for recipes..."
            className="flex-1 bg-white p-3 rounded-l-md focus:outline-none focus:ring-teal-500"
            value={searchTerm}
            onChange={handleChange}
          />
          <button
            type="submit" // Use type='submit' for form submission
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-r-md"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;