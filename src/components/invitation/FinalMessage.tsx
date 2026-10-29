"use client";

import React, { useState } from "react";
import { weddingData } from "@/data/wedding";
import { DecorativeDivider } from "../ui/DecorativeDivider";
import { Heart, Share2, Sparkles, Check, Copy } from "lucide-react";

export const FinalMessage: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: weddingData.website.title,
      text: `${weddingData.ceremony.invitationMessage}\n\nJoin us in celebrating Ibnan & Tanziya on Monday, 16th November 2026 at Hilton Garden, Mysore.`,
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled share
      }
    } else {
      // Fallback copy link
      navigator.clipboard.writeText(shareData.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <footer className="relative w-full pt-16 pb-24 px-4 sm:px-6 flex flex-col items-center text-center bg-gradient-to-t from-[#F5E6D3]/70 via-[#FAF4EB]/40 to-transparent">
      <div className="w-full max-w-2xl flex flex-col items-center">
        {/* Monogram Seal */}
        <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] bg-[#FFFDF9] shadow-lg flex items-center justify-center mb-6">
          <span className="font-cinzel text-xl font-bold text-[#801C2E]">
            {weddingData.website.monogram}
          </span>
        </div>

        {/* Closing Dua & Words */}
        <p className="font-serif-luxury italic text-xl sm:text-2xl text-[#581825] leading-relaxed max-w-lg">
          &ldquo;And of His signs is that He created for you spouses from among yourselves, having created between you love and mercy.&rdquo;
        </p>
        <p className="font-sans-clean text-xs text-[#8C6D58] mt-2">
          Surah Ar-Rum (30:21)
        </p>

        <DecorativeDivider variant="gold" className="my-6" withHeart />

        {/* Family Signature */}
        <div className="space-y-1">
          <p className="font-cinzel text-base sm:text-lg font-bold text-[#581825] tracking-wider">
            {weddingData.groom.parents}
          </p>
          <p className="font-serif-luxury text-sm text-[#8C6D58] tracking-widest uppercase font-medium">
            {weddingData.groom.familyDetails}
          </p>
          <p className="font-script text-2xl text-[#B08D57] pt-2">
            {weddingData.ceremony.bestCompliments}
          </p>
        </div>

        {/* Share Invitation Button */}
        <div className="mt-8">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[#581825] text-white text-xs sm:text-sm font-cinzel font-semibold tracking-wider hover:bg-[#801C2E] shadow-lg shadow-[#581825]/20 hover:shadow-xl transition-all cursor-pointer active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Invitation Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#FFE599]" />
                <span>Share Invitation with Family</span>
              </>
            )}
          </button>
        </div>

        {/* Hashtag & Copyright */}
        <div className="mt-12 pt-6 border-t border-[#C5A059]/30 text-xs text-[#9E8270] font-sans-clean flex flex-col items-center gap-1.5">
          <p className="font-cinzel font-semibold text-[#801C2E] tracking-widest">
            {weddingData.website.hashtag}
          </p>
          <p className="text-[11px]">
            Designed with love & prayers for Ibnan & Tanziya
          </p>
        </div>
      </div>
    </footer>
  );
};
