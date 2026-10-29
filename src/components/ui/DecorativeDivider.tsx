import React from "react";

interface DecorativeDividerProps {
  variant?: "gold" | "maroon" | "subtle";
  className?: string;
  withHeart?: boolean;
}

export const DecorativeDivider: React.FC<DecorativeDividerProps> = ({
  variant = "gold",
  className = "",
  withHeart = false,
}) => {
  const isMaroon = variant === "maroon";
  const lineColor = isMaroon
    ? "from-transparent via-[#801C2E] to-transparent"
    : "from-transparent via-[#C5A059] to-transparent";

  const strokeColor = isMaroon ? "#801C2E" : "#C5A059";

  return (
    <div className={`flex items-center justify-center gap-3 my-4 w-full max-w-md mx-auto ${className}`}>
      {/* Left Line */}
      <div className={`h-[1px] flex-1 bg-gradient-to-r ${lineColor}`} />

      {/* Center Ornament */}
      <div className="flex items-center gap-1.5 px-2">
        {withHeart ? (
          <svg className="w-5 h-5 text-[#801C2E]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" fill={strokeColor} />
            <path
              d="M12 2V6M12 18V22M2 12H6M18 12H22"
              stroke={strokeColor}
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="7" stroke={strokeColor} strokeWidth="0.8" strokeDasharray="1 2" />
          </svg>
        )}
      </div>

      {/* Right Line */}
      <div className={`h-[1px] flex-1 bg-gradient-to-r ${lineColor}`} />
    </div>
  );
};
