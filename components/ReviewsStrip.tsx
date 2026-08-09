"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const REVIEWS = [
  {
    name: "Olivia K.",
    tag: "Full Face Rejuvenation",
    quote:
      "Finally found a clinic that prioritizes safety and elegance. The consultation was thorough and honest. I wouldn't trust anyone else with my face.",
  },
  {
    name: "Sophia Liu",
    tag: "Virtue RF Microneedling",
    quote:
      "Professional, clean, and luxury service. The Glasgow clinic is stunning. Virtue RF changed my skin texture completely after just two sessions.",
  },
  {
    name: "David Mitchell",
    tag: "PLACL Threads",
    quote:
      "I was nervous, but Dr. Vincent was incredible. The results gave me an immediate lift without looking 'pulled'. Highly recommend.",
  },
];

const INTERVAL_MS = 7000;

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

export default function ReviewsStrip() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => {
    setActive(i % REVIEWS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(
      () => setActive((i) => (i + 1) % REVIEWS.length),
      INTERVAL_MS
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, active]);

  const review = REVIEWS[active];

  return (
    <div
      className="review-stage relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ghost quotation mark — the section's scenery */}
      <span className="review-ghost" aria-hidden>
        &ldquo;
      </span>

      <div className="relative z-10 grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
        {/* Left: framing + verification */}
        <div className="flex flex-col justify-between gap-10">
          <div>
            <p className="eyebrow">Patient experience</p>
            <h2 className="section-title mt-5">
              In their own words.
            </h2>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black-rich">
                <GoogleG className="h-4.5 w-4.5" />
              </span>
              <div>
                <p className="text-sm tracking-widest text-[#F4B400]" aria-label="5 out of 5 stars">
                  ★★★★★
                </p>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-muted">
                  Excellent · Verified Google reviews
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-[10px] leading-5 uppercase tracking-[0.14em] text-muted/70">
              Independent reviews · London &amp; Glasgow clinics
            </p>
          </div>
        </div>

        {/* Right: the spotlight quote */}
        <div className="flex min-h-[320px] flex-col justify-between sm:min-h-[360px]">
          <blockquote key={active} className="review-enter">
            <p className="font-serif text-[clamp(1.45rem,3.2vw,2.4rem)] leading-[1.35] tracking-[-0.01em] text-ink">
              &ldquo;{review.quote}&rdquo;
            </p>
            <footer className="mt-9 flex items-center gap-5">
              <span className="h-px w-10 bg-gold/70" aria-hidden />
              <div>
                <p className="text-sm font-semibold tracking-[0.04em] text-gold-light">
                  {review.name}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted">
                  {review.tag} · Verified patient
                </p>
              </div>
            </footer>
          </blockquote>

          {/* Reel counter: timed progress bars */}
          <div className="mt-12 flex items-center gap-6">
            <span className="font-serif text-[11px] tracking-[0.2em] text-white/35" aria-hidden>
              {String(active + 1).padStart(2, "0")} / {String(REVIEWS.length).padStart(2, "0")}
            </span>
            <div className="flex flex-1 gap-2">
              {REVIEWS.map((r, i) => (
                <button
                  key={r.name}
                  onClick={() => goTo(i)}
                  aria-label={`Show review ${i + 1} of ${REVIEWS.length}`}
                  className="group flex h-6 flex-1 items-center"
                >
                  <span className="relative block h-px w-full overflow-hidden bg-white/15 transition-colors group-hover:bg-white/30">
                    {i === active && (
                      <span
                        key={`${active}-${paused}`}
                        className="review-progress absolute inset-y-0 left-0 bg-gold"
                        style={{
                          animationDuration: `${INTERVAL_MS}ms`,
                          animationPlayState: paused ? "paused" : "running",
                        }}
                      />
                    )}
                    {i < active && <span className="absolute inset-0 bg-gold/40" />}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
