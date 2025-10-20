import React from 'react';
import logo from '../../assets/logo.png';

function Footer() {
  return (
    <div className="bg-white py-8">
      <hr className='mx-auto border-1 border-black w-[85%] mb-4'/>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-start">
            <p className="text-sm text-gray-600"><strong>Vigovia Tech Pvt. Ltd</strong></p>
            <p className="text-sm text-gray-600">Registered Office: Hd-109 Cinnabar Hills,</p>
            <p className="text-sm text-gray-600">Links Business Park, Karnataka, India.</p>
          </div>
          
          <div className="mb-4 md:mb-0 text-start">
            <p className="text-sm text-gray-600"><strong>Phone:</strong> +91-9504061112</p>
            <p className="text-sm text-gray-600"><strong>Email ID:</strong> Utkarsh@Vigovia.Com</p>
            <p className="text-sm text-gray-600"><strong>CIN:</strong> U79110KA2024PTC191890</p>
          </div>
          
          <div>
            <img src={logo} alt="vigovia logo" className="w-48" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
