"use client";

import { useCallback, useState } from "react";
import type { AnalysisResultT, ProfileT } from "@/lib/schema";
import ProfileStep from "./ProfileStep";
import PhotoStep from "./PhotoStep";
import AnalyzingStep from "./AnalyzingStep";
import TeaserGate from "./TeaserGate";
import ReportView from "@/components/report/ReportView";
import type { ClinicLocation } from "@/lib/webhooks";

type Step = "profile" | "photo" | "analyzing" | "teaser" | "report";

export default function Wizard() {
  const [step, setStep] = useState<Step>("profile");
  const [profile, setProfile] = useState<ProfileT | null>(null);
  const [photoDataUrl, setPhotoDataUrl] = useState<string>("");
  const [analysis, setAnalysis] = useState<AnalysisResultT | null>(null);
  const [location, setLocation] = useState<ClinicLocation>("london");
  const [retakeMessage, setRetakeMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const runAnalysis = useCallback(
    async (photo: string, prof: ProfileT) => {
      setStep("analyzing");
      setErrorMessage("");
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ photoDataUrl: photo, profile: prof }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error || "Analysis failed");
        }
        const { analysis: result } = (await res.json()) as {
          analysis: AnalysisResultT;
        };
        if (!result.photoQualityOk) {
          setRetakeMessage(
            result.retakeInstruction ||
              "We couldn't see your hairline clearly. Hold your hair fully back, face the light and retake."
          );
          setStep("photo");
          return;
        }
        setAnalysis(result);
        setStep("teaser");
      } catch (err) {
        setErrorMessage(
          err instanceof Error ? err.message : "Something went wrong. Please try again."
        );
        setStep("photo");
      }
    },
    []
  );

  return (
    <div className="mx-auto w-full max-w-lg px-4 pb-16">
      {step === "profile" && (
        <ProfileStep
          onComplete={(p) => {
            setProfile(p);
            setStep("photo");
          }}
        />
      )}

      {step === "photo" && profile && (
        <PhotoStep
          retakeMessage={retakeMessage}
          errorMessage={errorMessage}
          onPhoto={(dataUrl) => {
            setRetakeMessage("");
            setPhotoDataUrl(dataUrl);
            runAnalysis(dataUrl, profile);
          }}
        />
      )}

      {step === "analyzing" && <AnalyzingStep photoDataUrl={photoDataUrl} />}

      {step === "teaser" && analysis && profile && (
        <TeaserGate
          analysis={analysis}
          profile={profile}
          photoDataUrl={photoDataUrl}
          onUnlocked={(chosenLocation) => {
            setLocation(chosenLocation);
            setStep("report");
          }}
        />
      )}

      {step === "report" && analysis && (
        <ReportView
          analysis={analysis}
          location={location}
          photoDataUrl={photoDataUrl}
        />
      )}
    </div>
  );
}
