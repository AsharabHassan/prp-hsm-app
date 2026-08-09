import {Audio} from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {FilmTexture} from "../../effects/FilmTexture";
import {palette, sans} from "../../theme";
import {FifteenCaptions} from "../FifteenCaptions";
import {CheckChangeConversionScene} from "./ConversionScene";
import {CheckChangeHookScene} from "./HookScene";
import {CheckChangePhotoAppScene} from "./PhotoAppScene";
import {CheckChangeReportScene} from "./ReportScene";
import {CheckChangeTreatmentScene} from "./TreatmentScene";

export const CHECK_THE_CHANGE_15_DURATION = 450;

const LegalLine: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [225, 245, 430, 449], [0, 0.82, 0.82, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 58,
        right: 58,
        bottom: 210,
        padding: "12px 16px",
        borderTop: "1px solid rgba(234,215,167,.2)",
        backgroundColor: "rgba(0,0,0,.76)",
        color: palette.muted,
        fontFamily: sans,
        fontSize: 21,
        lineHeight: 1.3,
        letterSpacing: 1.45,
        textAlign: "center",
        textTransform: "uppercase",
        opacity,
      }}
    >
      AI pre-assessment, not a diagnosis. Consultation required. Treatment suitability and results vary. 18+.
    </div>
  );
};

const Impact: React.FC<{from: number; volume: number}> = ({from, volume}) => (
  <Sequence from={from} durationInFrames={26}>
    <Audio src={staticFile("audio/cinematic-impact.wav")} volume={volume} />
  </Sequence>
);

export const CheckTheChange15: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: palette.black}}>
      <Sequence durationInFrames={60}>
        <CheckChangeHookScene />
      </Sequence>
      <Sequence from={60} durationInFrames={90}>
        <CheckChangePhotoAppScene />
      </Sequence>
      <Sequence from={150} durationInFrames={90}>
        <CheckChangeReportScene />
      </Sequence>
      <Sequence from={240} durationInFrames={120}>
        <CheckChangeTreatmentScene />
      </Sequence>
      <Sequence from={360} durationInFrames={90}>
        <CheckChangeConversionScene />
      </Sequence>

      <Audio
        src={staticFile("audio/cinematic-bed-30.wav")}
        volume={(frame) =>
          interpolate(frame, [0, 12, 400, 449], [0.21, 0.1, 0.1, 0.2], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      <Sequence from={3} durationInFrames={447}>
        <Audio src={staticFile("audio/vo-15-check-the-change.mp3")} volume={1} />
      </Sequence>
      <Sequence from={42} durationInFrames={32}>
        <Audio src={staticFile("audio/cinematic-riser.wav")} volume={0.19} />
      </Sequence>
      <Sequence from={326} durationInFrames={34}>
        <Audio src={staticFile("audio/cinematic-riser.wav")} volume={0.23} />
      </Sequence>
      <Sequence from={61} durationInFrames={22}>
        <Audio src={staticFile("audio/shutter.wav")} volume={0.3} />
      </Sequence>
      <Sequence from={151} durationInFrames={22}>
        <Audio src={staticFile("audio/switch.wav")} volume={0.2} />
      </Sequence>
      <Impact from={0} volume={0.45} />
      <Impact from={58} volume={0.28} />
      <Impact from={148} volume={0.27} />
      <Impact from={238} volume={0.38} />
      <Impact from={358} volume={0.46} />

      <FifteenCaptions captionsFile="captions/15-check-the-change.json" />
      <LegalLine />
      <FilmTexture />
    </AbsoluteFill>
  );
};
