import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"

import { ApiResponse } from "../utils/ApiResponse.js";

import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { Recipe } from "../models/recipe.model.js";
import mongoose from "mongoose";


const cookRecipe = asyncHandler( async (req, res) => {

    

    const {title, instruction, owner,username, ingredients} = req.body
 
    if(!(title && instruction && owner && username))
    {
        throw new ApiError(400,"insufficient information")
    }
    const dishLocalPath = req.files?.dish[0]?.path;
    if(!dishLocalPath){
        throw new ApiError(400,"dish path is required")
    }
    const dish = await uploadOnCloudinary(dishLocalPath)
   

    // console.log(title, instruction, dish?.url , owner)

    const recipeData = await Recipe.create({
        title : title,
        instruction:instruction,
        dish:dish?.url,
        owner:owner,
        username : username,
        ingredients : ingredients
    })

    return res.status(200).json(    
        new ApiResponse(
            200,
            recipeData,
            "Recipe published succcessfully"

        )
    )
})




const getAllRecipes = asyncHandler(async (req, res) => {
    const recipes = await Recipe.find(); 

    if (!recipes) {
        throw new ApiError(404, 'No recipes found');
    }

  
    return res.status(200).json(
        new ApiResponse(
            200,
            recipes,
            'Recipes fetched successfully'
        )
    );
});



const searchRecipes = async (req, res) => {
   
      
    
    const parsedBody = JSON.parse(req.body.body);  
    const searchTerm = parsedBody.searchTerm;       
    
  
    console.log("Search Term:", searchTerm); 

      const keywords = searchTerm.split(' '); 
  
      // Build regular expressions for each keyword
      const regexQueries = keywords.map(keyword => ({
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { ingredients: { $regex: keyword, $options: 'i' } }
        ]
      }));
  
      const recipes = await Recipe.find({ $and: regexQueries });

  
      if (!recipes) {
        throw new ApiError(404, 'No recipes found');
        }

  
    return res.status(200).json(
        new ApiResponse(
            200,
            recipes,
            'Recipes fetched successfully'
        )
    );
    }
  
     

const  fetchRecipeById = async function (req, res) {
        

  

    const recipeId = req.body.recipeId // Get recipe_id from the request

  
    if (!mongoose.isValidObjectId(recipeId)) {
    return res.status(400).json({ error: 'Invalid recipe ID' });
    }


    const recipe = await Recipe.findById(recipeId); 

    if (!recipe) {
    return res.status(404).json({ error: 'Recipe not found' });
    }

    return res.status(200).json(
    new ApiResponse(
        200,
        recipe,
        'Recipe fetched successfully'
    )
        );
         
    }

    const updateRecipe = asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { title, instruction, username, ingredients } = req.body;
    
        const recipe = await Recipe.findById(id);
    
        if (!recipe) {
            throw new ApiError(404, "Recipe not found");
        }
    
        if (req.files?.dish) {
            const dishLocalPath = req.files.dish[0]?.path;
            const dish = await uploadOnCloudinary(dishLocalPath);
            recipe.dish = dish?.url;
        }
    
        if (title) recipe.title = title;
        if (instruction) recipe.instruction = instruction;
        if (username) recipe.username = username;
        if (ingredients) recipe.ingredients = ingredients;
    
        await recipe.save();
    
        return res.status(200).json(new ApiResponse(200, recipe, "Recipe updated successfully"));
    });
    
    const deleteRecipe = asyncHandler(async (req, res) => {
        const { id } = req.params;
    
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ error: 'Invalid recipe ID' });
        }
    
        const recipe = await Recipe.findById(id);
    
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }
    
        await recipe.deleteOne();
    
        return res.status(200).json(
            new ApiResponse(200, null, "Recipe deleted successfully")
        );
    });
    

    const getUserRecipes = asyncHandler(async (req, res) => {
       
        const userId = req.params.userId; // Assuming you get the user ID from request parameters

    // Find the user by ID to ensure it exists
        

        // Find recipes belonging to the user
        const recipes = await Recipe.find({ owner: userId });

        // Return the recipes
        res.json(recipes);
        
    });
    
    export { cookRecipe, getAllRecipes, searchRecipes, fetchRecipeById, updateRecipe, deleteRecipe, getUserRecipes };
    


