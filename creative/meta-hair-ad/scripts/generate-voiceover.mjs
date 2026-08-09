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
  'Not bald. <break time="0.6s" /> Not too early. <break time="0.8s" /> If the change is subtle, that may be the point. <break time="0.9s" /> Check the pattern in sixty seconds.';

const response = await fetch(
  `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
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
        stability: 0.46,
        similarity_boost: 0.78,
        style: 0.34,
        use_speaker_boost: true,
      },
    }),
  },
);

if (!response.ok) {
  throw new Error(`ElevenLabs failed (${response.status}): ${await response.text()}`);
}

await mkdir(new URL("../public/audio/", import.meta.url), {recursive: true});
await writeFile(
  new URL("../public/audio/elevenlabs-vo.mp3", import.meta.url),
  Buffer.from(await response.arrayBuffer()),
);

console.log("Generated public/audio/elevenlabs-vo.mp3");
