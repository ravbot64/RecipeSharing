import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditRecipe = ({ recipeId, onClose, onUpdate }) => {
    const [recipe, setRecipe] = useState({
        title: '',
        instruction: '',
        dish: '',
        username: '',
        ingredients: ''
    });
    const [dishFile, setDishFile] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.post('/api/v1/recipes/fetchRecipeById', { recipeId });
                setRecipe(response.data.data);
            } catch (error) {
                console.error("Error fetching recipe: ", error);
            }
        };

        fetchRecipe();
    }, [recipeId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, [name]: value });
    };

    const handleFileChange = (e) => {
        setDishFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', recipe.title);
        formData.append('instruction', recipe.instruction);
        formData.append('username', recipe.username);
        formData.append('ingredients', recipe.ingredients);

        if (dishFile) {
            formData.append('dish', dishFile);
        }

        try {
            const response = await axios.put(`/api/v1/recipes/updateRecipe/${recipeId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            onUpdate(response.data.data);
            onClose();
        } catch (error) {
            console.error("Error updating recipe: ", error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-teal-600 text-2xl font-bold mb-4">Edit Recipe</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={recipe.title}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Instruction</label>
                    <textarea
                        name="instruction"
                        value={recipe.instruction}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        required
                    />
                </div>
                
                <div>
                    <label className="block text-gray-700">Ingredients</label>
                    <textarea
                        name="ingredients"
                        value={recipe.ingredients}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Dish Image</label>
                    <input
                        type="file"
                        name="dish"
                        onChange={handleFileChange}
                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                    />
                </div>
                <div className="flex justify-end">
                    <button type="button" onClick={onClose} className="mr-4 px-4 py-2 bg-gray-300 text-gray-700 rounded">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded">Save</button>
                </div>
            </form>
        </div>
    );
};

export default EditRecipe;
