import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { DURATION_LABELS, LeadSchema } from "@/lib/schema";
import { getWebhookUrl } from "@/lib/webhooks";

export const maxDuration = 60;

export async function POST(request: Request) {
  let lead;
  try {
    lead = LeadSchema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // 1) Store the photo so the clinician sees what was analysed.
  let photoUrl = "";
  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const base64 = lead.photoDataUrl.split(",")[1];
      const buffer = Buffer.from(base64, "base64");
      const blob = await put(
        `hair-analysis/${Date.now()}-${lead.name.replace(/\W+/g, "-").toLowerCase()}.jpg`,
        buffer,
        { access: "public", contentType: "image/jpeg" }
      );
      photoUrl = blob.url;
    }
  } catch (err) {
    console.error("blob upload failed (continuing without photo):", err);
  }

  const { analysis, profile } = lead;
  const qualified = analysis.candidacy !== "not_suitable";
  const payload = {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    location: lead.location,
    source: "prp-hair-analysis-app",
    source_url: lead.sourceUrl,
    submitted_at: new Date().toISOString(),
    tags: ["prp-hair-lead", qualified ? "qualified" : "disqualified", lead.location].join(","),
    marketing_consent: lead.marketingConsent ? "yes" : "no",
    gender: profile.gender,
    age_band: profile.ageBand,
    thinning_duration: DURATION_LABELS[profile.duration],
    candidacy: analysis.candidacy,
    candidacy_score: analysis.candidacyScore,
    stage_estimate: analysis.stageEstimate,
    analysis_headline: analysis.headline,
    hair_quality_summary: analysis.hairQuality.summary,
    report_summary: analysis.personalizedNarrative,
    photo_url: photoUrl,
  };

  // 2) Deliver the lead to GoHighLevel. If no webhook is configured yet,
  // log the lead and let the funnel continue so the report is never blocked.
  const webhookUrl = getWebhookUrl(lead.location);
  if (!webhookUrl) {
    console.warn(
      "⚠ GHL webhook NOT configured — lead logged only, not delivered:",
      JSON.stringify(payload)
    );
    return NextResponse.json({ ok: true, qualified, delivered: false });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`GHL responded ${res.status}`);
  } catch (err) {
    console.error("GHL webhook failed:", err);
    return NextResponse.json(
      { error: "We could not save your details. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, qualified, delivered: true });
}
