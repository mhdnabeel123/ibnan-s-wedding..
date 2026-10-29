import React from "react";
import { DecorativeDivider } from "./DecorativeDivider";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  align?: "center" | "left";
  className?: string;
  dividerVariant?: "gold" | "maroon";
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  subtitle,
  title,
  align = "center",
  className = "",
  dividerVariant = "gold",
}) => {
  return (
    <div className={`mb-8 ${align === "center" ? "text-center" : "text-left"} ${className}`}>
      {subtitle && (
        <p className="font-script text-2xl md:text-3xl text-[#801C2E] mb-1.5 tracking-wide">
          {subtitle}
        </p>
      )}
      <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wider text-[#2D1A15] uppercase">
        {title}
      </h2>
      <DecorativeDivider variant={dividerVariant} className="mt-2" />
    </div>
  );
};
