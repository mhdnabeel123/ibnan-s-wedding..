"use client";

import React, { useState, useEffect } from "react";
import { soundEngine } from "@/lib/sound";
import { Volume2, VolumeX, Music } from "lucide-react";

export const MusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsPlaying(soundEngine.isCurrentlyPlaying());
  }, []);

  const handleToggle = () => {
    const state = soundEngine.toggleMusic();
    setIsPlaying(state);
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? "Mute background music" : "Play background music"}
        className="group relative w-12 h-12 rounded-full bg-[#FFFDF9]/95 backdrop-blur-md border border-[#D4AF37] shadow-xl flex items-center justify-center text-[#581825] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            {/* Animated Equalizer Wavebars */}
            <div className="flex items-end gap-0.5 h-4 w-4">
              <span className="w-1 bg-[#801C2E] rounded-full animate-bounce h-2" />
              <span className="w-1 bg-[#C5A059] rounded-full animate-bounce h-4 [animation-delay:0.15s]" />
              <span className="w-1 bg-[#801C2E] rounded-full animate-bounce h-3 [animation-delay:0.3s]" />
            </div>
            {/* Spinning decorative ring */}
            <div className="absolute -inset-1.5 rounded-full border border-dashed border-[#C5A059]/60 animate-spin [animation-duration:12s] pointer-events-none" />
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-[#8C6D58]" />
        )}
      </button>

      {/* Subtle Tooltip Label */}
      <span className="hidden sm:inline-block text-[11px] font-cinzel font-medium bg-[#FFFDF9]/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#C5A059]/40 text-[#581825] shadow-sm select-none">
        {isPlaying ? "Music On" : "Music Off"}
      </span>
    </div>
  );
};
