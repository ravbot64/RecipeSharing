import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [recipeData, setRecipeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const res = await axios.post('/api/v1/recipes/fetchRecipeById', {
          recipeId,
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        setRecipeData(res.data.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError("An error occurred while fetching the recipe."); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [recipeId]);

  return (
    <div className="container mx-auto p-6 mt-10">
      {isLoading && (
        <div className="text-center text-teal-500 font-semibold">
          Loading recipe...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 font-semibold">
          {error}
        </div>
      )}

      {recipeData && (
        <div className="bg-white rounded-lg shadow-md p-6 flex"> {/* Use flexbox for layout */}
          <div className="w-1/3"> {/* Adjust image width as needed */}
            <img
              src={recipeData.dish} 
              alt={recipeData.title}
              className="w-full h-auto mb-4 object-cover rounded" 
            />
          </div>

          <div className="w-2/3 ml-6"> {/* Adjust right section width as needed */}
            <h1 className="text-3xl font-bold text-teal-600 mb-2">
              {recipeData.title}
            </h1>
            <p className="text-gray-600 mb-4">By: {recipeData.username}</p>

            <h2 className="text-2xl font-semibold text-teal-600 mb-3">
              Ingredients
            </h2>
            <ul className="list-none ml-6 mb-6"> {/* No bullet points */}
              {recipeData.ingredients.split('\r\n').map((ingredient, index) => (
                <li key={index} className="text-gray-700">
                  {ingredient}
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold text-teal-600 mb-3">
              Steps
            </h2>
            <ol className="list-decimal ml-6 mb-6">
              {recipeData.instruction.split('\r\n').map((step, index) => (
                <li key={index} className="text-gray-700">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
