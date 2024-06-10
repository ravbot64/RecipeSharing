import React from 'react';

import ChefImage from '../../assets/happy-chef.png'; 

const About = () => {
  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-lg mt-16"> 
      <h1 className="text-3xl font-bold text-teal-600 mb-5">
       
        Our Story: A Pinch of Passion, a Dash of Code
      </h1> 

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8"> 
        <img 
          src={ChefImage} 
          alt="Happy chef cartoon" 
          className="w-96 rounded-xl  bg-gray-100 " 
        />
        <div className="text-center md:text-left"> 
          <p className="text-lg mb-4">
            Foodies at heart and coders by trade, we built this recipe app to celebrate the culinary adventures we all crave.  Whether you're a master chef or bravely wielding your first spatula, this is your space to share those delicious dishes!
          </p>
          <p className="text-lg">
            Imagine a digital cookbook brimming with flavors from every corner of the globe, where grandma's secret recipe rests comfortably beside your latest experimental creation. That's the community we're building, one recipe at a time.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-teal-600 mb-3">Our Mission</h2>
      <p className="text-center text-lg">
        To empower home cooks everywhere to discover, share, and unleash their kitchen creativity!
      </p>
    </div>
  );
};

export default About;
