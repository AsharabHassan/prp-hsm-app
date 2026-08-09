"use client";

import { useState } from "react";

type Milestone = {
  fromMonth: number;
  title: string;
  body: string;
};

const MILESTONES: Milestone[] = [
  {
    fromMonth: 1,
    title: "Session 1",
    body: "Concentrated growth factors are delivered into the thinning zones. Your follicles receive their first wake-up signal.",
  },
  {
    fromMonth: 2,
    title: "Session 2",
    body: "The follicles are signalled again while the first cycle is underway. Shedding often starts to settle around now.",
  },
  {
    fromMonth: 3,
    title: "Session 3 · first response",
    body: "Course complete. In suitable candidates, shedding typically slows and fine new hairs start appearing at the hairline.",
  },
  {
    fromMonth: 4,
    title: "Building",
    body: "New hairs gradually thicken as more follicles re-enter their growth cycle. Changes become easier to see month by month.",
  },
  {
    fromMonth: 6,
    title: "Visible improvement",
    body: "Density and hair caliber usually show their clearest gains in this window — this is where photos start to surprise people.",
  },
  {
    fromMonth: 9,
    title: "Peak response",
    body: "The fullest effect of your course. A maintenance session every 4–6 months helps sustain it from here.",
  },
];

function milestoneFor(month: number): Milestone {
  let current = MILESTONES[0];
  for (const m of MILESTONES) {
    if (month >= m.fromMonth) current = m;
  }
  return current;
}

// Deterministic per-bar variation so the strand chart looks organic.
function variation(i: number) {
  return 0.55 + 0.45 * Math.abs(Math.sin(i * 12.9898) * 43758.5453 % 1);
}

const BAR_COUNT = 28;

export default function Timeline() {
  const [month, setMonth] = useState(3);
  const milestone = milestoneFor(month);
  const growth = month / 12;

  return (
    <div>
      {/* Density visualisation — bars grow as the month advances */}
      <div
        className="flex h-20 items-end justify-between gap-[3px]"
        aria-hidden
      >
        {Array.from({ length: BAR_COUNT }, (_, i) => {
          const h = Math.min(100, 12 + 88 * growth * variation(i)).toFixed(2);
          const opacity = (0.35 + 0.65 * growth).toFixed(3);
          return (
            <div
              key={i}
              className="w-full rounded-t-full bg-gold transition-all duration-500"
              style={{ height: `${h}%`, opacity }}
            />
          );
        })}
      </div>
      <p className="mt-1 text-center text-[10px] uppercase tracking-widest text-muted">
        Typical response · illustration only
      </p>

      {/* Month slider */}
      <div className="mt-5">
        <input
          type="range"
          min={1}
          max={12}
          step={1}
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="w-full accent-[#d4af37]"
          aria-label="Month of treatment journey"
        />
        <div className="mt-1 flex justify-between text-[10px] text-muted">
          <span>Month 1</span>
          <span>3</span>
          <span>6</span>
          <span>9</span>
          <span>12</span>
        </div>
      </div>

      {/* Current milestone */}
      <div key={milestone.title} className="fade-in-up mt-4 rounded-xl border-l-2 border-gold bg-black-rich p-4">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-semibold text-gold-light">
            {milestone.title}
          </p>
          <p className="text-xs text-muted">Month {month}</p>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {milestone.body}
        </p>
      </div>

      <p className="mt-3 text-center text-[11px] text-muted">
        Drag the slider to explore your treatment journey
      </p>
    </div>
  );
}
