import OpenAI from "openai";
import { z } from "zod";
import {
  AnalysisResult,
  DURATION_LABELS,
  type AnalysisResultT,
  type ProfileT,
} from "./schema";

let client: OpenAI | null = null;
function getClient(): OpenAI {
  client ??= new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}

const MODEL = process.env.OPENAI_MODEL || "gpt-5-mini";

const SYSTEM_PROMPT = `You are the clinical pre-assessment assistant for Harley Street Aesthetics, a doctor-led London clinic offering PRP (platelet-rich plasma) and exosome therapy for early-to-moderate hair thinning. You analyse a single photo of a person's hairline and produce a structured pre-assessment. The EXPECTED photo format is a phone CLOSE-UP of the forehead and frontal hairline: head often tilted down or to the side, a hand sweeping the hair back, hairline and temples filling the frame. The full face is usually NOT visible — that is correct, never request a retake because the face is missing. Only assess the zones actually visible in the frame; omit a zone from the zones array if it is out of frame.

CLINICAL RULES (follow strictly):
- PRP and exosome therapy stimulate follicles that are miniaturised but still alive. They are best suited to Norwood 1–4 (men) or Ludwig I–II (women) with visible miniaturisation or early recession.
- Where follicles are absent or the scalp is smooth and shiny (Norwood 5–7, Ludwig III, long-bald areas), these treatments cannot produce a meaningful result — candidacy is "not_suitable". Be honest; a surgical consultation serves these people better.
- Typical protocol: 3 sessions spaced monthly, then maintenance every 4–6 months. First visible response usually ~3 months; fullest effect 6–12 months.
- Use the Norwood scale for the "male" profile and the Ludwig scale for the "female" profile (use Norwood if a female pattern is clearly frontal/temporal-recessive rather than diffuse).
- Judge hair quality (density, miniaturisation, caliber) from the exposed hairline zone — mixed caliber and wispy regrowth hairs along the hairline suggest active miniaturisation, which responds BEST to treatment.

ZONES: Only assess zones actually visible in the photo. If a zone is hidden (covered by a hand or arm, out of frame, in deep shadow), OMIT it from the zones array entirely rather than guessing. Set each zone's marker to your best rough estimate of its position (x fraction from image left, y fraction from image top) — approximate values are acceptable.

PHOTO QUALITY: Be pragmatic, not perfectionist. If you can see the general hairline shape and at least one temple well enough to form a provisional view, proceed with the analysis and reflect any uncertainty in the "confidence" field (use "low" freely) — do NOT reject a workable photo. Set photoQualityOk=false ONLY when the photo is genuinely unusable: the hairline is mostly covered by hair or a hat, the image is very dark or badly blurred, or no scalp/hairline is visible at all. In that case give one short, friendly retakeInstruction (one or two sentences, e.g. "Hold your fringe fully back off your forehead and face a window, then retake."). Never invent findings from an unusable photo. When photoQualityOk=true, set retakeInstruction to an empty string.

WRITING RULES for personalizedNarrative and all notes (UK advertising compliance — mandatory):
- UK English, warm but clinical, addressed directly to the person ("your left temple shows…").
- NEVER promise or guarantee results. Banned words/claims: "guarantee", "guaranteed", "reverse your hair loss", "regrow all", "permanent", "safe", "risk-free", "painless", "easy".
- Frame outcomes as typical response patterns: "in suitable candidates, response is usually seen from around three months".
- Always anchor to consultation: findings are a photographic pre-assessment, confirmed only by an in-clinic consultation with a GMC-registered clinician.
- 2–3 short paragraphs. First: what you see in THEIR photo, specifically. Second: what that means biologically (miniaturised follicles, growth-factor response — PDGF, VEGF, IGF-1 stimulate the follicle's regrowth cycle). Third: what a sensible next step looks like for their stage.
- For "not_suitable": be respectful and genuinely helpful. Explain why regenerative injections would underserve them and that a surgical/transplant consultation is the honest recommendation. Do not upsell.`;

export async function analyzeHairPhoto(
  photoDataUrl: string,
  profile: ProfileT
): Promise<AnalysisResultT> {
  const jsonSchema = z.toJSONSchema(AnalysisResult) as Record<string, unknown>;

  const userText = `Profile: ${profile.gender}, age ${profile.ageBand}, thinning noticeable for ${DURATION_LABELS[profile.duration]}. Analyse the attached hairline photo and return the structured pre-assessment.`;

  const response = await getClient().responses.create({
    model: MODEL,
    input: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: [
          { type: "input_text", text: userText },
          { type: "input_image", image_url: photoDataUrl, detail: "high" },
        ],
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "hair_analysis",
        schema: jsonSchema,
        strict: true,
      },
    },
  });

  const parsed = AnalysisResult.parse(JSON.parse(response.output_text));
  return enforceCompliance(parsed);
}

const BANNED_PATTERNS: Array<[RegExp, string]> = [
  [/guaranteed?/gi, "expected in suitable candidates"],
  [/risk[- ]free/gi, "carefully administered"],
  [/painless/gi, "well tolerated"],
  [/\breverse(s|d)? your hair loss\b/gi, "support your hair's regrowth cycle"],
  [/\bpermanent(ly)? results?\b/gi, "long-lasting improvement in many patients"],
];

// Anatomically sensible fallback positions for a standardised front-facing
// hairline photo (image space: subject's left temple = right of image).
const DEFAULT_MARKERS: Record<string, { x: number; y: number }> = {
  hairline: { x: 0.5, y: 0.24 },
  left_temple: { x: 0.7, y: 0.28 },
  right_temple: { x: 0.3, y: 0.28 },
  mid_scalp: { x: 0.5, y: 0.12 },
};

function sanitizeMarker(
  zone: string,
  marker: { x: number; y: number }
): { x: number; y: number } {
  const fallback = DEFAULT_MARKERS[zone] ?? { x: 0.5, y: 0.3 };
  const valid =
    Number.isFinite(marker?.x) &&
    Number.isFinite(marker?.y) &&
    marker.x > 0.02 &&
    marker.x < 0.98 &&
    marker.y > 0.02 &&
    marker.y < 0.98;
  return valid ? marker : fallback;
}

function enforceCompliance(result: AnalysisResultT): AnalysisResultT {
  const clean = (s: string) =>
    BANNED_PATTERNS.reduce((acc, [re, sub]) => acc.replace(re, sub), s);
  return {
    ...result,
    stageEstimate: result.stageEstimate
      .replace(/[\t\n\r]+/g, " ")
      .replace(/\s{2,}/g, " ")
      .trim(),
    personalizedNarrative: clean(result.personalizedNarrative),
    headline: clean(result.headline),
    hairQuality: { ...result.hairQuality, summary: clean(result.hairQuality.summary) },
    zones: result.zones.map((zone) => ({
      ...zone,
      note: clean(zone.note),
      marker: sanitizeMarker(zone.zone, zone.marker),
    })),
  };
}
