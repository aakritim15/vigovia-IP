import React, { useMemo, useState, useEffect } from "react";

/* Tiny CSV parser (quotes, commas, CRLF). No deps. */
function parseCSV(csv, delimiter = ",") {
  const rows = [];
  let cur = "", inQuotes = false, row = [];
  for (let i = 0; i < csv.length; i++) {
    const c = csv[i], next = csv[i + 1];
    if (c === '"') {
      if (inQuotes && next === '"') { cur += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (c === delimiter && !inQuotes) {
      row.push(cur); cur = "";
    } else if ((c === "\n" || c === "\r") && !inQuotes) {
      if (c === "\r" && next === "\n") i++;
      row.push(cur); cur = "";
      if (row.length && !(row.length === 1 && row[0] === "")) rows.push(row);
      row = [];
    } else cur += c;
  }
  if (cur.length || row.length) { row.push(cur); rows.push(row); }
  return rows;
}
function toCSV(rows) {
  const esc = (s) => {
    const str = String(s ?? "");
    const needs = /[",\n\r]/.test(str);
    const body = str.replace(/"/g, '""');
    return needs ? `"${body}"` : body;
  };
  return rows.map(r => r.map(esc).join(',')).join('\n');
}

/**
 * CsvPillTable
 * Props:
 *  - csv: string (first row = headers)
 *  - onCsvChange?: (csv) => void
 *  - editable?: boolean  (headers remain non-editable)
 *  - columnConfig?: array of { key?, title?, width?, align?: 'left'|'center'|'right', render?, headerClass?, cellClass? }
 *  - headerColor?: string (default '#321e5d')
 *  - dataColor?: string (default '#f9eeff')
 *  - radius?: number in px (default 24)
 *  - delimiter?: string (default ',')
 *  - gap?: number in px (default 8)
 */
const CsvPillTable = ({
  csv,
  onCsvChange,
  editable = false,
  columnConfig = [],
  headerColor = "#321e5d",
  dataColor = "#f9eeff",
  radius = 24,
  delimiter = ",",
  gap = 8,
}) => {
  const [rows, setRows] = useState(() => parseCSV(csv || "", delimiter));
  useEffect(() => setRows(parseCSV(csv || "", delimiter)), [csv, delimiter]);

  const { columns, dataRows } = useMemo(() => {
    if (!rows.length) return { columns: [], dataRows: [] };
    const headers = rows[0].map((h) => h.trim());
    const data = rows.slice(1).map((r) => {
      const obj = {};
      headers.forEach((h, i) => (obj[h] = r[i] ?? ""));
      return obj;
    });

    const cols = headers.map((h, idx) => {
      const cfg = columnConfig[idx] || columnConfig.find((c) => c.key === h) || {};
      return {
        key: cfg.key || h,
        title: cfg.title || h,       // shown in header, never editable
        width: cfg.width || "1fr",
        align: cfg.align || "left",
        render: cfg.render,
        cellClass: cfg.cellClass || "",
        headerClass: cfg.headerClass || "",
      };
    });

    return { columns: cols, dataRows: data };
  }, [rows, columnConfig]);

  if (!columns.length) return null;

  const commit = (nextRows) => {
    setRows(nextRows);
    onCsvChange && onCsvChange(toCSV(nextRows));
  };

  // NOTE: header is locked — no setter for headers exposed in UI
  const setCell = (ri, ci, val) => {
    const next = rows.map((r) => [...r]);
    next[ri][ci] = val;
    commit(next);
  };

  const addRow = () => {
    const cols = rows[0]?.length ?? 0;
    const next = [...rows, new Array(cols).fill("")];
    commit(next);
  };

  const removeRow = (ri) => {
    if (ri === 0) return; // don't remove header
    const next = rows.filter((_, i) => i !== ri);
    commit(next);
  };

  const template = columns.map((c) => c.width || "1fr").join(" ");
  const align = (a) =>
    a === "center" ? "text-center" : a === "right" ? "text-right" : "text-left";

  return (
    <div className="w-[min(100%,1120px)] mx-auto my-6">
      {/* Header (ALWAYS non-editable) */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: template + (editable ? " 60px" : ""),
          columnGap: `${gap}px`,
        }}
      >
        {columns.map((c) => (
          <div
            key={c.key}
            className={[
              "px-4 py-2 text-sm font-bold text-center text-white align-center",
              "rounded-t-[var(--r)]",
              align(c.align),
              c.headerClass,
            ].join(" ")}
            style={{ background: headerColor, "--r": `${radius}px` }}
          >
            {c.title}
          </div>
        ))}
        {editable && <div></div>}
      </div>

      {/* Body */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: template + (editable ? " 60px" : ""),
          columnGap: `${gap}px`,
          rowGap: 0,
        }}
      >
        {dataRows.map((row, rIdx) =>
          columns.map((c, ci) => {
            const isLast = rIdx === dataRows.length - 1;
            const isFirst = rIdx === 0;
            const raw = row[c.key] ?? row[c.title] ?? "";
            const content = typeof c.render === "function" ? c.render(raw, row, rIdx) : raw;

            return (
              <div
                key={`${rIdx}-${c.key}`}
                className={[
                  "px-4 py-3 text-sm text-center font-light text-black align-center",
                  align(c.align),
                  !isFirst ? "border-0 border-white" : "",
                  isLast ? "rounded-b-[var(--r)]" : "",
                  c.cellClass,
                ].join(" ")}
                style={{ background: dataColor, "--r": `${radius}px` }}
              >
                {!editable ? (
                  typeof content === "string"
                    ? content.split(/\r?\n/).map((line, i, arr) => (
                        <span key={i}>
                          {line}
                          {i < arr.length - 1 ? <br /> : null}
                        </span>
                      ))
                    : content
                ) : (
                  <input
                    className="w-full px-2 py-1 rounded border"
                    value={rows[rIdx + 1][ci] ?? ""}
                    onChange={(e) => setCell(rIdx + 1, ci, e.target.value)}
                  />
                )}
              </div>
            );
          }).concat(
            editable
              ? [
                  <div
                    key={`op-${rIdx}`}
                    className={[
                      "px-2 py-3 text-sm text-center font-light text-black align-center",
                      rIdx === dataRows.length - 1 ? "rounded-b-[var(--r)]" : "",
                    ].join(" ")}
                    style={{ background: dataColor, "--r": `${radius}px` }}
                  >
                    <button
                      className="text-xs px-2 py-1 border rounded"
                      onClick={() => removeRow(rIdx + 1)}
                    >
                      −
                    </button>
                  </div>,
                ]
              : []
          )
        )}
      </div>

      {editable && (
        <div className="mt-2 flex gap-2">
          <button className="px-3 py-1.5 border rounded" onClick={addRow}>+ row</button>
        </div>
      )}
    </div>
  );
};

export default CsvPillTable;
