import React from "react";

export function Rink({ children }: { children?: React.ReactNode }) {
  return (
    <svg
      viewBox="-100 -42 200 85"
      className="w-full max-w-3xl aspect-[200/85] mx-auto block text-gray-600"
    >
      <rect x="-100" y="-42.5" width="200" height="85" rx="28" ry="28" fill="white" stroke="currentColor" />
      <line x1="0" y1="-42.5" x2="0" y2="42.5" stroke="currentColor" strokeDasharray="3 3" />
      <circle cx="0" cy="0" r="15" fill="none" stroke="currentColor" opacity=".4" />
      {children}
    </svg>
  );
}
