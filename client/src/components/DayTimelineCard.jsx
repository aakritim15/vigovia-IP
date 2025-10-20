import React, { useEffect, useMemo, useState } from "react";

const DayTimelineCard = ({
  dayLabel,
  imageUrl,
  dateTitle,
  subtitle,
  segments = [], // [{ label: "Morning", points: ["..."] }, ...]
  editable = false,
  onChange,
  onRemove
}) => {
  const [v, setV] = useState({ dayLabel, imageUrl, dateTitle, subtitle, segments });
  useEffect(() => {
    setV({ dayLabel, imageUrl, dateTitle, subtitle, segments });
  }, [dayLabel, imageUrl, dateTitle, subtitle, segments]);

  // Never allow dayLabel to be modified via emits
  const emit = (patch = {}) => {
    const { dayLabel: _ignore, ...rest } = patch;
    const next = { ...v, ...rest, dayLabel: v.dayLabel };
    setV(next);
    onChange && onChange(next);
  };

  // Stable random Picsum fallback for this card instance (so it doesn't change on every re-render)
  const fallbackImg = useMemo(
    () => `https://picsum.photos/seed/${Math.random().toString(36).slice(2)}-card/300/300`,
    []
  );
  const imgSrc =
    v.imageUrl && String(v.imageUrl).trim().length > 0 ? v.imageUrl : fallbackImg;

  const n = v.segments.length;
  const DOT_TOP = "1rem";     // dot top offset inside each row
  const DOT_SIZE = "1rem";    // h-4 = 1rem
  const TOP_SEG_H = "1.5rem"; // connect to dot center (DOT_TOP + DOT_SIZE/2)

  const setSegLabel = (i, val) => {
    const seg = [...v.segments];
    seg[i] = { ...seg[i], label: val };
    emit({ segments: seg });
  };
  const addSeg = () => emit({ segments: [...v.segments, { label: "New", points: [""] }] });
  const delSeg = (i) => emit({ segments: v.segments.filter((_, idx) => idx !== i) });

  const setPoint = (i, j, val) => {
    const seg = [...v.segments];
    const pts = [...seg[i].points];
    pts[j] = val;
    seg[i] = { ...seg[i], points: pts };
    emit({ segments: seg });
  };
  const addPoint = (i) => {
    const seg = [...v.segments];
    seg[i] = { ...seg[i], points: [...seg[i].points, ""] };
    emit({ segments: seg });
  };
  const delPoint = (i, j) => {
    const seg = [...v.segments];
    seg[i] = { ...seg[i], points: seg[i].points.filter((_, k) => k !== j) };
    emit({ segments: seg });
  };

  return (
    <div className="w-[min(100%,1120px)] mx-auto my-6 grid grid-cols-[72px_180px_1fr] items-start gap-4 rounded-xl border border-violet-200 bg-white p-4">
      {/* Day strip */}
      <div className="relative flex h-48 w-[72px] items-center justify-center rounded-xl bg-violet-900">
        {/* ALWAYS read-only label */}
        <span className="-rotate-90 text-white font-semibold tracking-wide">
          {v.dayLabel}
        </span>

        {editable && onRemove && (
          <button
            className="absolute top-2 right-2 text-xs px-2 py-1 rounded border bg-white"
            onClick={onRemove}
            title="Remove day"
          >
            −
          </button>
        )}
      </div>

      {/* Image + headings */}
      <div className="flex flex-col items-center">
        {!editable ? (
          <img
            src={imgSrc}
            crossOrigin="anonymous"
            alt={v.dateTitle || "Day image"}
            className="h-40 w-40 rounded-full object-cover shadow-sm"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <img
              src={v.imageUrl && v.imageUrl.trim() ? v.imageUrl : fallbackImg}
              crossOrigin="anonymous"
              alt="preview"
              className="h-40 w-40 rounded-full object-cover shadow-sm"
            />
            <input
              className="border rounded px-2 py-1 w-40 text-xs"
              placeholder="Image URL"
              value={v.imageUrl || ""}
              onChange={(e) => emit({ imageUrl: e.target.value })}
            />
          </div>
        )}
        <div className="mt-3 text-center">
          {!editable ? (
            <>
              <div className="text-lg font-semibold text-gray-900">{v.dateTitle}</div>
              <div className="text-sm text-gray-600">{v.subtitle}</div>
            </>
          ) : (
            <>
              <input
                className="text-lg font-semibold text-gray-900 border rounded px-2 py-1 w-48 text-center"
                value={v.dateTitle}
                onChange={(e) => emit({ dateTitle: e.target.value })}
              />
              <input
                className="mt-2 text-sm text-gray-900 border rounded px-2 py-1 w-56 text-center"
                value={v.subtitle}
                onChange={(e) => emit({ subtitle: e.target.value })}
              />
            </>
          )}
        </div>
      </div>

      {/* Timeline + content */}
      <div className="grid grid-cols-[28px_120px_1fr]">
        {v.segments.map((seg, i) => (
          <React.Fragment key={i}>
            {/* timeline cell */}
            <div className="relative py-4">
              {i > 0 && (
                <span
                  className="absolute left-1/2 w-1 -translate-x-1/2 bg-blue-500"
                  style={{ top: 0, height: TOP_SEG_H }}
                />
              )}
              {i < n - 1 && (
                <span
                  className="absolute left-1/2 w-1 -translate-x-1/2 bg-blue-500"
                  style={{ top: `calc(${DOT_TOP} + ${DOT_SIZE}/2)`, bottom: 0 }}
                />
              )}
              <span
                className="absolute left-1/2 -translate-x-1/2 rounded-full border-4 border-[#321e5d] bg-white"
                style={{ top: DOT_TOP, width: DOT_SIZE, height: DOT_SIZE }}
              />
            </div>

            {/* label */}
            <div className="ml-8 py-4 leading-0 text-md font-bold text-gray-900 text-left">
              {!editable ? (
                seg.label
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    className="border rounded px-2 py-1 w-full"
                    value={seg.label}
                    onChange={(e) => setSegLabel(i, e.target.value)}
                  />
                  <button className="text-xs px-2 py-1 border rounded" onClick={() => delSeg(i)}>
                    −
                  </button>
                </div>
              )}
            </div>

            {/* bullets */}
            <div className="py-4 text-left">
              <ul className="list-disc space-y-1 pl-5 text-md font-light leading-6 text-gray-900">
                {seg.points.map((t, j) => (
                  <li key={j} className="text-left">
                    {!editable ? (
                      t
                    ) : (
                      <div className="flex items-start gap-2">
                        <input
                          className="border rounded px-2 py-1 w-full"
                          value={t}
                          onChange={(e) => setPoint(i, j, e.target.value)}
                        />
                        <button className="text-xs px-2 py-1 border rounded" onClick={() => delPoint(i, j)}>
                          −
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
              {editable && (
                <button className="mt-2 text-xs px-2 py-1 border rounded" onClick={() => addPoint(i)}>
                  + point
                </button>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

      {editable && (
        <div className="col-span-3">
          <button className="text-xs px-2 py-1 border rounded" onClick={addSeg}>
            + segment
          </button>
        </div>
      )}
    </div>
  );
};

export default DayTimelineCard;
