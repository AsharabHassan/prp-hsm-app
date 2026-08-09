"use client";

import type { AnalysisResultT } from "@/lib/schema";
import { CALENDAR_URLS, CLINIC_INFO, type ClinicLocation } from "@/lib/webhooks";
import ScoreGauge from "./ScoreGauge";
import StageScale from "./StageScale";
import Timeline from "./Timeline";
import PhotoMap from "./PhotoMap";

const VERDICT_LABELS: Record<AnalysisResultT["candidacy"], string> = {
  excellent: "Excellent candidate",
  good: "Good candidate",
  moderate: "Moderate candidate",
  not_suitable: "Not recommended for PRP / exosomes",
};

const CONSULT_POINTS = [
  "Scalp examined under magnification by a GMC-registered clinician",
  "Your photo findings confirmed and a plan agreed — or ruled out honestly",
  "Free, no obligation, around 20 minutes",
];

function BookingButton({
  calendarUrl,
  phone,
  className,
}: {
  calendarUrl: string;
  phone: string;
  className?: string;
}) {
  const href = calendarUrl || `tel:${phone.replace(/\s/g, "")}`;
  return (
    <a
      href={href}
      className={`inline-block rounded-full bg-gold px-8 py-4 text-center text-sm font-semibold uppercase tracking-wider text-black-rich transition hover:bg-gold-dark ${className ?? ""}`}
    >
      {calendarUrl ? "Book my free consultation" : `Call ${phone}`}
    </a>
  );
}

