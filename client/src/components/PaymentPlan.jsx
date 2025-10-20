import React from 'react';

// --- Reusable Chevron Row Component ---
const ChevronRow = ({ label, value }) => (
    <div className="flex items-center text-sm mb-2">
        <div 
            className="bg-purple-100 text-gray-800 font-semibold py-3 px-6 text-left"
            style={{ clipPath: 'polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%)' }}
        >
            {label}
        </div>
        <div className="flex-grow border border-purple-200 rounded-r-lg p-3 text-right font-medium text-gray-700">
            {value}
        </div>
    </div>
);


// --- Component for Payment Plan ---
const PaymentPlan = () => {
    const installments = [
        { id: 1, name: 'Installment 1', amount: '₹3,50,000', due: 'Initial Payment' },
        { id: 2, name: 'Installment 2', amount: '₹4,00,000', due: 'Post Visa Approval' },
        { id: 3, name: 'Installment 3', amount: 'Remaining', due: '20 Days Before Departure' },
    ];

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment <span className="text-purple-600">Plan</span></h2>
            
            {/* Total and TCS Rows */}
            <div className="mb-8">
                <ChevronRow label="Total Amount" value="₹ 9,00,000 For 3 Pax (Inclusive Of GST)" />
                <ChevronRow label="TCS" value="Not Collected" />
            </div>

            {/* Installments Table */}
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
                {/* Headers */}
                <div className="bg-indigo-900 text-white font-bold p-3 rounded-t-3xl">Installment</div>
                <div className="bg-indigo-900 text-white font-bold p-3 rounded-t-3xl">Amount</div>
                <div className="bg-indigo-900 text-white font-bold p-3 rounded-t-3xl">Due Date</div>

                {/* Body Columns */}
                <div className="bg-purple-50 rounded-b-3xl">
                    {installments.map(item => (
                        <div key={item.id} className="p-3 border-b border-purple-200 flex items-center justify-center min-h-[50px]">{item.name}</div>
                    ))}
                </div>
                <div className="bg-purple-50 rounded-b-3xl">
                    {installments.map(item => (
                        <div key={item.id} className="p-3 border-b border-purple-200 flex items-center justify-center min-h-[50px]">{item.amount}</div>
                    ))}
                </div>
                <div className="bg-purple-50 rounded-b-3xl">
                    {installments.map(item => (
                        <div key={item.id} className="p-3 border-b border-purple-200 flex items-center justify-center min-h-[50px]">{item.due}</div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Component for Visa Details ---
const VisaDetails = () => {
    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Visa <span className="text-purple-600">Details</span></h2>
            <div className="border border-purple-300 rounded-2xl p-4 flex justify-around text-center">
                <div>
                    <span className="font-bold text-gray-800">Visa Type :</span>
                    <p className="text-gray-600">123456</p>
                </div>
                <div>
                    <span className="font-bold text-gray-800">Validity :</span>
                    <p className="text-gray-600">123456</p>
                </div>
                <div>
                    <span className="font-bold text-gray-800">Processing Date :</span>
                    <p className="text-gray-600">123456</p>
                </div>
            </div>
        </div>
    );
};

// --- Component for Booking Action ---
const BookingAction = () => {
    return (
        <div className="text-center mt-16">
            <h2 className="text-3xl font-bold text-indigo-900 tracking-widest mb-4">PLAN.PACK.GO!</h2>
            <button className="bg-purple-600 text-white font-bold py-3 px-12 rounded-full hover:bg-purple-700 transition-colors">
                Book Now
            </button>
        </div>
    );
};


// --- Main App Component to render all sections ---
const App = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white font-sans">
        <PaymentPlan />
        <VisaDetails />
        <BookingAction />
    </div>
  );
};

export default App;

