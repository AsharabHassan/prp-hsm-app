import { NextResponse } from "next/server";
import { z } from "zod";
import { analyzeHairPhoto } from "@/lib/openai";
import { ProfileSchema } from "@/lib/schema";

export const maxDuration = 120;

const RequestSchema = z.object({
  photoDataUrl: z.string().startsWith("data:image/").max(4_000_000),
  profile: ProfileSchema,
});

export async function POST(request: Request) {
  let body: z.infer<typeof RequestSchema>;
  try {
    body = RequestSchema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const analysis = await analyzeHairPhoto(body.photoDataUrl, body.profile);
    return NextResponse.json({ analysis });
  } catch (err) {
    console.error("analyze failed:", err);
    return NextResponse.json(
      { error: "Analysis is temporarily unavailable. Please try again in a moment." },
      { status: 502 }
    );
  }
}
