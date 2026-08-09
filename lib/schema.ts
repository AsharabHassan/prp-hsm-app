import { z } from "zod";

export const ZoneAssessment = z.object({
  zone: z.enum(["hairline", "left_temple", "right_temple", "mid_scalp"]),
  recession: z.enum(["none", "mild", "moderate", "significant", "advanced"]),
  note: z.string(),
  marker: z
    .object({
      x: z.number().describe("0-1, fraction of image width from the LEFT edge"),
      y: z.number().describe("0-1, fraction of image height from the TOP edge"),
    })
    .describe(
      "Approximate centre of this zone as seen IN THE IMAGE (e.g. the subject's left temple usually appears on the RIGHT side of the image)"
    ),
});

export const AnalysisResult = z.object({
  photoQualityOk: z.boolean(),
  retakeInstruction: z
    .string()
    .describe("Only set when photoQualityOk is false — what to fix and retry"),
  scale: z.enum(["norwood", "ludwig"]),
  stageEstimate: z
    .string()
    .describe(
      'Plain ASCII only, e.g. "Norwood 2-3" or "Ludwig I" — a range with a simple hyphen is fine'
    ),
  stageNumeric: z
    .number()
    .describe("Midpoint of the estimated stage, e.g. 2.5 — used for charts"),
  confidence: z.enum(["low", "moderate", "high"]),
  zones: z.array(ZoneAssessment),
  hairQuality: z.object({
    density: z.enum(["good", "fair", "reduced", "sparse"]),
    miniaturization: z.enum(["none_visible", "early", "established", "extensive"]),
    caliber: z.enum(["normal", "mixed", "fine"]),
    summary: z.string(),
  }),
  candidacy: z.enum(["excellent", "good", "moderate", "not_suitable"]),
  candidacyScore: z
    .number()
    .describe("0–100. Excellent 80–95, good 65–79, moderate 45–64, not_suitable below 45"),
  personalizedNarrative: z
    .string()
    .describe(
      "MAX 2 short paragraphs (3 sentences each) addressed to the prospect about THEIR pattern, separated by a blank line. Concise — the report is visual, not an essay."
    ),
  headline: z
    .string()
    .describe("One short sentence summarising the finding, e.g. 'Early temple recession with active miniaturisation'"),
});

export type AnalysisResultT = z.infer<typeof AnalysisResult>;

export const ProfileSchema = z.object({
  gender: z.enum(["male", "female"]),
  ageBand: z.enum(["18-24", "25-34", "35-44", "45-54", "55+"]),
  duration: z.enum(["under_1_year", "1_3_years", "3_5_years", "over_5_years"]),
});

export type ProfileT = z.infer<typeof ProfileSchema>;

export const DURATION_LABELS: Record<ProfileT["duration"], string> = {
  under_1_year: "under 1 year",
  "1_3_years": "1–3 years",
  "3_5_years": "3–5 years",
  over_5_years: "more than 5 years",
};

export const LeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  location: z.enum(["london", "glasgow"]),
  marketingConsent: z.boolean(),
  profile: ProfileSchema,
  analysis: AnalysisResult,
  photoDataUrl: z.string().startsWith("data:image/"),
  sourceUrl: z.string(),
  // Meta attribution: browser pixel fires Lead with this same eventID so
  // GHL's Conversions API event deduplicates against it.
  metaEventId: z.string().optional(),
  fbp: z.string().optional(),
  fbc: z.string().optional(),
});

export type LeadT = z.infer<typeof LeadSchema>;
