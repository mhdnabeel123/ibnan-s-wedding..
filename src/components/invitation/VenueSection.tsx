"use client";

import React, { useState } from "react";
import { weddingData } from "@/data/wedding";
import { SectionHeading } from "../ui/SectionHeading";
import { getGoogleMapsUrl, getAppleMapsUrl } from "@/lib/maps";
import { MapPin, Navigation, Copy, Check, Car, Compass, ExternalLink } from "lucide-react";

export const VenueSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      `${weddingData.ceremony.venueName}, ${weddingData.ceremony.venueAddress}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 flex flex-col items-center">
      <SectionHeading
        subtitle="The Destination"
        title="Where We Celebrate"
        dividerVariant="maroon"
      />

      <div className="w-full max-w-4xl bg-[#FFFDF9] rounded-2xl sm:rounded-3xl shadow-xl border border-[#D4AF37]/60 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Venue Information (Left/Top) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#FFFDF9] via-[#FAF4EB] to-[#F5E6D3]/40 border-b lg:border-b-0 lg:border-r border-[#C5A059]/30">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#581825]/10 text-[#581825] text-xs font-cinzel font-semibold mb-3">
                <Compass className="w-3.5 h-3.5 text-[#801C2E]" />
                <span>Banquet & Reception Venue</span>
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#581825]">
                {weddingData.ceremony.venueName}
              </h3>

              <div className="flex items-start gap-2.5 mt-4 text-[#3A2218]">
                <MapPin className="w-5 h-5 text-[#801C2E] shrink-0 mt-0.5" />
                <p className="font-serif-luxury text-base text-[#6B5345] leading-relaxed">
                  {weddingData.ceremony.venueAddress}
                </p>
              </div>

              {/* Guest Information Badges */}
              <div className="mt-6 space-y-2.5 pt-4 border-t border-[#C5A059]/30 text-xs text-[#7A6050] font-sans-clean">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#801C2E]" />
                  <span>Dedicated parking & valet available for all guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#801C2E]/20 text-[#801C2E] flex items-center justify-center font-bold text-[10px]">
                    ★
                  </span>
                  <span>Conveniently located on Mysore-Bangalore Highway</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-2.5">
              <a
                href={getGoogleMapsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#581825] to-[#801C2E] text-white font-cinzel text-xs sm:text-sm font-semibold tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:from-[#6B1E2D] hover:to-[#962337] transition-all cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-[#FFE599]" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>

              <div className="flex gap-2">
                <a
                  href={getAppleMapsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#FFFDF9] border border-[#C5A059]/60 text-[#581825] font-cinzel text-xs font-semibold hover:bg-[#FAF4EB] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm text-center"
                >
                  <span>Apple Maps</span>
                </a>

                <button
                  onClick={handleCopyAddress}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#FFFDF9] border border-[#C5A059]/60 text-[#581825] font-cinzel text-xs font-semibold hover:bg-[#FAF4EB] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#B08D57]" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Google Map Embed Frame (Right/Bottom) */}
          <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] bg-[#EAE6DF] overflow-hidden">
            <iframe
              title="Hilton Garden Mysore Map"
              src="https://maps.google.com/maps?q=Hilton+Garden+Convention+Centre,+Mysore-Bangalore+Road,+Bannimantap,+Mysore&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[340px] sm:min-h-[420px] border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};
