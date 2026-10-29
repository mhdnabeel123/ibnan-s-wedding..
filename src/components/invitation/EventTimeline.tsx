"use client";

import React from "react";
import { weddingData, WeddingEvent } from "@/data/wedding";
import { SectionHeading } from "../ui/SectionHeading";
import { generateGoogleCalendarUrl } from "@/lib/calendar";
import { Calendar, Clock, MapPin, Sparkles, Navigation, CalendarPlus } from "lucide-react";

export const EventTimeline: React.FC = () => {
  return (
    <section className="relative w-full py-16 px-4 sm:px-6 flex flex-col items-center">
      <SectionHeading
        subtitle="Celebration Itinerary"
        title="Wedding Events"
        dividerVariant="gold"
      />

      <div className="w-full max-w-3xl flex flex-col gap-8 relative">
        {/* Vertical Timeline Guide for Desktop */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#C5A059]/10 via-[#C5A059]/40 to-[#C5A059]/10 -translate-x-1/2" />

        {weddingData.events.map((event: WeddingEvent, idx: number) => {
          const isMain = event.isMainEvent;
          return (
            <div
              key={event.id}
              className={`relative flex flex-col md:flex-row items-center gap-6 ${
                idx % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Event Card */}
              <div
                className={`w-full md:w-[46%] rounded-2xl p-6 sm:p-7 shadow-xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                  isMain
                    ? "bg-gradient-to-br from-[#FFFDF9] via-[#FAF4EB] to-[#F7ECE0] border-[#D4AF37] ring-1 ring-[#D4AF37]/50"
                    : "bg-[#FFFDF9] border-[#C5A059]/40"
                }`}
              >
                {/* Main Event Badge */}
                {isMain && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#581825] text-[#FFE599] text-[11px] font-cinzel font-semibold tracking-widest uppercase mb-3 shadow-sm">
                    <Sparkles className="w-3 h-3 text-[#FFE599]" />
                    <span>Grand Celebration</span>
                  </div>
                )}

                {/* Event Title */}
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#581825]">
                  {event.name}
                </h3>
                {event.subtitle && (
                  <p className="font-script text-xl text-[#B08D57] -mt-1 mb-2">
                    {event.subtitle}
                  </p>
                )}

                {/* Description */}
                {event.description && (
                  <p className="font-serif-luxury text-sm text-[#6B5345] leading-relaxed my-3">
                    {event.description}
                  </p>
                )}

                {/* Details List */}
                <div className="space-y-2 mt-4 pt-4 border-t border-[#C5A059]/30 text-xs sm:text-sm text-[#3A2218]">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#801C2E] shrink-0" />
                    <span className="font-semibold text-[#581825]">{event.date}</span>
                    <span className="text-[#8C6D58]">({event.dayOfWeek})</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#801C2E] shrink-0" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#801C2E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#2D1A15]">{event.venue}</strong>
                      <span className="text-xs text-[#7A6050]">{event.address}</span>
                    </div>
                  </div>

                  {event.dressCode && (
                    <div className="flex items-center gap-2.5 text-xs text-[#8C6D58] pt-1">
                      <span className="font-semibold text-[#581825]">Attire:</span>
                      <span>{event.dressCode}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-5 pt-3 border-t border-[#C5A059]/20 flex flex-wrap gap-2">
                  <a
                    href={event.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#581825] text-white text-xs font-cinzel font-medium hover:bg-[#801C2E] transition-colors cursor-pointer shadow-sm"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Directions</span>
                  </a>

                  <a
                    href={generateGoogleCalendarUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF4EB] text-[#581825] border border-[#C5A059]/50 text-xs font-cinzel font-medium hover:bg-[#F5E6D3] transition-colors cursor-pointer shadow-sm"
                  >
                    <CalendarPlus className="w-3.5 h-3.5" />
                    <span>Add to Calendar</span>
                  </a>
                </div>
              </div>

              {/* Timeline Center Dot on Desktop */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-[#D4AF37] bg-[#FFFDF9] shadow-md items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-[#801C2E]" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
