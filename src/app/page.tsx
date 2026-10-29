"use client";

import React, { useState } from "react";
import { WeddingEnvelope } from "@/components/invitation/WeddingEnvelope";
import { RoyalCurtains } from "@/components/invitation/RoyalCurtains";
import { InvitationCard } from "@/components/invitation/InvitationCard";
import { ScratchReveal } from "@/components/invitation/ScratchReveal";
import { WeddingCountdown } from "@/components/invitation/WeddingCountdown";
import { EventTimeline } from "@/components/invitation/EventTimeline";
import { VenueSection } from "@/components/invitation/VenueSection";
import { RSVPSection } from "@/components/invitation/RSVPSection";
import { FinalMessage } from "@/components/invitation/FinalMessage";
import { MusicToggle } from "@/components/invitation/MusicToggle";
import { soundEngine } from "@/lib/sound";

export default function WeddingPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [curtainsOpened, setCurtainsOpened] = useState(false);

  const handleOpenEnvelope = () => {
    setHasStarted(true);
    // Give brief moment for card emergence before opening curtains
    setTimeout(() => {
      setCurtainsOpened(true);
    }, 400);
  };

  const handleSkipIntro = () => {
    setHasStarted(true);
    setCurtainsOpened(true);
    soundEngine.startAmbientMusic();
  };

  return (
    <main className="min-h-screen w-full bg-[#FFFDF9] relative selection:bg-[#F2BFA9] selection:text-[#581825]">
      {!hasStarted ? (
        <WeddingEnvelope onOpen={handleOpenEnvelope} onSkip={handleSkipIntro} />
      ) : (
        <RoyalCurtains isOpen={curtainsOpened}>
          <div className="relative w-full flex flex-col items-center">
            {/* Main Interactive Wedding Invitation Flow */}
            <InvitationCard />
            <ScratchReveal />
            <WeddingCountdown />
            <EventTimeline />
            <VenueSection />
            <RSVPSection />
            <FinalMessage />

            {/* Floating Audio Controller */}
            <MusicToggle />
          </div>
        </RoyalCurtains>
      )}
    </main>
  );
}
