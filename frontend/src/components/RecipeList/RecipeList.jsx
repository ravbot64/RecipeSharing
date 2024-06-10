// RecipeList.js
import React, { useState, useEffect, useContext } from 'react';
import { RecipeCard} from '../../components';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';

const RecipeList = () => {
 
  const [error, setError] = useState(null);
  const {fetchedRecipes, setFetchedRecipes} = useContext(AuthContext);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.post('/api/v1/recipes/getAllRecipes');

        setFetchedRecipes(response.data.data)
        
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Unable to load recipes. Please try again later.');
      }
    };
    fetchRecipes();
  }, []);

  return (
  
      <div className="grid grid-cols-3 gap-x-3">
        
        {error ? (
          <p className="col-span-full text-center text-red-500">{error}</p>
        ) : fetchedRecipes?.length > 0 ? (
          fetchedRecipes.map((recipe ) => (
            <RecipeCard key={recipe._id} recipe={recipe}  className = "" />
            
          ))
        ) : (
          <p className="">Loading recipes...</p>
        )}
      </div>

  );
};

export default RecipeList;
