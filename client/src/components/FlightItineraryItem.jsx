import React from "react";

const FlightItineraryItem = ({ date, flight, details, editable = false, onChange, onRemove }) => {
  if (!editable) {
    return (
      <div className="w-[min(100%,1120px)] mx-auto my-5 relative flex items-center gap-[8vw] rounded-xl border border-[#541C9C] bg-white">
        {/* left date tag with chevron */}
        <div className="relative isolate whitespace-nowrap rounded-xl bg-[#f9eeff] px-8 py-3 text-lg font-medium text-gray-900">
          {date}
          <span className="pointer-events-none absolute -right-3 top-1/2 h-9 w-9 rounded-tr-lg z-[-1] -translate-y-1/2 rotate-45 border-r border-t border-[#541C9C] bg-[#f9eeff] content-['']" />
        </div>

        {/* right text */}
        <div className="text-lg text-gray-900">
          <span className="font-extrabold">{flight}</span>
          <span className="ml-2">{details}</span>
        </div>
      </div>
    );
  }

  // Editable layout: preserve outer container + spacing; inputs replace text inline.
  const val = {
    date: typeof date === 'string' ? date : '',
    flight: typeof flight === 'string' ? flight : '',
    details: typeof details === 'string' ? details : ''
  };

  return (
    <div className="w-[min(100%,1120px)] mx-auto my-5 relative flex items-center gap-[8vw] rounded-xl border border-[#541C9C] bg-white">
      <div className="relative isolate whitespace-nowrap rounded-xl bg-[#f9eeff] px-8 py-3 text-lg font-medium text-gray-900">
        <input
          className="bg-[#f9eeff] text-gray-900 text-lg font-medium outline-none"
          value={val.date}
          onChange={(e)=>onChange && onChange({ date: e.target.value, flight: val.flight, details: val.details })}
        />
        <span className="pointer-events-none absolute -right-3 top-1/2 h-9 w-9 rounded-tr-lg z-[-1] -translate-y-1/2 rotate-45 border-r border-t border-[#541C9C] bg-[#f9eeff] content-['']" />
      </div>

      <div className="text-lg text-gray-900 flex items-center gap-2">
        <input
          className="font-extrabold border rounded px-2 py-1"
          value={val.flight}
          onChange={(e)=>onChange && onChange({ date: val.date, flight: e.target.value, details: val.details })}
        />
        <input
          className="border rounded px-2 py-1"
          value={val.details}
          onChange={(e)=>onChange && onChange({ date: val.date, flight: val.flight, details: e.target.value })}
        />
        {onRemove && (
          <button className="ml-2 text-xs px-2 py-1 border rounded" onClick={onRemove}>−</button>
        )}
      </div>
    </div>
  );
};

export default FlightItineraryItem;
