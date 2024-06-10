import React from 'react';
import {HeroSection,FeaturedRecipes,SearchBar} from "../../components"


const Home = () => {
  return (
    <div className="container mx-auto px-4">
      <HeroSection />
      <SearchBar />
      <FeaturedRecipes />
    </div>
  );
};

export default Home;