import {Audio} from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  Series,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {palette, sans} from "../../theme";
import {FifteenCaptions} from "../FifteenCaptions";
import {AppSpeedrunScene} from "./AppSpeedrunScene";
import {BeforeTreatmentScene} from "./BeforeTreatmentScene";
import {ClarityCtaScene} from "./ClarityCtaScene";
import {DecisionClarityScene} from "./DecisionClarityScene";
import {TreatmentProofScene} from "./TreatmentProofScene";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const Impact: React.FC<{at: number; volume?: number}> = ({
  at,
  volume = 0.34,
}) => (
  <Sequence from={at} durationInFrames={25}>
    <Audio src={staticFile("audio/cinematic-impact.wav")} volume={volume} />
  </Sequence>
);

const Legal: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [86, 108], [0, 0.88], clamp);

  return (
    <div
      style={{
        position: "absolute",
        left: 58,
        right: 58,
        bottom: 240,
        padding: "12px 16px",
        color: "#d1cec7",
        background: "rgba(0,0,0,.78)",
        borderTop: "1px solid rgba(234,215,167,.24)",
        opacity,
        fontFamily: sans,
        fontSize: 22,
        fontWeight: 600,
        letterSpacing: 1,
        lineHeight: 1.28,
        textAlign: "center",
      }}
    >
      AI pre-assessment, not a diagnosis. Consultation required. Treatment
      suitability and results vary. 18+.
    </div>
  );
};

const ProgressRail: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        right: 70,
        top: 65,
        color: palette.goldLight,
        fontFamily: sans,
        textTransform: "uppercase",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 17,
          fontWeight: 900,
          letterSpacing: 5,
          textShadow: "0 2px 12px rgba(0,0,0,.9)",
        }}
      >
        <span>HSA / Free hair analysis</span>
        <span>15 sec</span>
      </div>
      <div
        style={{
          position: "relative",
          height: 6,
          marginTop: 16,
          overflow: "hidden",
          background: "rgba(255,255,255,.2)",
          boxShadow: "0 2px 10px rgba(0,0,0,.4)",
        }}
      >
        <div
          style={{
            width: `${interpolate(frame, [0, 449], [1, 100], clamp)}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${palette.gold}, ${palette.goldLight})`,
            boxShadow: "0 0 16px rgba(199,163,92,.72)",
          }}
        />
      </div>
    </div>
  );
};

export const ClarityFirst15: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: palette.black}}>
      <Audio
        src={staticFile("audio/cinematic-bed-30.wav")}
        trimBefore={450}
        volume={(frame) =>
          interpolate(frame, [0, 14, 405, 449], [0.08, 0.135, 0.135, 0], clamp)
        }
      />

      <Series>
        <Series.Sequence durationInFrames={60}>
          <BeforeTreatmentScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={90}>
          <DecisionClarityScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <AppSpeedrunScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={75}>
          <TreatmentProofScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={75}>
          <ClarityCtaScene />
        </Series.Sequence>
      </Series>

      <Sequence from={3} durationInFrames={440}>
        <Audio src={staticFile("audio/vo-15-clarity-first.mp3")} volume={1} />
      </Sequence>

      <Sequence durationInFrames={31}>
        <Audio src={staticFile("audio/whoosh.wav")} volume={0.28} />
      </Sequence>
      <Sequence from={145} durationInFrames={33}>
        <Audio src={staticFile("audio/cinematic-riser.wav")} volume={0.18} />
      </Sequence>
      <Sequence from={184} durationInFrames={30}>
        <Audio src={staticFile("audio/switch.wav")} volume={0.22} />
      </Sequence>
      <Sequence from={223} durationInFrames={30}>
        <Audio src={staticFile("audio/shutter.wav")} volume={0.28} />
      </Sequence>
      <Sequence from={234} durationInFrames={30}>
        <Audio src={staticFile("audio/switch.wav")} volume={0.2} />
      </Sequence>
      <Impact at={0} volume={0.42} />
      <Impact at={60} volume={0.32} />
      <Impact at={150} volume={0.28} />
      <Impact at={300} volume={0.36} />
      <Impact at={375} volume={0.46} />

      <FifteenCaptions
        captionsFile="captions/15-clarity-first.json"
        placement="top"
      />
      <Legal />
      <ProgressRail />
    </AbsoluteFill>
  );
};
