import React from "react";

interface FloralCornerProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
  size?: number;
}

export const FloralCorner: React.FC<FloralCornerProps> = ({
  position = "top-left",
  className = "",
  size = 72,
}) => {
  const rotationClass = {
    "top-left": "rotate-0",
    "top-right": "rotate-90",
    "bottom-right": "rotate-180",
    "bottom-left": "-rotate-90",
  }[position];

  return (
    <div
      className={`pointer-events-none select-none transition-opacity duration-700 ${rotationClass} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-[#C5A059]"
      >
        {/* Outer Corner Frame */}
        <path
          d="M4 36V4H36"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 28V8H28"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="2 2"
          opacity="0.8"
        />
        {/* Corner Dot */}
        <circle cx="4" cy="4" r="2.5" fill="currentColor" />

        {/* Botanical Lily / Petal Line Art */}
        <path
          d="M8 8C20 18 35 15 45 6C35 25 25 35 6 45C15 35 18 20 8 8Z"
          fill="currentColor"
          fillOpacity="0.08"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M12 12C25 30 40 28 58 20C40 38 28 50 20 58C28 40 30 25 12 12Z"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.7"
        />
        {/* Curled Tendril & Leaf Bud */}
        <path
          d="M18 18Q38 25 48 42Q52 48 58 45"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="58" cy="45" r="1.5" fill="currentColor" />
        <circle cx="45" cy="6" r="1.5" fill="currentColor" />
      </svg>
    </div>
  );
};
