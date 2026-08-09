"use client";

import { useState } from "react";
import type { AnalysisResultT, ProfileT } from "@/lib/schema";
import type { ClinicLocation } from "@/lib/webhooks";

export default function TeaserGate({
  analysis,
  profile,
  photoDataUrl,
  onUnlocked,
}: {
  analysis: AnalysisResultT;
  profile: ProfileT;
  photoDataUrl: string;
  onUnlocked: (location: ClinicLocation) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState<ClinicLocation>("london");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      // One event ID shared by the browser pixel and the GHL webhook so
      // Meta deduplicates the browser and server (CAPI) Lead events.
      const metaEventId =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const cookie = (name: string) =>
        document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1];

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          location,
          marketingConsent: consent,
          profile,
          analysis,
          photoDataUrl,
          sourceUrl: window.location.href,
          metaEventId,
          fbp: cookie("_fbp"),
          fbc: cookie("_fbc"),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      // Browser-side Meta Lead event with the shared eventID.
      const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
      if (fbq) {
        fbq(
          "track",
          "Lead",
          {
            content_name: "hair-analysis-report",
            content_category: analysis.candidacy,
          },
          { eventID: metaEventId }
        );
      }

      onUnlocked(location);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-black-soft px-4 py-3.5 text-base text-ink placeholder:text-muted/60 focus:border-gold focus:outline-none";

  return (
    <section className="fade-in-up pt-10">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">
        Analysis complete
      </p>
      <h1 className="mt-3 text-3xl leading-snug">Your report is ready</h1>

      {/* Teaser: real headline, blurred detail behind */}
      <div className="relative mt-6 overflow-hidden rounded-2xl border border-line bg-black-soft">
        <div className="border-b border-line p-5">
          <p className="text-xs uppercase tracking-widest text-muted">
            Key finding
          </p>
          <p className="mt-1 font-serif text-lg text-gold-light">
            {analysis.headline}
          </p>
        </div>
        <div className="relative p-5">
          <div className="space-y-2 blur-sm select-none" aria-hidden>
            <div className="h-3 w-11/12 rounded bg-ink/20" />
            <div className="h-3 w-9/12 rounded bg-ink/20" />
            <div className="h-3 w-10/12 rounded bg-ink/20" />
            <div className="h-3 w-7/12 rounded bg-ink/20" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full border border-gold/60 bg-black-rich/85 px-4 py-2 text-xs uppercase tracking-widest text-gold">
              Unlock your full report below
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={submit} className="mt-6 space-y-3">
        <input
          className={inputClass}
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
          minLength={2}
        />
        <input
          className={inputClass}
          type="tel"
          placeholder="Mobile number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          required
          minLength={7}
        />
        <input
          className={inputClass}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <div className="grid grid-cols-2 gap-3">
          {(["london", "glasgow"] as const).map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => setLocation(loc)}
              className={`rounded-xl border px-4 py-3.5 text-sm capitalize transition ${
                location === loc
                  ? "border-gold bg-gold/15 text-gold-light"
                  : "border-line bg-black-soft text-muted hover:border-gold/50"
              }`}
            >
              {loc === "london" ? "London clinic" : "Glasgow clinic"}
            </button>
          ))}
        </div>

        <label className="flex items-start gap-3 pt-1 text-xs leading-relaxed text-muted">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#d4af37]"
          />
          I&apos;m happy for Harley Street Aesthetics to contact me about my
          results and suitable treatments.
        </label>

        {error && (
          <p role="alert" className="text-sm text-gold-light">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="luxury-glow w-full rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-black-rich transition hover:bg-gold-dark disabled:opacity-60"
        >
          {submitting ? "Unlocking…" : "Show my full report"}
        </button>
      </form>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Your details and photo are held securely by our clinical team and used
        only to prepare and discuss your assessment. We never sell your data.
      </p>
    </section>
  );
}
