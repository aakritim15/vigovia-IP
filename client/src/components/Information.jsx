import React from 'react';

// --- Component for Scope of Service ---
const ScopeOfService = () => {
    const services = [
        { id: 1, service: 'Flight Tickets And Hotel Vouchers', details: 'Delivered 3 Days Post Full Payment' },
        { id: 2, service: 'Web Check-In', details: 'Boarding Pass Delivery Via Email/WhatsApp' },
        { id: 3, service: 'Support', details: 'Chat Support – Response Time: 4 Hours' },
        { id: 4, service: 'Cancellation Support', details: 'Provided' },
        { id: 5, service: 'Trip Summary', details: 'Response Time: 5 Minutes' },
    ];

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Scope Of <span className="text-purple-600">Service</span></h2>
            <div className="flex gap-2">
                <div className="flex-[1_1_30%]">
                    <div className="bg-indigo-900 text-white font-bold p-4 rounded-t-2xl text-center">Service</div>
                    <div className="bg-purple-50 rounded-b-2xl text-sm text-gray-700 h-full">
                        {services.map(item => (<div key={item.id} className="p-4 text-left border-b border-purple-200 min-h-[60px] flex items-center">{item.service}</div>))}
                    </div>
                </div>
                <div className="flex-[1_1_70%]">
                    <div className="bg-indigo-900 text-white font-bold p-4 rounded-t-2xl text-center">Details</div>
                    <div className="bg-purple-50 rounded-b-2xl text-sm text-gray-700 h-full">
                        {services.map(item => (<div key={item.id} className="p-4 text-left border-b border-purple-200 min-h-[60px] flex items-center">{item.details}</div>))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Component for Inclusion Summary ---
const InclusionSummary = () => {
    const inclusions = [
        { id: 1, category: 'Flight', count: 2, details: 'All Flights Mentioned', status: 'Awaiting Confirmation' },
        { id: 2, category: 'Tourist Tax', count: 2, details: 'Yotel (Singapore), Oakwood (Sydney), Mercure (Cairns), Novotel (Gold Coast), Holiday Inn (Melbourne)', status: 'Awaiting Confirmation' },
        { id: 3, category: 'Hotel', count: 2, details: 'Airport To Hotel - Hotel To Attractions - Day Trips If Any', status: 'Included' },
    ];
    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Inclusion <span className="text-purple-600">Summary</span></h2>
             <div className="flex gap-2">
                {/* Columns */}
                <div className="flex-[1_1_15%]">
                    <div className="bg-indigo-900 text-white font-bold p-4 rounded-t-2xl text-center">Category</div>
                    <div className="bg-purple-50 rounded-b-2xl text-sm text-gray-700 h-full">{inclusions.map(i => <div key={i.id} className="p-4 text-center border-b border-purple-200 min-h-[90px] flex items-center justify-center">{i.category}</div>)}</div>
                </div>
                <div className="flex-[1_1_10%]">
                    <div className="bg-indigo-900 text-white font-bold p-4 rounded-t-2xl text-center">Count</div>
                    <div className="bg-purple-50 rounded-b-2xl text-sm text-gray-700 h-full">{inclusions.map(i => <div key={i.id} className="p-4 text-center border-b border-purple-200 min-h-[90px] flex items-center justify-center">{i.count}</div>)}</div>
                </div>
                <div className="flex-[1_1_50%]">
                    <div className="bg-indigo-900 text-white font-bold p-4 rounded-t-2xl text-center">Details</div>
                    <div className="bg-purple-50 rounded-b-2xl text-sm text-gray-700 h-full">{inclusions.map(i => <div key={i.id} className="p-4 text-left border-b border-purple-200 min-h-[90px] flex items-center">{i.details}</div>)}</div>
                </div>
                <div className="flex-[1_1_25%]">
                    <div className="bg-indigo-900 text-white font-bold p-4 rounded-t-2xl text-center">Status / Comments</div>
                    <div className="bg-purple-50 rounded-b-2xl text-sm text-gray-700 h-full">{inclusions.map(i => <div key={i.id} className="p-4 text-center border-b border-purple-200 min-h-[90px] flex items-center justify-center">{i.status}</div>)}</div>
                </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
                <strong>Transfer Policy (Refundable Upon Claim):</strong> If Any Transfer Is Delayed Beyond 15 Minutes, Customers May Book An App-Based Or Radio Taxi And Claim A Refund For That Specific Leg.
            </p>
        </div>
    );
};

// --- Component for Important Notes ---
const Information = () => {
    const notes = [
        { id: 1, point: 'Airlines Standard Policy' },
        { id: 2, point: 'Flight/Hotel Cancellation' },
        { id: 3, point: 'Trip Insurance' },
        { id: 4, point: 'Hotel Check-In & Check Out' },
        { id: 5, point: 'Visa Rejection' },
    ];
    const detailsText = "In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.";

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Important <span className="text-purple-600">Notes</span></h2>
            <div className="flex gap-2">
                 <div className="flex-[1_1_30%]">
                    <div className="bg-indigo-900 text-white font-bold p-4 rounded-t-2xl text-center">Point</div>
                    <div className="bg-purple-50 rounded-b-2xl text-sm text-gray-700 h-full">
                        {notes.map(item => (<div key={item.id} className="p-4 text-left border-b border-purple-200 min-h-[72px] flex items-center">{item.point}</div>))}
                    </div>
                </div>
                <div className="flex-[1_1_70%]">
                    <div className="bg-indigo-900 text-white font-bold p-4 rounded-t-2xl text-center">Details</div>
                    <div className="bg-purple-50 rounded-b-2xl text-sm text-gray-700 h-full">
                        {notes.map(item => (<div key={item.id} className="p-4 text-left border-b border-purple-200 min-h-[72px] flex items-center">{detailsText}</div>))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main App Component to render all sections ---
const App = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white font-sans">
      <Information />
      <ScopeOfService />
      <InclusionSummary />
    </div>
  );
};

export default App;
