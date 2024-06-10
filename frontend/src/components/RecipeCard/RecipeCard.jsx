import React, { useState,useContext  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from "../../contexts/AuthContext";


const RecipeCard = ({ recipe,className = "" }) => {


 

  return (
    <Link 
    to={`/recipeDetails/${recipe._id}`}
      className={`flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full sm:w-96 mx-auto  ${className} `}    >

     

      <div className="h-56 overflow-hidden text-white shadow-lg bg-clip-border rounded-t-xl bg-blue-gray-500 shadow-blue-gray-500/40">
        <img src={recipe.dish} alt={recipe.title} />
      </div>
      <div className="p-6">
        <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 text-center">
          {recipe.title}
        </h5>
      </div>
      <div className="p-6 pt-0">
        By: {recipe.username}

        
      </div>

     
    </Link>
  );
};

export default RecipeCard;
