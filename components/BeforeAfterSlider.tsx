"use client";

import Image from "next/image";
import { useState } from "react";

export default function BeforeAfterSlider() {
  const [position, setPosition] = useState(52);

  return (
    <div className="comparison-shell">
      <div className="comparison-image" aria-label="Hair regrowth before and after comparison">
        <Image
          src="/results/hair-after.webp"
          alt="After exosome hair regrowth treatment"
          fill
          sizes="(max-width: 768px) 100vw, 760px"
          className="object-cover"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          aria-hidden="true"
        >
          <Image
            src="/results/hair-before.webp"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 760px"
            className="object-cover"
          />
        </div>

        <span className="comparison-label left-4">Before</span>
        <span className="comparison-label right-4">After</span>

        <div className="comparison-divider" style={{ left: `${position}%` }} aria-hidden="true">
          <span className="comparison-handle">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
            </svg>
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="comparison-range"
          aria-label="Drag to compare the before and after images"
        />
      </div>
      <div className="flex items-center justify-between gap-4 px-1 pt-4 text-[10px] uppercase tracking-[0.18em] text-muted">
        <span>Exosome hair regrowth</span>
        <span className="flex items-center gap-2 text-gold-light">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          Drag to compare
        </span>
      </div>
    </div>
  );
}
