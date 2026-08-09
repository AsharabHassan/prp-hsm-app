import {mkdir, writeFile} from "node:fs/promises";
import process from "node:process";

const apiKey = process.env.ELEVENLABS_API_KEY;
const voiceId = process.env.ELEVENLABS_VOICE_ID;

if (!apiKey || !voiceId) {
  throw new Error(
    "Set ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID in your local environment before generating the voiceover.",
  );
}

const text =
  'Hair thinning rarely announces itself. <break time="0.25s" /> It starts with small changes: more scalp showing, less density, a part that looks wider. <break time="0.35s" /> At our doctor-led clinics, clinicians assess the pattern first, then discuss options like P R P or exosome therapy only when appropriate. <break time="0.35s" /> Start privately with one photo. <break time="0.25s" /> In sixty seconds, see the change more clearly and discover the next step. <break time="0.35s" /> Check the change before the gap. <break time="0.25s" /> Start your free analysis now.';

const response = await fetch(
  `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/with-timestamps?output_format=mp3_44100_128`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": apiKey,
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.52,
        similarity_boost: 0.8,
        style: 0.3,
        use_speaker_boost: true,
      },
    }),
  },
);

if (!response.ok) {
  throw new Error(`ElevenLabs failed (${response.status}): ${await response.text()}`);
}

const result = await response.json();

await mkdir(new URL("../public/audio/", import.meta.url), {recursive: true});
await writeFile(
  new URL("../public/audio/elevenlabs-vo-30.mp3", import.meta.url),
  Buffer.from(result.audio_base64, "base64"),
);
await writeFile(
  new URL("../public/audio/elevenlabs-alignment-30.json", import.meta.url),
  JSON.stringify(
    {
      text,
      alignment: result.normalized_alignment ?? result.alignment,
    },
    null,
    2,
  ),
);

console.log("Generated voiceover and character timing alignment");
