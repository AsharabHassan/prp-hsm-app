"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDES = [
  {
    img: "/guide/guide-man-correct.webp",
    good: true,
    caption: "Sweep your hair back — get your hairline close to the camera",
  },
  {
    img: "/guide/guide-woman-correct.webp",
    good: true,
    caption: "Hold your hair up so the hairline fills the frame",
  },
  {
    img: "/guide/guide-wrong.webp",
    good: false,
    caption: "Too far away, hair covering the hairline — we can't assess this",
  },
];

export default function PhotoGuide() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      3200
    );
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[active];

  return (
    <div>
      <div className="relative mx-auto aspect-[4/5] w-56 overflow-hidden rounded-2xl border border-line sm:w-64">
        {SLIDES.map((s, i) => (
          <Image
            key={s.img}
            src={s.img}
            alt={s.caption}
            fill
            sizes="256px"
            priority={i === 0}
            className={`object-cover transition-opacity duration-700 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <span
          className={`absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-bold ${
            slide.good
              ? "bg-gold text-black-rich"
              : "bg-red-500/90 text-white"
          }`}
          aria-hidden
        >
          {slide.good ? "✓" : "✕"}
        </span>
      </div>

      <p
        className="mt-3 min-h-10 text-center text-sm text-ink"
        aria-live="polite"
      >
        {slide.caption}
      </p>

      <div className="mt-1 flex justify-center gap-1.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.img}
            onClick={() => setActive(i)}
            aria-label={`Example ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === active ? "w-6 bg-gold" : "w-1.5 bg-line"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