export default function ReportView({
  analysis,
  location,
  photoDataUrl,
}: {
  analysis: AnalysisResultT;
  location: ClinicLocation;
  photoDataUrl?: string;
}) {
  const qualified = analysis.candidacy !== "not_suitable";
  const calendarUrl = CALENDAR_URLS[location];
  const clinic = CLINIC_INFO[location];
  const paragraphs = analysis.personalizedNarrative
    .split(/\n\s*\n/)
    .filter(Boolean);

  return (
    <article className="fade-in-up pt-10">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">
        Your personalised pre-assessment
      </p>
      <h1 className="mt-3 text-3xl leading-snug">{analysis.headline}</h1>

      {/* Verdict + score */}
      <div className="mt-6 rounded-2xl border border-line bg-black-soft p-6 text-center">
        <ScoreGauge score={analysis.candidacyScore} />
        <p
          className={`mx-auto mt-3 inline-block rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-widest ${
            qualified
              ? "border-gold/60 bg-gold/10 text-gold"
              : "border-muted/40 bg-black-rich text-muted"
          }`}
        >
          {VERDICT_LABELS[analysis.candidacy]}
        </p>
        <div className="mt-5 border-t border-line pt-5 text-left">
          <StageScale
            scale={analysis.scale}
            stageNumeric={analysis.stageNumeric}
            stageEstimate={analysis.stageEstimate}
          />
        </div>
      </div>

      {/* Photo evidence — findings pinned on THEIR photo */}
      {photoDataUrl && analysis.zones.length > 0 && (
        <div className="mt-4 rounded-2xl border border-line bg-black-soft p-6">
          <h2 className="text-center text-xl">What we found on your photo</h2>
          <div className="mt-5">
            <PhotoMap photoDataUrl={photoDataUrl} zones={analysis.zones} />
          </div>
        </div>
      )}

      {/* Narrative */}
      <div className="mt-4 rounded-2xl border border-gold/40 bg-black-soft p-6">
        <h2 className="text-xl">What this means for you</h2>
        <div className="mt-3 space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-ink">
              {p}
            </p>
          ))}
        </div>
      </div>

      {qualified ? (
        <>
          {/* PRIMARY BOOKING CTA — right after the verdict, not buried */}
          <div className="luxury-glow mt-4 rounded-2xl border border-gold bg-gold/10 p-6">
            <h2 className="text-center text-2xl">
              The next step takes 20 minutes
            </h2>
            <ul className="mt-4 space-y-2.5">
              {CONSULT_POINTS.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-snug text-ink">
                  <span className="mt-0.5 shrink-0 text-gold">✓</span>
                  {point}
                </li>
              ))}
            </ul>
            <BookingButton
              calendarUrl={calendarUrl}
              phone={clinic.phone}
              className="luxury-glow mt-5 w-full"
            />
            <p className="mt-3 text-center text-xs text-muted">
              {clinic.label} clinic · {clinic.address}
            </p>
          </div>

          {/* Hair quality — one line, the detail lives in the photo map */}
          <div className="mt-4 rounded-2xl border border-line bg-black-soft p-5">
            <p className="text-xs uppercase tracking-widest text-muted">
              Hair quality
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink">
              {analysis.hairQuality.summary}
            </p>
          </div>

          {/* Interactive timeline */}
          <div className="mt-4 rounded-2xl border border-line bg-black-soft p-6">
            <h2 className="text-xl">Your treatment journey</h2>
            <div className="mt-5">
              <Timeline />
            </div>
          </div>

          {/* Pricing + financing */}
          <div className="mt-4 rounded-2xl border border-line bg-black-soft p-6">
            <h2 className="text-xl">Pricing</h2>
            <div className="mt-4 space-y-3">
              <div className="border-b border-line pb-3">
                <div className="flex items-baseline justify-between">
                  <p className="text-sm text-ink">PRP therapy</p>
                  <span className="font-serif text-lg text-gold-light">
                    £399<span className="text-xs text-muted"> /session</span>
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">
                  3-session course £1,099 — or from{" "}
                  <span className="text-gold-light">£92/month</span> interest-free
                </p>
              </div>
              <div>
                <div className="flex items-baseline justify-between">
                  <p className="text-sm text-ink">Exosome therapy</p>
                  <span className="font-serif text-lg text-gold-light">
                    £599<span className="text-xs text-muted"> /session</span>
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">
                  3-session course £1,599 — or from{" "}
                  <span className="text-gold-light">£134/month</span> interest-free
                </p>
              </div>
            </div>
            <p className="mt-4 rounded-xl border border-gold/40 bg-gold/5 px-4 py-3 text-sm leading-relaxed text-ink">
              <span className="text-gold">0% finance available</span> — Klarna
              Pay&nbsp;in&nbsp;3, Clearpay Pay&nbsp;in&nbsp;4, or up to 12 months
              interest-free with Ideal4Finance.
              <span className="text-muted"> Subject to eligibility.</span>
            </p>
          </div>

          {/* Second CTA */}
          <div className="mt-6 text-center">
            <BookingButton
              calendarUrl={calendarUrl}
              phone={clinic.phone}
              className="luxury-glow w-full sm:w-auto"
            />
          </div>

          {/* Sticky mobile booking bar */}
          <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/40 bg-black-rich/95 p-3 backdrop-blur sm:hidden">
            <BookingButton
              calendarUrl={calendarUrl}
              phone={clinic.phone}
              className="w-full"
            />
          </div>
          <div className="h-20 sm:hidden" aria-hidden />
        </>
      ) : (
        <div className="mt-4 rounded-2xl border border-line bg-black-soft p-6">
          <h2 className="text-xl">Our honest recommendation</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            PRP and exosome therapy rely on follicles that are weakened but
            still active — and for your stage they are unlikely to give you a
            result worth your investment. The honest next step is a surgical
            hair-restoration consultation, where a transplant specialist can
            assess you properly. If you&apos;d like, our team can talk this
            through with you — no charge, no obligation.
          </p>
          <a
            href={`tel:${clinic.phone.replace(/\s/g, "")}`}
            className="mt-5 inline-block w-full rounded-full border border-gold px-8 py-3.5 text-center text-sm font-semibold uppercase tracking-wider text-gold transition hover:bg-gold hover:text-black-rich sm:w-auto"
          >
            Call {clinic.phone}
          </a>
        </div>
      )}

      {/* Disclaimer */}
      <footer className="mt-8 border-t border-line pt-5 text-xs leading-relaxed text-muted">
        <p>
          This report is an AI-assisted photographic pre-assessment and not a
          medical diagnosis. Suitability for any treatment can only be
          confirmed at an in-person consultation with a GMC-registered
          clinician. Individual results vary and no outcome can be promised.
          Harley Street Aesthetics · {clinic.address} · {clinic.phone}
        </p>
      </footer>
    </article>
  );
}
