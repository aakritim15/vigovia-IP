import React, { useEffect, useState } from "react";

const Field = ({ label, value, editable, onChange }) => {
  if (!editable) {
    return (
      <div className="space-y-1">
        <div className="text-md font-bold text-black">{label}</div>
        <div className="text-md text-black">{value ?? "-"}</div>
      </div>
    );
  }
  return (
    <div className="space-y-1">
      <input
        className="text-md font-bold text-black border rounded px-2 py-1 w-full"
        value={label}
        onChange={(e) => onChange({ label: e.target.value, value })}
      />
      <input
        className="text-md text-black border rounded px-2 py-1 w-full"
        value={value ?? ""}
        onChange={(e) => onChange({ label, value: e.target.value })}
      />
    </div>
  );
};

const TripSummary = ({ fields = [], editable = false, onChange }) => {
  const [local, setLocal] = useState(fields);
  useEffect(() => setLocal(fields), [fields]);

  const update = (idx, nv) => {
    const next = [...local];
    next[idx] = nv;
    setLocal(next);
    onChange && onChange(next);
  };

  return (
    <div className="w-[min(100%,1120px)] mx-auto my-6 rounded-2xl border border-purple-500 bg-white p-2">
      <div className="px-4 py-3">
        <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {local.map((f, i) => (
            <Field
              key={i}
              label={f.label}
              value={f.value}
              editable={editable}
              onChange={(nv) => update(i, nv)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripSummary;
