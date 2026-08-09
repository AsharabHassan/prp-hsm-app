"use client";

import { useState } from "react";
import type { AnalysisResultT } from "@/lib/schema";

const ZONE_LABELS: Record<string, string> = {
  hairline: "Hairline",
  left_temple: "Left temple",
  right_temple: "Right temple",
  mid_scalp: "Mid-scalp",
};

const RECESSION_LABELS: Record<string, string> = {
  none: "No visible recession",
  mild: "Mild",
  moderate: "Moderate",
  significant: "Significant",
  advanced: "Advanced",
};

export default function PhotoMap({
  photoDataUrl,
  zones,
}: {
  photoDataUrl: string;
  zones: AnalysisResultT["zones"];
}) {
  const [selected, setSelected] = useState(0);
  const zone = zones[selected];

  return (
    <div>
      <div className="relative mx-auto w-64 overflow-hidden rounded-2xl border border-gold/40 sm:w-72">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photoDataUrl} alt="Your analysed hairline photo" className="block w-full" />
      </div>

      {/* Zone chips */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {zones.map((z, i) => (
          <button
            key={z.zone}
            onClick={() => setSelected(i)}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              i === selected
                ? "border-gold bg-gold/15 text-gold-light"
                : "border-line text-muted hover:border-gold/50"
            }`}
          >
            {ZONE_LABELS[z.zone] ?? z.zone}
          </button>
        ))}
      </div>

      {/* Selected finding */}
      {zone && (
        <div
          key={zone.zone}
          className="fade-in-up mt-4 rounded-xl border-l-2 border-gold bg-black-rich p-4"
        >
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-semibold text-ink">
              {ZONE_LABELS[zone.zone] ?? zone.zone}
            </p>
            <p className="text-xs uppercase tracking-wider text-gold-light">
              {RECESSION_LABELS[zone.recession] ?? zone.recession}
            </p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">{zone.note}</p>
        </div>
      )}

      <p className="mt-3 text-center text-[11px] text-muted">
        Select an area to see what we found there
      </p>
    </div>
  );
}
