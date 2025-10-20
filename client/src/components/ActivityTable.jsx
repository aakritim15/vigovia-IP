import React from 'react';

// --- Component for Activity Table ---
const ActivityTable = () => {
    const activities = Array(15).fill({
        city: 'Rio De Janeiro',
        activity: 'Sydney Harbour Cruise & Taronga Zoo',
        type: 'Airlines Standard',
        time: '2-3 Hours'
    });

     return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Activity <span className="text-purple-600">Table</span></h2>
            <div className="grid grid-cols-4 gap-2 text-center text-sm">
                {/* Headers */}
                <div className="bg-indigo-900 text-white font-bold p-3 rounded-t-3xl">City</div>
                <div className="bg-indigo-900 text-white font-bold p-3 rounded-t-3xl">Activity</div>
                <div className="bg-indigo-900 text-white font-bold p-3 rounded-t-3xl">Type</div>
                <div className="bg-indigo-900 text-white font-bold p-3 rounded-t-3xl">Time Required</div>

                {/* Body Columns */}
                {/* City Column */}
                <div className="bg-purple-50 rounded-b-3xl">
                    {activities.map((item, index) => (
                        <div key={index} className="p-3 border-b border-purple-200 flex items-center justify-center min-h-[50px]">{item.city}</div>
                    ))}
                </div>
                {/* Activity Column */}
                 <div className="bg-purple-50 rounded-b-3xl">
                    {activities.map((item, index) => (
                        <div key={index} className="p-3 border-b border-purple-200 flex items-center justify-center min-h-[50px]">{item.activity}</div>
                    ))}
                </div>
                {/* Type Column */}
                 <div className="bg-purple-50 rounded-b-3xl">
                    {activities.map((item, index) => (
                        <div key={index} className="p-3 border-b border-purple-200 flex items-center justify-center min-h-[50px]">{item.type}</div>
                    ))}
                </div>
                {/* Time Required Column */}
                 <div className="bg-purple-50 rounded-b-3xl">
                    {activities.map((item, index) => (
                        <div key={index} className="p-3 border-b border-purple-200 flex items-center justify-center min-h-[50px]">{item.time}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// --- Component for Terms and Conditions ---
const TermsAndConditions = () => {
    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800">Terms and <span className="text-purple-600">Conditions</span></h3>
            <a href="#" className="text-blue-500 hover:underline">View all terms and conditions</a>
        </div>
    );
}


// --- Main App Component to render all sections ---
const App = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white font-sans">
      <ActivityTable />
      <TermsAndConditions />
    </div>
  );
};

export default App;

