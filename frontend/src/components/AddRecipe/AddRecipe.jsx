import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./addRecipe.module.css";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const { userId } = useContext(AuthContext);
  const { userName } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("instruction", steps);
    formData.append("dish", imageFile);
    formData.append("owner", userId);
    formData.append("username", userName);
    formData.append("ingredients", ingredients);

    try {
      const response = await axios.post("/api/v1/recipes/cook", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Recipe added successfully:", response.data);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error adding recipe:", error);
      setErrorMessage(true)
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isSubmitted) {
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000); // Clear success message after 3 seconds
    }

    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(false);
      }, 3000); // Clear success message after 3 seconds
    }
  }, [isSubmitted, errorMessage]);

  return (
    <>
      {isLoggedIn ? (
        <div className="container mx-auto p-8 bg-teal-500 text-white rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Add a New Recipe</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Recipe Title"
                className="w-full p-3 rounded-md border border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Instructions (separate steps with commas)"
                className="w-full p-3 rounded-md border border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Ingredients (separate with commas)"
                className="w-full p-3 rounded-md border border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 text-black"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                className="p-3 rounded-md border border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </div>
            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-800 text-white font-medium px-5 py-3 rounded-md"
            >
              Share Recipe
            </button>
          </form>
          {isSubmitted && (
            <div className="p-4 bg-green-200 text-green-800 rounded-md mt-4">
              Recipe added successfully!
            </div>
          )}

          {errorMessage && (
            <div className="p-4 bg-red-200 text-red-800 rounded-md mt-4">
              An error occurred while adding the recipe. Please try again.
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default AddRecipe;
