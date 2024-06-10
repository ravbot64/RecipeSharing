import { Router } from "express";
import { cookRecipe, getAllRecipes, searchRecipes, fetchRecipeById, updateRecipe, deleteRecipe,getUserRecipes } from "../controllers/recipe.controller.js";
import {upload} from "../middlewares/multer.middleware.js"  

const router = Router()
router.route("/cook").post(upload.fields([
    {
        name: "dish",
        maxCount: 1
    }, 
]),cookRecipe)

router.route("/getAllRecipes").post(getAllRecipes)
router.route("/searchRecipes").post(searchRecipes)
router.route("/fetchRecipeById").post(fetchRecipeById)

router.route("/updateRecipe/:id").put(upload.fields([
    {
        name: "dish",
        maxCount: 1
    },
]), updateRecipe);

router.route("/deleteRecipe/:id").delete(deleteRecipe);

// New route to fetch recipes by user ID
router.route("/users/recipes/:userId").post(getUserRecipes);   

export default router;