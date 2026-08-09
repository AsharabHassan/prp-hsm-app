"use client";

import { useRef, useState } from "react";
import { compressImage } from "@/lib/compress";
import PhotoGuide from "./PhotoGuide";

export default function PhotoStep({
  onPhoto,
  retakeMessage,
  errorMessage,
}: {
  onPhoto: (dataUrl: string) => void;
  retakeMessage?: string;
  errorMessage?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState("");

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setLocalError("");
    try {
      const dataUrl = await compressImage(file);
      onPhoto(dataUrl);
    } catch {
      setLocalError("We couldn't read that photo. Please try another one.");
    } finally {
      setBusy(false);
    }
  }

  const warning = retakeMessage || errorMessage || localError;

  return (
    <section className="fade-in-up pt-8">
      <p className="text-center text-xs uppercase tracking-[0.3em] text-gold">
        Step 2 of 3 · Your photo
      </p>
      <h1 className="mt-2 text-center text-3xl leading-snug">
        Show us your hairline
      </h1>

      {warning && (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-gold/60 bg-gold/10 px-4 py-3 text-sm text-gold-light"
        >
          {warning}
        </div>
      )}

      <div className="mt-6">
        <PhotoGuide />
      </div>

      <p className="mt-4 text-center text-xs text-muted">
        Hold the phone close — about 20–30&nbsp;cm from your hairline · face the
        light
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      <button
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="luxury-glow mt-6 w-full rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-wider text-black-rich transition hover:bg-gold-dark disabled:opacity-60"
      >
        {busy ? "Preparing photo…" : retakeMessage ? "Retake photo" : "Take my photo"}
      </button>

      <p className="mt-4 text-center text-xs leading-relaxed text-muted">
        Your photo is analysed securely and reviewed only by our clinical team
        before your consultation.
      </p>
    </section>
  );
}
