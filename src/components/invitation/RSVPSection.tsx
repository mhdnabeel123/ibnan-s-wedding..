"use client";

import React, { useState } from "react";
import { weddingData } from "@/data/wedding";
import { SectionHeading } from "../ui/SectionHeading";
import { Send, CheckCircle2, MessageCircle, Heart, Phone, Users } from "lucide-react";

export const RSVPSection: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [guestCount, setGuestCount] = useState("2");
  const [attendance, setAttendance] = useState<"attending" | "declining">("attending");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleWhatsAppRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    const attendanceText =
      attendance === "attending"
        ? "Joyfully Accepts (Will attend with family)"
        : "Regretfully Declines (Warm prayers and wishes)";

    const textLines = [
      `Assalamu Alaikum / Greetings,`,
      ``,
      `We received the blessed Valima invitation for Ibnan Shaik & Tanziya Banu (16th Nov 2026).`,
      ``,
      `*Guest Name:* ${fullName}`,
      `*Attendance:* ${attendanceText}`,
      attendance === "attending" ? `*Total Guests:* ${guestCount}` : null,
      message ? `*Special Wishes:* ${message}` : null,
      ``,
      `Sent via Ibnan & Tanziya Digital Wedding Invitation`,
    ]
      .filter(Boolean)
      .join("\n");

    const encodedText = encodeURIComponent(textLines);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${weddingData.rsvp.whatsappNumber}&text=${encodedText}`;

    // Mark as submitted locally for UI feedback
    setSubmitted(true);
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="rsvp" className="relative w-full py-16 px-4 sm:px-6 flex flex-col items-center">
      <SectionHeading
        subtitle="Honor Us With Your Presence"
        title="We Would Love to Celebrate With You"
        dividerVariant="gold"
      />

      <div className="w-full max-w-xl bg-[#FFFDF9] rounded-2xl sm:rounded-3xl shadow-xl border-2 border-[#D4AF37]/60 p-6 sm:p-9 relative overflow-hidden">
        {submitted ? (
          <div className="text-center py-8 px-4 flex flex-col items-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-300 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-cinzel text-2xl font-bold text-[#581825]">
              Thank You, {fullName}!
            </h3>

            <p className="font-serif-luxury text-base text-[#6B5345] mt-2 max-w-md">
              Your RSVP response has been prepared and sent to the host family. We eagerly anticipate celebrating this blessed milestone with you!
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-xs font-sans-clean font-semibold text-[#801C2E] hover:underline cursor-pointer"
            >
              Update or Send Another Response
            </button>
          </div>
        ) : (
          <form onSubmit={handleWhatsAppRSVP} className="space-y-5">
            {/* Host Contact Line */}
            <div className="p-3 rounded-xl bg-[#FAF4EB] border border-[#C5A059]/40 flex items-center justify-between text-xs text-[#7A6050]">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#801C2E]" />
                <span>Host: <strong className="text-[#3A2218]">{weddingData.rsvp.contactPerson}</strong></span>
              </div>
              <a
                href={`tel:${weddingData.rsvp.phone}`}
                className="font-semibold text-[#801C2E] hover:underline"
              >
                {weddingData.rsvp.phone}
              </a>
            </div>

            {/* Attendance Choice */}
            <div>
              <label className="block font-cinzel text-xs font-bold text-[#581825] uppercase tracking-wider mb-2">
                Will You Be Attending? *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttendance("attending")}
                  className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    attendance === "attending"
                      ? "bg-[#581825] text-white border-[#581825] shadow-md"
                      : "bg-[#FFFDF9] text-[#7A6050] border-[#C5A059]/50 hover:bg-[#FAF4EB]"
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>Joyfully Accepts</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAttendance("declining")}
                  className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    attendance === "declining"
                      ? "bg-[#8C6D58] text-white border-[#8C6D58] shadow-md"
                      : "bg-[#FFFDF9] text-[#7A6050] border-[#C5A059]/50 hover:bg-[#FAF4EB]"
                  }`}
                >
                  <span>Regretfully Declines</span>
                </button>
              </div>
            </div>

            {/* Guest Full Name */}
            <div>
              <label className="block font-cinzel text-xs font-bold text-[#581825] uppercase tracking-wider mb-1.5">
                Your Full Name / Family Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Janab Mohammed & Family"
                className="w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border border-[#C5A059]/60 text-sm text-[#2D1A15] placeholder:text-[#B39D8E] focus:outline-none focus:ring-2 focus:ring-[#801C2E] focus:border-transparent transition-all"
              />
            </div>

            {/* Number of Guests (if attending) */}
            {attendance === "attending" && (
              <div>
                <label className="block font-cinzel text-xs font-bold text-[#581825] uppercase tracking-wider mb-1.5">
                  Number of Guests Attending
                </label>
                <div className="relative">
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#FFFDF9] border border-[#C5A059]/60 text-sm text-[#2D1A15] focus:outline-none focus:ring-2 focus:ring-[#801C2E] appearance-none cursor-pointer"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons</option>
                    <option value="3">3 Persons</option>
                    <option value="4">4 Persons</option>
                    <option value="5">5 Persons</option>
                    <option value="6+">6+ (Family)</option>
                  </select>
                  <Users className="w-4 h-4 text-[#801C2E] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            )}

            {/* Warm Wishes Message */}
            <div>
              <label className="block font-cinzel text-xs font-bold text-[#581825] uppercase tracking-wider mb-1.5">
                Warm Wishes / Blessings (Optional)
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your prayers and congratulatory message for Ibnan & Tanziya..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#C5A059]/60 text-sm text-[#2D1A15] placeholder:text-[#B39D8E] focus:outline-none focus:ring-2 focus:ring-[#801C2E] focus:border-transparent transition-all resize-none"
              />
            </div>

            {/* Submit via WhatsApp Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl font-cinzel text-sm sm:text-base font-semibold tracking-wider text-white bg-gradient-to-r from-[#25D366] via-[#1EBE5D] to-[#128C7E] shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/35 hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Confirm RSVP via WhatsApp</span>
            </button>

            <p className="text-center text-[11px] text-[#8C6D58] font-sans-clean">
              Directly connects with the host on WhatsApp with your prefilled details.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
