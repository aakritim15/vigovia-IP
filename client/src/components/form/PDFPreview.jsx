import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import ItineraryPdf from '../../pdf/ItineraryPdf';

const PDFPreview = ({ formData }) => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Your Itinerary Preview</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3 bg-white rounded-lg shadow p-4">
            <div style={{ height: '600px' }}>
              <PDFViewer style={{ width: '100%', height: '100%' }}>
                <ItineraryPdf formData={formData} />
              </PDFViewer>
            </div>
          </div>
          <div className="md:w-1/3">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Trip Summary</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 text-sm mb-1">Destination</label>
                  <p className="font-medium">{formData.tripTitle}</p>
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1">Duration</label>
                  <p className="font-medium">{formData.duration}</p>
                </div>
                <div>
                  <label className="block text-gray-600 text-sm mb-1">Travelers</label>
                  <p className="font-medium">{formData.travelers}</p>
                </div>
                <button className="mt-6 bg-[#4F2D7F] text-white py-3 px-4 rounded-md hover:bg-[#3D2163] w-full flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;