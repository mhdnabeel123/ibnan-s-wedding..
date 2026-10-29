"use client";

import React from "react";
import { weddingData } from "@/data/wedding";
import { FloralCorner } from "../ui/FloralCorner";
import { DecorativeDivider } from "../ui/DecorativeDivider";
import { MapPin, Clock, Heart } from "lucide-react";
import { motion, type Easing } from "framer-motion";

const EASE_OUT: Easing = "easeOut";

/* ── animation helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, ease: EASE_OUT, delay },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.88 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: EASE_OUT, delay },
});

export const InvitationCard: React.FC = () => {
  return (
    <section className="relative w-full py-12 px-3 sm:px-6 md:px-8 flex flex-col items-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-gradient-to-b from-[#F5E6D3]/30 via-[#FDFBF7] to-[#F5E6D3]/30 rounded-3xl blur-2xl pointer-events-none" />

      {/* Main Wedding Invitation Card Box */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: EASE_OUT }}
        className="relative z-10 w-full max-w-2xl bg-[#FFFDF9] rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-[#D4AF37]/60 p-5 sm:p-8 md:p-12 overflow-hidden transition-shadow duration-500 hover:shadow-[0_25px_60px_rgba(197,160,89,0.25)]"
      >
        {/* Subtle Watermark Monogram Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.035]">
          <span className="font-cinzel text-[180px] sm:text-[240px] font-bold text-[#801C2E]">
            {weddingData.website.monogram}
          </span>
        </div>

        {/* Four Corner Floral Embellishments */}
        <FloralCorner position="top-left" className="absolute top-2 left-2 text-[#C5A059]" size={72} />
        <FloralCorner position="top-right" className="absolute top-2 right-2 text-[#C5A059]" size={72} />
        <FloralCorner position="bottom-left" className="absolute bottom-2 left-2 text-[#C5A059]" size={72} />
        <FloralCorner position="bottom-right" className="absolute bottom-2 right-2 text-[#C5A059]" size={72} />

        {/* Inner Delicate Inset Border */}
        <div className="border border-[#C5A059]/40 rounded-xl p-4 sm:p-6 md:p-8 relative">

          {/* Top Arabic Bismillah Calligraphy */}
          <motion.div {...fadeIn(0.1)} className="text-center mb-4">
            <p className="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#581825] tracking-wide">
              {weddingData.ceremony.bismillahArabic}
            </p>
            <p className="font-serif-luxury italic text-xs sm:text-sm text-[#7A6050] mt-1 tracking-wider">
              {weddingData.ceremony.bismillahEnglish}
            </p>
          </motion.div>

          <DecorativeDivider variant="maroon" className="my-3 opacity-75" />

          {/* Host Information */}
          <motion.div {...fadeUp(0.2)} className="text-center my-4">
            <p className="font-cinzel text-base sm:text-lg md:text-xl font-bold tracking-wider text-[#581825]">
              {weddingData.groom.parents}
            </p>
            {weddingData.groom.familyDetails && (
              <p className="font-serif-luxury text-xs sm:text-sm text-[#8C6D58] tracking-widest uppercase mt-0.5 font-medium">
                {weddingData.groom.familyDetails}
              </p>
            )}
            <p className="font-sans-clean text-[11px] sm:text-xs text-[#9E8270] mt-0.5">
              Cell : {weddingData.rsvp.phone}
            </p>
          </motion.div>

          {/* Cordial Invitation Text */}
          <motion.div {...fadeUp(0.3)} className="text-center max-w-lg mx-auto my-5">
            <p className="font-serif-luxury text-base sm:text-lg md:text-xl text-[#3A2218] leading-relaxed italic">
              &ldquo;{weddingData.ceremony.invitationMessage}&rdquo;
            </p>
          </motion.div>

          {/* Groom Section */}
          <motion.div {...scaleIn(0.35)} className="text-center my-6">
            <div className="inline-block relative">
              <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#B08D57] drop-shadow-sm font-normal py-1">
                {weddingData.groom.firstName} Shaik
                {weddingData.groom.qualification && (
                  <span className="font-serif-luxury text-base sm:text-lg text-[#B08D57] ml-2 font-semibold">
                    {weddingData.groom.qualification}
                  </span>
                )}
              </h2>
            </div>

            <div className="mt-2 space-y-1 text-xs sm:text-sm font-serif-luxury text-[#6B5345]">
              {weddingData.groom.paternalGrandfather && (
                <p>
                  <span className="text-[#8C6D58]">Paternal Grand S/o:</span>{" "}
                  <span className="font-semibold text-[#3A2218]">{weddingData.groom.paternalGrandfather}</span>
                </p>
              )}
              {weddingData.groom.maternalGrandfather && (
                <p>
                  <span className="text-[#8C6D58]">Maternal Grand S/o:</span>{" "}
                  <span className="font-semibold text-[#3A2218]">{weddingData.groom.maternalGrandfather}</span>
                </p>
              )}
            </div>
          </motion.div>

          {/* Elegant "and" Separator */}
          <motion.div
            {...fadeIn(0.45)}
            className="flex items-center justify-center gap-3 my-4"
          >
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF4EB] border border-[#C5A059]/40"
            >
              <Heart className="w-3.5 h-3.5 text-[#801C2E] fill-[#801C2E]" />
              <span className="font-script text-xl sm:text-2xl text-[#801C2E]">and</span>
              <Heart className="w-3.5 h-3.5 text-[#801C2E] fill-[#801C2E]" />
            </motion.div>
            <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
          </motion.div>

          {/* Bride Section */}
          <motion.div {...scaleIn(0.5)} className="text-center my-6">
            <div className="inline-block relative">
              <h2 className="font-script text-4xl sm:text-5xl md:text-6xl text-[#B08D57] drop-shadow-sm font-normal py-1">
                {weddingData.bride.firstName} Banu
                {weddingData.bride.qualification && (
                  <span className="font-serif-luxury text-base sm:text-lg text-[#B08D57] ml-2 font-semibold">
                    {weddingData.bride.qualification}
                  </span>
                )}
              </h2>
            </div>

            <div className="mt-2 space-y-1 text-xs sm:text-sm font-serif-luxury text-[#6B5345]">
              {weddingData.bride.parents && (
                <p>
                  <span className="text-[#8C6D58]">D/o:</span>{" "}
                  <span className="font-semibold text-[#3A2218]">{weddingData.bride.parents}</span>
                </p>
              )}
              {weddingData.bride.paternalGrandfather && (
                <p>
                  <span className="text-[#8C6D58]">Grand D/o:</span>{" "}
                  <span className="font-semibold text-[#3A2218]">{weddingData.bride.paternalGrandfather}</span>
                </p>
              )}
            </div>
          </motion.div>

          {/* Insha Allah Badge */}
          <motion.div {...fadeIn(0.55)} className="text-center my-5">
            <motion.span
              whileHover={{ letterSpacing: "0.3em", transition: { duration: 0.3 } }}
              className="inline-block font-cinzel text-xs sm:text-sm tracking-[0.25em] text-[#801C2E] font-bold px-4 py-1 border-y border-[#D4AF37]/50 uppercase cursor-default"
            >
              {weddingData.ceremony.inshaAllahText}
            </motion.span>
          </motion.div>

          {/* Date, Timing & Venue Highlight Bar */}
          <motion.div
            {...scaleIn(0.6)}
            whileHover={{ scale: 1.015, transition: { duration: 0.25 } }}
            className="my-6 p-4 sm:p-5 rounded-xl bg-gradient-to-b from-[#FAF4EB] to-[#F5E6D3]/60 border border-[#D4AF37]/50 text-center"
          >
            {/* Date */}
            <div className="flex flex-wrap items-center justify-center gap-2 font-cinzel text-sm sm:text-base md:text-lg font-bold text-[#581825] uppercase tracking-wider">
              <span>MONDAY</span>
              <span className="text-[#C5A059]">•</span>
              <span className="text-[#B08D57] text-lg sm:text-xl md:text-2xl font-extrabold">16th NOVEMBER</span>
              <span className="text-[#C5A059]">•</span>
              <span>2026</span>
            </div>

            {/* Time */}
            <div className="flex items-center justify-center gap-2 mt-2 font-serif-luxury text-sm sm:text-base text-[#3A2218] font-semibold">
              <Clock className="w-4 h-4 text-[#801C2E]" />
              <span>{weddingData.ceremony.time}</span>
            </div>

            {/* Venue */}
            <div className="mt-3 pt-3 border-t border-[#C5A059]/30">
              <div className="flex items-center justify-center gap-1.5 font-cinzel text-base sm:text-lg font-bold text-[#2D1A15]">
                <MapPin className="w-4 h-4 text-[#801C2E]" />
                <span>{weddingData.ceremony.venueName}</span>
              </div>
              <p className="font-serif-luxury text-xs sm:text-sm text-[#6B5345] mt-1 max-w-md mx-auto">
                {weddingData.ceremony.venueAddress}
              </p>
            </div>
          </motion.div>

          {/* Emotional Invitation Tagline & Best Compliments */}
          <motion.div {...fadeUp(0.7)} className="text-center pt-2 pb-1">
            <p className="font-script text-xl sm:text-2xl text-[#801C2E]">
              &ldquo;{weddingData.ceremony.tagline}&rdquo;
            </p>
            <p className="font-serif-luxury text-xs sm:text-sm text-[#8C6D58] mt-2 tracking-wider">
              {weddingData.ceremony.bestCompliments}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
