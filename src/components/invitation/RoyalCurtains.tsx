"use client";

import React from "react";
import { motion } from "framer-motion";

interface RoyalCurtainsProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export const RoyalCurtains: React.FC<RoyalCurtainsProps> = ({
  isOpen,
  children,
}) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Content (revealed as curtains part) */}
      <div className="relative z-0 w-full">{children}</div>

      {/* Royal Curtains Overlay */}
      <div
        className={`fixed inset-0 z-40 pointer-events-none transition-opacity duration-1000 ${
          isOpen ? "opacity-0 delay-1000" : "opacity-100"
        }`}
      >
        {/* Left Curtain Drape */}
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: isOpen ? "-95%" : "0%" }}
          transition={{
            duration: 1.8,
            ease: [0.65, 0, 0.35, 1],
          }}
          className="absolute top-0 left-0 bottom-0 w-[55%] z-30 origin-left"
          style={{ willChange: "transform" }}
        >
          <div className="w-full h-full curtain-fabric-champagne relative shadow-2xl">
            {/* Satin Sheen Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30 pointer-events-none" />

            {/* Golden Bead Edge along the inner border */}
            <div className="absolute top-0 right-0 bottom-0 w-3 bg-gradient-to-r from-[#B08D57] via-[#FFF3B0] to-[#8A6328] shadow-lg flex flex-col items-center justify-around py-4">
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-gradient-to-br from-[#FFF3B0] to-[#AA771C] shadow-sm my-0.5"
                />
              ))}
            </div>

            {/* Decorative Golden Tieback / Sash */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex items-center gap-1 opacity-90">
              <div className="w-8 h-12 rounded-full border-2 border-[#D4AF37] bg-[#581825]/80 shadow-md flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Curtain Drape */}
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: isOpen ? "95%" : "0%" }}
          transition={{
            duration: 1.8,
            ease: [0.65, 0, 0.35, 1],
          }}
          className="absolute top-0 right-0 bottom-0 w-[55%] z-30 origin-right"
          style={{ willChange: "transform" }}
        >
          <div className="w-full h-full curtain-fabric-champagne relative shadow-2xl">
            {/* Satin Sheen Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/40 pointer-events-none" />

            {/* Golden Bead Edge along the inner border */}
            <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-[#8A6328] via-[#FFF3B0] to-[#B08D57] shadow-lg flex flex-col items-center justify-around py-4">
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-gradient-to-br from-[#FFF3B0] to-[#AA771C] shadow-sm my-0.5"
                />
              ))}
            </div>

            {/* Decorative Golden Tieback / Sash */}
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex items-center gap-1 opacity-90">
              <div className="w-8 h-12 rounded-full border-2 border-[#D4AF37] bg-[#581825]/80 shadow-md flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top Scalloped Valance / Pelmet with Golden Beads */}
        <motion.div
          initial={{ y: "0%" }}
          animate={{ y: isOpen ? "-80%" : "0%" }}
          transition={{
            duration: 1.5,
            ease: [0.65, 0, 0.35, 1],
          }}
          className="absolute top-0 left-0 right-0 z-40"
        >
          <div className="relative w-full h-16 sm:h-20 bg-gradient-to-b from-[#421019] via-[#661C2C] to-[#581825] shadow-xl border-b-2 border-[#D4AF37]">
            {/* Scalloped Swags */}
            <div className="absolute bottom-0 inset-x-0 flex justify-around">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="w-16 sm:w-28 h-6 sm:h-8 bg-gradient-to-b from-[#661C2C] to-[#421019] rounded-b-full border-b-2 border-x border-[#D4AF37]/80 shadow-md flex items-end justify-center pb-1"
                >
                  <div className="w-2 h-2 rounded-full bg-[#FFE599] shadow-sm" />
                </div>
              ))}
            </div>

            {/* Golden Beaded Fringe */}
            <div className="absolute -bottom-3 inset-x-0 h-3 gold-fringe" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
