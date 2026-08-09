// TEMPORARY dev-only visual preview of the report with fixture data.
// Delete before production deploy.
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ReportView from "@/components/report/ReportView";
import type { AnalysisResultT } from "@/lib/schema";

const FIXTURE: AnalysisResultT = {
  photoQualityOk: true,
  retakeInstruction: "",
  scale: "norwood",
  stageEstimate: "Norwood 2–3",
  stageNumeric: 2.5,
  confidence: "moderate",
  zones: [
    {
      zone: "hairline",
      recession: "mild",
      marker: { x: 0.5, y: 0.24 },
      note: "The frontal hairline holds a broadly juvenile shape with early softening at the corners.",
    },
    {
      zone: "left_temple",
      recession: "moderate",
      marker: { x: 0.7, y: 0.28 },
      note: "Visible recession with finer, wispier hairs at the leading edge — a sign of active miniaturisation.",
    },
    {
      zone: "right_temple",
      recession: "mild",
      marker: { x: 0.3, y: 0.28 },
      note: "Slightly less recession than the left, with mixed hair caliber.",
    },
    {
      zone: "mid_scalp",
      recession: "none",
      marker: { x: 0.5, y: 0.12 },
      note: "Good visible density behind the hairline.",
    },
  ],
  hairQuality: {
    density: "fair",
    miniaturization: "early",
    caliber: "mixed",
    summary:
      "Mixed hair caliber along the hairline with fine regrowth hairs at both temples — follicles that are weakened but still active, which is the pattern that typically responds best to growth-factor treatment.",
  },
  candidacy: "good",
  candidacyScore: 78,
  personalizedNarrative:
    "Your photo shows early recession concentrated at the temples, with the left side slightly ahead of the right. The important detail is the fine, wispy hairs still visible along the leading edge — these come from follicles that are miniaturised but alive.\n\nBecause those follicles are still active, they can respond to the concentrated growth factors in PRP and exosome therapy — PDGF, VEGF and IGF-1 — which signal the follicle to re-enter its growth cycle and produce thicker, stronger hair over time.\n\nFor your stage, a sensible next step is a free consultation where a clinician examines your scalp under magnification and confirms whether a three-session protocol is right for you. In suitable candidates, a visible response is usually seen from around three months.",
  headline: "Early temple recession with active miniaturisation",
};

export default function DevPreview() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-lg px-4 pb-16">
        <ReportView analysis={FIXTURE} location="london" photoDataUrl="/guide/guide-man-correct.webp" />
      </main>
    </>
  );
}
