"use client";

import React from "react";
import { motion, type Easing } from "framer-motion";

const EASE_OUT: Easing = "easeOut";
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
        {weddingData.events.map((event: WeddingEvent, idx: number) => {
          const isMain = event.isMainEvent;
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: EASE_OUT, delay: idx * 0.12 }}
              className="flex justify-center"
            >
              {/* Event Card */}
              <motion.div
                whileHover={{ y: -6, boxShadow: "0 24px 50px rgba(197,160,89,0.22)" }}
                transition={{ duration: 0.3 }}
                className={`w-full max-w-xl rounded-2xl p-6 sm:p-8 shadow-xl border ${
                  isMain
                    ? "bg-gradient-to-br from-[#FFFDF9] via-[#FAF4EB] to-[#F7ECE0] border-[#D4AF37] ring-1 ring-[#D4AF37]/50"
                    : "bg-[#FFFDF9] border-[#C5A059]/40"
                }`}
              >
                {/* Main Event Badge */}
                {isMain && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.2 }}
                    className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#581825] text-[#FFE599] text-[11px] font-cinzel font-semibold tracking-widest uppercase mb-3 shadow-sm"
                  >
                    <motion.span
                      animate={{ rotate: [0, 20, -20, 0] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    >
                      <Sparkles className="w-3 h-3 text-[#FFE599]" />
                    </motion.span>
                    <span>Grand Celebration</span>
                  </motion.div>
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
                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.25 }}
                    className="flex items-center gap-2.5"
                  >
                    <Calendar className="w-4 h-4 text-[#801C2E] shrink-0" />
                    <span className="font-semibold text-[#581825]">{event.date}</span>
                    <span className="text-[#8C6D58]">({event.dayOfWeek})</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.32 }}
                    className="flex items-center gap-2.5"
                  >
                    <Clock className="w-4 h-4 text-[#801C2E] shrink-0" />
                    <span>{event.time}</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.39 }}
                    className="flex items-start gap-2.5"
                  >
                    <MapPin className="w-4 h-4 text-[#801C2E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#2D1A15]">{event.venue}</strong>
                      <span className="text-xs text-[#7A6050]">{event.address}</span>
                    </div>
                  </motion.div>

                  {event.dressCode && (
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.45 }}
                      className="flex items-center gap-2.5 text-xs text-[#8C6D58] pt-1"
                    >
                      <span className="font-semibold text-[#581825]">Attire:</span>
                      <span>{event.dressCode}</span>
                    </motion.div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-5 pt-3 border-t border-[#C5A059]/20 flex flex-wrap gap-2">
                  <motion.a
                    href={event.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#581825] text-white text-xs font-cinzel font-medium hover:bg-[#801C2E] transition-colors cursor-pointer shadow-sm"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Directions</span>
                  </motion.a>

                  <motion.a
                    href={generateGoogleCalendarUrl(event)}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF4EB] text-[#581825] border border-[#C5A059]/50 text-xs font-cinzel font-medium hover:bg-[#F5E6D3] transition-colors cursor-pointer shadow-sm"
                  >
                    <CalendarPlus className="w-3.5 h-3.5" />
                    <span>Add to Calendar</span>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
