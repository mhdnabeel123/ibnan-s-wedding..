"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEngine } from "@/lib/sound";
import { weddingData } from "@/data/wedding";
import { Sparkles, Heart } from "lucide-react";

interface WeddingEnvelopeProps {
  onOpen: () => void;
  onSkip: () => void;
}

export const WeddingEnvelope: React.FC<WeddingEnvelopeProps> = ({
  onOpen,
  onSkip,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    if (isOpened) return;
    setIsOpened(true);
    soundEngine.playOpeningChime();
    soundEngine.startAmbientMusic();

    // Trigger parent callback after envelope flap & card emergence
    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-[#FFFDF9] via-[#F9F0E6] to-[#F3E2D2] overflow-hidden">
      {/* Delicate Golden Sparkles and Ambient Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#F4E2B2]/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#E8A598]/20 blur-3xl animate-pulse" />
        
        {/* Floating Sparkle Particles */}
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#C5A059] animate-float-particle"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              top: `${(i * 7) % 95}%`,
              left: `${(i * 13) % 92}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${7 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-lg flex flex-col items-center text-center">
        {/* Monogram / Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex flex-col items-center"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#C5A059] bg-[#FFFDF9] shadow-lg flex items-center justify-center p-2 mb-3 relative group">
            <div className="w-full h-full rounded-full border border-dashed border-[#801C2E] flex items-center justify-center">
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest text-[#801C2E]">
                {weddingData.website.monogram}
              </span>
            </div>
            {/* Sparkle badge */}
            <div className="absolute -top-1 -right-1 bg-[#C5A059] text-white p-1 rounded-full shadow">
              <Sparkles className="w-3 h-3 text-[#FFFDF9]" />
            </div>
          </div>

          <p className="font-script text-2xl sm:text-3xl text-[#801C2E] mb-1">
            Bismillahir Rahmanir Raheem
          </p>
          <p className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-[#7A6050] uppercase">
            A Royal Invitation Awaits You
          </p>
        </motion.div>

        {/* 3D Envelope Presentation */}
        <div
          onClick={handleOpen}
          className="relative w-full aspect-[4/3] max-w-[420px] cursor-pointer group perspective-1000 my-4"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleOpen();
            }
          }}
          aria-label="Open wedding invitation envelope"
        >
          {/* Envelope Body */}
          <div className="relative w-full h-full bg-[#FAF4EB] rounded-2xl shadow-2xl border-2 border-[#D4AF37]/50 overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
            {/* Inner Lining Pattern */}
            <div className="absolute inset-2 border border-[#C5A059]/30 rounded-xl bg-gradient-to-b from-[#FFFDF9] to-[#F5E6D3] flex flex-col items-center justify-center p-6 text-center">
              <p className="font-script text-2xl text-[#801C2E]">
                The Valima Ceremony of
              </p>
              <h1 className="font-cinzel text-xl sm:text-2xl font-semibold text-[#2D1A15] tracking-wider mt-1">
                {weddingData.groom.firstName} & {weddingData.bride.firstName}
              </h1>
              <p className="text-xs sm:text-sm font-serif-luxury text-[#7A6050] mt-2">
                Monday, 16th November 2026 • Hilton Garden, Mysore
              </p>
            </div>

            {/* Bottom & Side Envelope Flaps (Decorative Creases) */}
            <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[#EEDDC8] to-transparent pointer-events-none opacity-60" />
            
            {/* Top Triangular Flap */}
            <motion.div
              initial={false}
              animate={{
                rotateX: isOpened ? 180 : 0,
                zIndex: isOpened ? 5 : 20,
              }}
              transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
              style={{
                transformOrigin: "top center",
                transformStyle: "preserve-3d",
              }}
              className="absolute top-0 inset-x-0 h-1/2 z-20 pointer-events-none"
            >
              <div
                className="w-full h-full bg-gradient-to-b from-[#F2DFCD] to-[#E3C8B0] shadow-md border-b border-[#C5A059]"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                }}
              />
            </motion.div>

            {/* Golden Wax Seal with Monogram */}
            <AnimatePresence>
              {!isOpened && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 1 }}
                  animate={{ scale: [1, 1.05, 1], opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#801C2E] via-[#A8243C] to-[#581825] border-2 border-[#FFE599] shadow-xl flex items-center justify-center p-1 cursor-pointer">
                    <div className="w-full h-full rounded-full border border-dashed border-[#FFE599]/80 flex flex-col items-center justify-center text-center">
                      <span className="font-cinzel text-xs sm:text-sm font-bold text-[#FFE599]">
                        {weddingData.website.monogram}
                      </span>
                      <Heart className="w-2.5 h-2.5 text-[#FFE599] fill-[#FFE599] mt-0.5" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Emerging Card on Open */}
            <motion.div
              initial={false}
              animate={{
                y: isOpened ? "-70%" : "0%",
                opacity: isOpened ? 1 : 0,
              }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              className="absolute inset-x-4 bottom-2 top-4 bg-[#FFFDF9] rounded-t-xl border border-[#C5A059] shadow-2xl p-4 flex flex-col items-center justify-center text-center z-10"
            >
              <p className="font-cinzel text-xs tracking-widest text-[#801C2E]">
                INSHA ALLAH
              </p>
              <h2 className="font-cinzel text-lg font-bold text-[#2D1A15] mt-1">
                VALIMA CEREMONY
              </h2>
              <p className="font-script text-xl text-[#C5A059] mt-1">
                You Are Cordially Invited
              </p>
            </motion.div>
          </div>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 flex flex-col items-center gap-3 w-full"
        >
          <button
            onClick={handleOpen}
            disabled={isOpened}
            className="w-full max-w-xs py-3.5 px-6 rounded-full font-cinzel text-sm sm:text-base font-semibold tracking-widest uppercase text-[#2D1A15] bg-gradient-to-r from-[#C5A059] via-[#F4E2B2] to-[#B08D57] shadow-lg shadow-[#C5A059]/30 hover:shadow-xl hover:shadow-[#C5A059]/50 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border border-[#FFF3B0]"
          >
            <Sparkles className="w-4 h-4 text-[#801C2E]" />
            <span>{isOpened ? "Opening Sanctuary..." : "Open Your Invitation"}</span>
          </button>

          <button
            onClick={onSkip}
            className="text-xs font-sans-clean text-[#7A6050] hover:text-[#581825] tracking-wider underline-offset-4 hover:underline transition-colors cursor-pointer"
          >
            Skip Intro & View Invitation Directly
          </button>
        </motion.div>
      </div>
    </div>
  );
};
