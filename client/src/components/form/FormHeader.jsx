import React from 'react';

const FormHeader = () => {
  return (
    <div className="bg-white p-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-[#4F2D7F]">Vigovia</h1>
          <span className="text-xs ml-2 text-gray-600">Travel Itinerary Planner</span>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-700 hover:text-[#4F2D7F]">Home</a>
          <a href="#" className="text-gray-700 hover:text-[#4F2D7F]">My Itineraries</a>
          <a href="#" className="text-gray-700 hover:text-[#4F2D7F]">Help</a>
        </div>
      </div>
    </div>
  );
};

export default FormHeader;