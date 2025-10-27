import React from "react";

export function Legend() {
  const items = [
    { label: "Goal",    color: "#16a34a" },
    { label: "Shot",    color: "#2563eb" },
    { label: "Miss",    color: "#f59e0b" },
    { label: "Blocked", color: "#6b7280" },
  ];
  return (
    <div className="flex flex-wrap gap-3 items-center justify-center my-3 text-sm">
      {items.map(i => (
        <span key={i.label} className="inline-flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full" style={{ background: i.color }} />
          {i.label}
        </span>
      ))}
    </div>
  );
}
