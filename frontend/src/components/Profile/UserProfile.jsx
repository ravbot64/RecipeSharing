import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import RecipeCard from '../RecipeCard/RecipeCard';
import AuthContext from '../../contexts/AuthContext';
import EditRecipe from '../AddRecipe/EditRecipe';

function UserProfile() {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipeId, setEditingRecipeId] = useState(null);
  const { userId } = useParams();
  const { userName } = useContext(AuthContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`/api/v1/recipes/users/recipes/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setRecipes(data);
        } else {
          console.error('Error fetching recipes:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [userId]);

  const handleEditRecipe = (recipeId) => {
    setEditingRecipeId(recipeId);
  };

  const handleUpdateRecipe = (updatedRecipe) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) => (recipe._id === updatedRecipe._id ? updatedRecipe : recipe))
    );
    setEditingRecipeId(null);
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      const response = await fetch(`/api/v1/recipes/deleteRecipe/${recipeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== recipeId));
      } else {
        console.error('Error deleting recipe:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-teal-600 mb-4">Welcome, {userName}</h1>
      {recipes.length === 0 ? (
        <div className="text-center text-teal-600">
          <p>Oops! Looks like your recipe book is on a diet. Time to add some deliciousness!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <RecipeCard recipe={recipe} />
              <div className="flex justify-center p-4">
                <button
                  onClick={() => handleEditRecipe(recipe._id)}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-300 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRecipe(recipe._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {editingRecipeId && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <EditRecipe
            recipeId={editingRecipeId}
            onClose={() => setEditingRecipeId(null)}
            onUpdate={handleUpdateRecipe}
          />
        </div>
      )}
    </div>
  );
}

export default UserProfile;
