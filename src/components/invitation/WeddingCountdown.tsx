"use client";

import React, { useState, useEffect } from "react";
import { calculateTimeRemaining, CountdownResult } from "@/lib/countdown";
import { generateGoogleCalendarUrl, downloadIcsFile } from "@/lib/calendar";
import { weddingData } from "@/data/wedding";
import { SectionHeading } from "../ui/SectionHeading";
import { CalendarPlus, Download, Sparkles } from "lucide-react";

export const WeddingCountdown: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<CountdownResult>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
    totalMilliseconds: 0,
  });

  useEffect(() => {
    setMounted(true);
    // Initial calculation
    setTimeRemaining(calculateTimeRemaining(weddingData.ceremony.isoDateTime));

    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(weddingData.ceremony.isoDateTime));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeCards = [
    { label: "Days", value: timeRemaining.days },
    { label: "Hours", value: timeRemaining.hours },
    { label: "Minutes", value: timeRemaining.minutes },
    { label: "Seconds", value: timeRemaining.seconds },
  ];

  return (
    <section className="relative w-full py-14 px-4 sm:px-6 flex flex-col items-center bg-gradient-to-b from-transparent via-[#FAF4EB]/60 to-transparent">
      <SectionHeading
        subtitle="With Hearts Full of Anticipation"
        title="Counting Down to Forever"
        dividerVariant="maroon"
      />

      <div className="w-full max-w-xl">
        {timeRemaining.isComplete && mounted ? (
          <div className="p-8 rounded-2xl bg-[#FFFDF9] border-2 border-[#D4AF37] text-center shadow-xl">
            <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
            <h3 className="font-cinzel text-2xl font-bold text-[#581825]">
              Today is the Blessed Celebration!
            </h3>
            <p className="font-serif-luxury text-base text-[#7A6050] mt-2">
              May Allah bless this union with eternal love, harmony, and prosperity.
            </p>
          </div>
        ) : (
          <div>
            {/* 4 Elegant Countdown Cards */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
              {timeCards.map((card, idx) => (
                <div
                  key={idx}
                  className="relative rounded-2xl bg-[#FFFDF9] border border-[#D4AF37]/50 shadow-lg p-3 sm:p-5 flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#D4AF37] hover:-translate-y-1"
                >
                  {/* Subtle Top Gold Highlight */}
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#B08D57] via-[#FFF3B0] to-[#B08D57]" />

                  {/* Value */}
                  <span className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-bold text-[#581825] tracking-tight">
                    {mounted ? String(card.value).padStart(2, "0") : "--"}
                  </span>

                  {/* Label */}
                  <span className="font-sans-clean text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest uppercase text-[#8C6D58] mt-1.5">
                    {card.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Calendar Integration Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={generateGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#581825] text-white text-xs sm:text-sm font-cinzel font-semibold tracking-wider hover:bg-[#801C2E] shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <CalendarPlus className="w-4 h-4 text-[#FFE599]" />
                <span>Add to Google Calendar</span>
              </a>

              <button
                onClick={() => downloadIcsFile()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFFDF9] text-[#581825] text-xs sm:text-sm font-cinzel font-semibold tracking-wider hover:bg-[#F5E6D3] border border-[#D4AF37] shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#B08D57]" />
                <span>Download .ICS (Apple / Outlook)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
