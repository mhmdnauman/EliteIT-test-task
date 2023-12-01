import React from "react";
import bgImage from "../assets/images/hero-section-background.png";

const HeroSectionListings = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          src={bgImage}
          alt="Background Image"
        />
      </div>
      {/* Hero Content */}
      <div className="text-center relative z-10 text-white">
        <div className="bg-custom-darkBlue bg-opacity-60 py-24 sm:py-32 lg:py-40">
          {/* Content Container */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            LISTING
            </h1>
            {/* Info */}
            <p className="ml-10 mr-10 text-md sm:text-md lg:text-md mt-6 sm:mt-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tellus neque, malesuada sit amet auctor ac, euismod sed enim. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec sed ultricies libero. Morbi porttitor semper nibh, bibendum ultricies elit mollis id.
            </p>
          </div>
        </div>
      </div>
      {/* Rounded Bottom Edges */}
      <div className="absolute bottom-0 inset-x-0 z-0"></div>
    </div>
  );
};

export default HeroSectionListings;
