import React from "react";

type RinkProps = {
  children?: React.ReactNode;
  onTap?: (x: number, y: number) => void;
};

export function Rink({ children, onTap }: RinkProps) {
  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!onTap) return;

    const svg = e.currentTarget;

    // Convert click to SVG coordinate space
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;

    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    onTap(svgP.x, svgP.y);
  };

  return (
    <svg
      viewBox="-100 -42.5 200 85"
      className="w-full max-w-3xl aspect-[200/85] mx-auto block text-gray-600"
      onClick={handleClick}
    >
      {/* RINK OUTLINE */}
      <rect
        x="-100"
        y="-42.5"
        width="200"
        height="85"
        rx="28"
        ry="28"
        fill="white"
        stroke="currentColor"
      />

      {/* CENTER LINE */}
      <line
        x1="0"
        y1="-42.5"
        x2="0"
        y2="42.5"
        stroke="currentColor"
        strokeDasharray="3 3"
      />

      {/* CENTER CIRCLE */}
      <circle
        cx="0"
        cy="0"
        r="15"
        fill="none"
        stroke="currentColor"
        opacity=".4"
      />

      {children}
    </svg>
  );
}
