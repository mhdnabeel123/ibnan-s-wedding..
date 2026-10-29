"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { soundEngine } from "@/lib/sound";
import { weddingData } from "@/data/wedding";
import { Sparkles, Calendar, CheckCircle2, RotateCcw } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";

export const ScratchReveal: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const isDrawing = useRef(false);
  const lastNoteTime = useRef(0);

  // Initialize Canvas Gold Foil Layer
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Rich metallic gold gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#B08D57");
    grad.addColorStop(0.3, "#D4AF37");
    grad.addColorStop(0.5, "#FFF3B0");
    grad.addColorStop(0.7, "#AA771C");
    grad.addColorStop(1, "#9B783E");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative foil pattern / border inside canvas
    ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    ctx.lineWidth = 3;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    ctx.strokeStyle = "rgba(100, 60, 20, 0.3)";
    ctx.lineWidth = 1;
    ctx.strokeRect(12, 12, width - 24, height - 24);

    // Stamped Monogram & Text on Foil
    ctx.fillStyle = "#421019";
    ctx.font = "bold 22px 'Cinzel', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ SCRATCH HERE ✦", width / 2, height / 2 - 14);

    ctx.font = "14px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#5A3010";
    ctx.fillText("Rub with finger or mouse to reveal", width / 2, height / 2 + 16);

    setIsRevealed(false);
    setScratchPercent(0);
  }, []);

  useEffect(() => {
    initCanvas();
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, [initCanvas]);

  // Calculate percentage of canvas cleared
  const checkScratchPercentage = useCallback(() => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    // Sample every 4th pixel for speed
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    let transparentPixels = 0;
    const totalSampled = data.length / 16;

    for (let i = 3; i < data.length; i += 16) {
      if (data[i] === 0) {
        transparentPixels++;
      }
    }

    const percent = Math.round((transparentPixels / totalSampled) * 100);
    setScratchPercent(percent);

    // Trigger complete reveal at 40%
    if (percent >= 40 && !isRevealed) {
      triggerFullReveal();
    }
  }, [isRevealed]);

  const triggerFullReveal = () => {
    setIsRevealed(true);
    soundEngine.playSparkleSound();

    // Trigger golden celebration confetti
    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#D4AF37", "#FFE599", "#801C2E", "#F6D6C6", "#B08D57"],
      });
    } catch {
      // ignore
    }
  };

  // Scratch Drawing Logic
  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Play subtle audio note throttled
    const now = Date.now();
    if (now - lastNoteTime.current > 120) {
      soundEngine.playScratchNote();
      lastNoteTime.current = now;
    }

    checkScratchPercentage();
  };

  // Touch Handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    isDrawing.current = false;
  };

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <section className="relative w-full py-14 px-4 sm:px-6 flex flex-col items-center">
      <SectionHeading
        subtitle="An Auspicious Milestone"
        title="Scratch to Reveal the Date"
        dividerVariant="gold"
      />

      <div className="w-full max-w-md flex flex-col items-center">
        {/* Card Container */}
        <div
          ref={containerRef}
          className="relative w-full aspect-[16/9] sm:aspect-[2/1] rounded-2xl sm:rounded-3xl shadow-xl border-2 border-[#D4AF37] overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF4EB] to-[#F5E6D3] p-1 flex items-center justify-center select-none"
        >
          {/* Secret Date Revealed Beneath */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-0 bg-[#FFFDF9]">
            <div className="flex items-center gap-1.5 text-[#801C2E] mb-1">
              <Calendar className="w-4 h-4 text-[#801C2E]" />
              <span className="font-cinzel text-xs font-bold tracking-widest uppercase">
                Save The Auspicious Date
              </span>
            </div>

            <div className="font-cinzel text-2xl sm:text-3xl font-extrabold text-[#581825] tracking-wider my-1">
              {weddingData.ceremony.date}
            </div>

            <p className="font-serif-luxury text-sm text-[#7A6050] font-semibold mt-0.5">
              {weddingData.ceremony.time}
            </p>

            <p className="font-sans-clean text-xs text-[#8C6D58] mt-1">
              {weddingData.ceremony.venueName} • Mysore
            </p>

            {isRevealed && (
              <div className="mt-2 flex items-center gap-1.5 text-emerald-800 text-xs font-semibold animate-bounce">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Date Revealed! Counting down below</span>
              </div>
            )}
          </div>

          {/* HTML5 Scratch Foil Canvas */}
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={`scratch-canvas absolute inset-0 w-full h-full z-10 cursor-pointer rounded-2xl transition-opacity duration-700 ${
              isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            style={{ touchAction: "none" }}
            aria-label="Scratch card canvas to reveal date"
          />
        </div>

        {/* Progress & Controls */}
        <div className="w-full mt-4 flex items-center justify-between text-xs text-[#7A6050] font-sans-clean px-2">
          <span>Cleared: <strong className="text-[#581825]">{isRevealed ? 100 : scratchPercent}%</strong></span>
          
          <div className="flex items-center gap-2">
            {!isRevealed ? (
              <button
                onClick={triggerFullReveal}
                className="inline-flex items-center gap-1 text-[#801C2E] hover:text-[#581825] font-semibold underline underline-offset-2 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Reveal Instantly</span>
              </button>
            ) : (
              <button
                onClick={initCanvas}
                className="inline-flex items-center gap-1 text-[#7A6050] hover:text-[#581825] font-medium transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Scratch Again</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
