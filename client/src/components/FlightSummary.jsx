import React from 'react';

const FlightSummary = () => {
  // 航班数据
  const flights = [
    {
      id: 1,
      date: "Thu 10 Jan'24",
      airline: "Fly Air India",
      flightCode: "AX - 123",
      from: "Delhi",
      fromCode: "DEL",
      to: "Singapore",
      toCode: "SIN"
    },
    {
      id: 2,
      date: "Thu 10 Jan'24",
      airline: "Fly Air India",
      flightCode: "AX - 123",
      from: "Delhi",
      fromCode: "DEL",
      to: "Singapore",
      toCode: "SIN"
    },
    {
      id: 3,
      date: "Thu 10 Jan'24",
      airline: "Fly Air India",
      flightCode: "AX - 123",
      from: "Delhi",
      fromCode: "DEL",
      to: "Singapore",
      toCode: "SIN"
    },
    {
      id: 4,
      date: "Thu 10 Jan'24",
      airline: "Fly Air India",
      flightCode: "AX - 123",
      from: "Delhi",
      fromCode: "DEL",
      to: "Singapore",
      toCode: "SIN"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Flight Summary</h2>
      
      <div className="space-y-4">
        {flights.map((flight) => (
          <div key={flight.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex flex-col space-y-2">
                <div className="text-sm font-medium text-gray-600">{flight.date}</div>
                <div className="text-lg font-semibold text-gray-800">{flight.airline}</div>
                <div className="text-sm text-gray-700">({flight.flightCode})</div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="text-sm text-gray-600">From</div>
                  <div className="font-medium text-gray-800">{flight.from}</div>
                  <div className="text-sm text-gray-500">({flight.fromCode})</div>
                </div>
                
                <div className="flex items-center px-3">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                
                <div className="text-left">
                  <div className="text-sm text-gray-600">To</div>
                  <div className="font-medium text-gray-800">{flight.to}</div>
                  <div className="text-sm text-gray-500">({flight.toCode})</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-sm text-gray-700">
          <span className="font-medium">Note:</span> All flights include meals, specific services and baggage allowance as per airline policy.
        </p>
      </div>
    </div>
  );
};

export default FlightSummary;