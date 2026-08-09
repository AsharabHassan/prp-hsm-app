"use client";

import { useEffect, useState } from "react";

const STATUS_LINES = [
  "Locating your hairline and temples…",
  "Mapping temple recession…",
  "Assessing follicle miniaturisation…",
  "Measuring hair density and caliber…",
  "Comparing against clinical scales…",
  "Preparing your personalised report…",
];

export default function AnalyzingStep({ photoDataUrl }: { photoDataUrl: string }) {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setLineIndex((i) => Math.min(i + 1, STATUS_LINES.length - 1)),
      2200
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="fade-in-up pt-10 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">
        Step 3 of 3 · Analysing
      </p>
      <h1 className="mt-3 text-3xl">Reading your hairline</h1>

      <div className="scan-frame luxury-glow mx-auto mt-8 w-64 overflow-hidden rounded-2xl border border-gold/40 sm:w-72">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photoDataUrl}
          alt="Your uploaded hairline photo being analysed"
          className="block w-full"
        />
        <div className="scan-line" aria-hidden />
      </div>

      <p className="pulse-soft mt-8 text-sm text-gold-light" aria-live="polite">
        {STATUS_LINES[lineIndex]}
      </p>
      <p className="mt-2 text-xs text-muted">This usually takes under a minute.</p>
    </section>
  );
}
