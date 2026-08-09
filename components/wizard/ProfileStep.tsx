"use client";

import { useState } from "react";
import type { ProfileT } from "@/lib/schema";

const QUESTIONS = [
  {
    key: "gender" as const,
    title: "Your profile",
    question: "How should we assess your hair pattern?",
    options: [
      { value: "male", label: "Male pattern" },
      { value: "female", label: "Female pattern" },
    ],
  },
  {
    key: "ageBand" as const,
    title: "Your age",
    question: "Which age group are you in?",
    options: [
      { value: "18-24", label: "18–24" },
      { value: "25-34", label: "25–34" },
      { value: "35-44", label: "35–44" },
      { value: "45-54", label: "45–54" },
      { value: "55+", label: "55+" },
    ],
  },
  {
    key: "duration" as const,
    title: "Timeline",
    question: "How long has the thinning been noticeable?",
    options: [
      { value: "under_1_year", label: "Under a year" },
      { value: "1_3_years", label: "1–3 years" },
      { value: "3_5_years", label: "3–5 years" },
      { value: "over_5_years", label: "More than 5 years" },
    ],
  },
];

export default function ProfileStep({
  onComplete,
}: {
  onComplete: (profile: ProfileT) => void;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<ProfileT>>({});

  const q = QUESTIONS[index];

  function pick(value: string) {
    const next = { ...answers, [q.key]: value };
    setAnswers(next);
    if (index < QUESTIONS.length - 1) {
      setIndex(index + 1);
    } else {
      onComplete(next as ProfileT);
    }
  }

  return (
    <section className="fade-in-up pt-10">
      <p className="text-xs uppercase tracking-[0.3em] text-gold">
        Step 1 of 3 · {q.title}
      </p>
      <h1 className="mt-3 text-3xl leading-snug">{q.question}</h1>
      <div className="mt-8 space-y-3">
        {q.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => pick(opt.value)}
            className="w-full rounded-xl border border-line bg-black-soft px-5 py-4 text-left text-base text-ink transition hover:border-gold hover:bg-gold/10 focus-visible:border-gold focus-visible:outline-none"
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="mt-8 flex gap-1.5">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full ${i <= index ? "bg-gold" : "bg-black-soft"}`}
          />
        ))}
      </div>
      <p className="mt-6 text-xs leading-relaxed text-muted">
        This analysis is for adults aged 18 and over. By continuing you confirm
        you are 18+.
      </p>
    </section>
  );
}
