import React from 'react';

const HotelBooking = () => {
  // Hotel booking data
  const bookingData = {
    city: "Singapore",
    checkIn: "24/02/2024",
    checkOut: "24/02/2024",
    nights: 2,
    hotelName: "Super Townhouse Oak Vashi Formerly Blue Diamond"
  };

  // Creating an array of bookings for demonstration
  const bookings = [
    { ...bookingData, id: 1 },
    { ...bookingData, id: 2, hotelName: "Super Townhouse Oak Vashi Formerly Blue Diamond \n with an extra line of text to show alignment." },
    { ...bookingData, id: 3 },
    { ...bookingData, id: 4 },
    { ...bookingData, id: 5 }
  ];

  const notes = [
    "All Hotels Are Tentative And Can Be Replaced With Similar.",
    "Breakfast Included For All Hotel Stays.",
    "All Hotels Will Be 4* And Above Category.",
    "A maximum occupancy of 2 people/room is allowed in most hotels."
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white font-sans">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Hotel Bookings
        </h2>
      </div>
      
      {/* Table Container: This now uses a flexbox layout for the columns */}
      <div className="flex gap-2">
        
        {/* Column for City */}
        <div className="flex-1">
          <div className="bg-indigo-900 text-white font-bold p-4 rounded-t-2xl text-center">City</div>
          <div className="bg-purple-50 rounded-b-2xl text-sm text-gray-700 h-full">
            {bookings.map((item, index) => (
              <div key={item.id} className="p-4 text-center border-b border-purple-200 min-h-[88px] flex items-center justify-center">
                {item.city}
              </div>
            ))}
          </div>
        </div>

        {/* Column for Check In */}
        <div className="flex-1">
          <div className="bg-indigo-900 text-white font-bold p-4 rounded-t-2xl text-center">Check In</div>
          <div className="bg-purple-50 rounded-b-2xl text-sm text-gray-700 h-full">
            {bookings.map((item, index) => (
              <div key={item.id} className="p-4 text-center border-b border-purple-200 min-h-[88px] flex items-center justify-center">
                {item.checkIn}
              </div>
            ))}
          </div>
        </div>
        
        {/* Column for Check Out */}
        <div className="flex-1">
          <div className="bg-indigo-900 text-white font-bold p-4 rounded-t-2xl text-center">Check Out</div>
          <div className="bg-purple-50 rounded-b-2xl text-sm text-gray-700 h-full">
            {bookings.map((item, index) => (
              <div key={item.id} className="p-4 text-center border-b border-purple-200 min-h-[88px] flex items-center justify-center">
                {item.checkOut}
              </div>
            ))}
          </div>
        </div>

        {/* Column for Nights */}
        <div className="flex-1">
          <div className="bg-indigo-900 text-white font-bold p-4 rounded-t-2xl text-center">Nights</div>
          <div className="bg-purple-50 rounded-b-2xl text-sm text-gray-700 h-full">
            {bookings.map((item, index) => (
              <div key={item.id} className="p-4 text-center border-b border-purple-200 min-h-[88px] flex items-center justify-center">
                {item.nights}
              </div>
            ))}
          </div>
        </div>

        {/* Column for Hotel Name */}
        <div className="flex-[2_2_0%]"> {/* This column is twice as wide */}
          <div className="bg-indigo-900 text-white font-bold p-4 rounded-t-2xl text-center">Hotel Name</div>
          <div className="bg-purple-50 rounded-b-2xl text-sm text-gray-700 h-full">
            {bookings.map((item, index) => (
              <div key={item.id} className="p-4 text-left border-b border-purple-200 min-h-[88px] flex items-center" style={{ whiteSpace: 'pre-wrap' }}>
                {item.hotelName}
              </div>
            ))}
          </div>
        </div>

      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <ol className="list-decimal list-inside space-y-1 text-xs text-gray-600">
          {notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default HotelBooking;