"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "gold";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "gold",
  size = "md",
  children,
  icon,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeStyles = {
    sm: "px-4 py-2 text-xs tracking-wider",
    md: "px-6 py-2.5 text-sm tracking-wider",
    lg: "px-8 py-3.5 text-base tracking-widest uppercase font-semibold",
  }[size];

  const variantStyles = {
    gold: "bg-gradient-to-r from-[#B08D57] via-[#D4AF37] to-[#B08D57] text-[#2D1A15] shadow-lg shadow-[#C5A059]/25 hover:shadow-xl hover:shadow-[#C5A059]/40 hover:-translate-y-0.5 border border-[#F4E2B2]/60 focus:ring-[#C5A059]",
    primary:
      "bg-gradient-to-r from-[#581825] to-[#801C2E] text-[#FFFDF9] shadow-lg shadow-[#581825]/20 hover:shadow-xl hover:shadow-[#581825]/35 hover:-translate-y-0.5 border border-[#801C2E] focus:ring-[#581825]",
    secondary:
      "bg-[#FAF4EB] text-[#581825] hover:bg-[#F5E6D3] border border-[#C5A059]/40 shadow-sm focus:ring-[#C5A059]",
    outline:
      "bg-transparent text-[#2D1A15] border border-[#C5A059] hover:bg-[#C5A059]/10 focus:ring-[#C5A059]",
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {icon && <span className="w-4 h-4 flex items-center justify-center">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
