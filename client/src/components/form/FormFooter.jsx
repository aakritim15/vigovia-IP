import React from 'react';

const FormFooter = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white text-gray-600 py-4 border-t shadow-sm z-40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-2 md:mb-0">
            <p className="text-sm">© 2024 Vigovia. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm hover:text-[#4F2D7F]">Terms of Service</a>
            <a href="#" className="text-sm hover:text-[#4F2D7F]">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-[#4F2D7F]">Help Center</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FormFooter;