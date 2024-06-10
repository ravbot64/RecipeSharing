import React from 'react';

import { RecipeList } from '../index'; 

const FeaturedRecipes = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-center mb-6">Featured Recipes</h2>
      <div className="">
        <RecipeList/>
      </div>
    </section>
  );
};

export default FeaturedRecipes;
