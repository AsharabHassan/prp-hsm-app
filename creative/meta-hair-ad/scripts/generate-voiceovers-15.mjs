import {mkdir, writeFile} from "node:fs/promises";
import process from "node:process";

const apiKey = process.env.ELEVENLABS_API_KEY;
const voiceId = process.env.ELEVENLABS_VOICE_ID;

if (!apiKey || !voiceId) {
  throw new Error("Set ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID before generating voiceovers.");
}

const variants = [
  {
    id: "check-the-change",
    text: "Hair change rarely announces itself. A private sixty-second photo analysis can organise the visible signs. Then a clinician can discuss options such as P R P or exosome therapy. Check the change. Start free now.",
  },
  {
    id: "no-guesswork",
    text: "P R P? Exosomes? Neither should start with guesswork. Use one private photo for a sixty-second hair analysis, then discuss appropriate options with a clinician. One clearer next step. Analyse free now.",
  },
  {
    id: "clarity-first",
    text: "Before a treatment comes a decision. Before a decision comes clarity. Use one photo to start a private hair analysis, then discuss P R P or exosome therapy with a clinician. Get the free analysis.",
  },
  {
    id: "analysis-howto",
    text: "Take one clear photo. Face the light, hold your hair back, and frame the hairline and thinning area. In around sixty seconds, see the visible pattern and density, then discuss the next step with a clinician. Start free.",
  },
];

const outputDir = new URL("../public/audio/", import.meta.url);
const captionsDir = new URL("../public/captions/", import.meta.url);

await mkdir(outputDir, {recursive: true});
await mkdir(captionsDir, {recursive: true});

const alignmentToCaptions = (alignment) => {
  const characters = alignment.characters;
  const starts = alignment.character_start_times_seconds;
  const ends = alignment.character_end_times_seconds;
  const joined = characters.join("");
  const captions = [];

  for (const match of joined.matchAll(/\s*\S+/g)) {
    const raw = match[0];
    const rawStart = match.index ?? 0;
    const firstSpoken = raw.search(/\S/);
    const startIndex = rawStart + Math.max(0, firstSpoken);
    const endIndex = rawStart + raw.length - 1;

    captions.push({
      text: raw,
      startMs: Math.round(starts[startIndex] * 1000),
      endMs: Math.round(ends[endIndex] * 1000),
      timestampMs: Math.round(starts[startIndex] * 1000),
      confidence: null,
    });
  }

  const merged = [];
  for (let index = 0; index < captions.length; index++) {
    const current = captions[index];
    const next = captions[index + 1];
    const afterNext = captions[index + 2];
    if (
      current?.text.trim() === "P" &&
      next?.text.trim() === "R" &&
      afterNext?.text.trim().replace(/[?.,]/g, "") === "P"
    ) {
      const punctuation = afterNext.text.trim().match(/[?.,]$/)?.[0] ?? "";
      merged.push({
        text: `${current.text.startsWith(" ") ? " " : ""}PRP${punctuation}`,
        startMs: current.startMs,
        endMs: afterNext.endMs,
        timestampMs: current.timestampMs,
        confidence: null,
      });
      index += 2;
      continue;
    }
    merged.push(current);
  }

  return merged;
};

const selectedVariants = process.env.VARIANT_ID
  ? variants.filter((variant) => variant.id === process.env.VARIANT_ID)
  : variants;

if (selectedVariants.length === 0) {
  throw new Error(`Unknown VARIANT_ID: ${process.env.VARIANT_ID}`);
}

for (const variant of selectedVariants) {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/with-timestamps?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text: variant.text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8,
          style: 0.34,
          use_speaker_boost: true,
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`ElevenLabs failed for ${variant.id} (${response.status}): ${await response.text()}`);
  }

  const result = await response.json();
  const alignment = result.normalized_alignment ?? result.alignment;
  if (!alignment) {
    throw new Error(`No timing alignment returned for ${variant.id}`);
  }

  await writeFile(
    new URL(`vo-15-${variant.id}.mp3`, outputDir),
    Buffer.from(result.audio_base64, "base64"),
  );
  await writeFile(
    new URL(`15-${variant.id}.json`, captionsDir),
    JSON.stringify(alignmentToCaptions(alignment), null, 2),
  );
  await writeFile(
    new URL(`vo-15-${variant.id}-alignment.json`, outputDir),
    JSON.stringify({text: variant.text, alignment}, null, 2),
  );

  console.log(`Generated ${variant.id}`);
}
