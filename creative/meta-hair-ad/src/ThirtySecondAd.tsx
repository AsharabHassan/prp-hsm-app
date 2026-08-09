import {Audio} from "@remotion/media";
import {TransitionSeries, linearTiming} from "@remotion/transitions";
import {fade} from "@remotion/transitions/fade";
import {slide} from "@remotion/transitions/slide";
import {AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame} from "remotion";
import {ThirtySecondCaptions} from "./captions/ThirtySecondCaptions";
import {FilmTexture} from "./effects/FilmTexture";
import {AppJourneyScene} from "./scenes30/AppJourneyScene";
import {ConversionCtaScene} from "./scenes30/ConversionCtaScene";
import {EarlySignalScene} from "./scenes30/EarlySignalScene";
import {EvidenceScene} from "./scenes30/EvidenceScene";
import {Hook30Scene} from "./scenes30/Hook30Scene";
import {TreatmentOptionsScene} from "./scenes30/TreatmentOptionsScene";
import {palette, sans} from "./theme";

const transition = linearTiming({durationInFrames: 10});

const LegalLine: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [250, 280, 870, 899], [0, 0.78, 0.78, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 58,
        right: 58,
        bottom: 62,
        padding: "13px 18px",
        background: "rgba(0,0,0,.72)",
        borderTop: "1px solid rgba(234,215,167,.18)",
        color: palette.muted,
        fontFamily: sans,
        fontSize: 16,
        lineHeight: 1.3,
        letterSpacing: 1.5,
        textAlign: "center",
        textTransform: "uppercase",
        opacity,
      }}
    >
      AI pre-assessment, not a diagnosis. Consultation required. Treatment suitability and results vary. 18+.
    </div>
  );
};

const ImpactAt: React.FC<{from: number; volume?: number}> = ({from, volume = 0.42}) => (
  <Sequence from={from} durationInFrames={25}>
    <Audio src={staticFile("audio/cinematic-impact.wav")} volume={volume} />
  </Sequence>
);

export const ThirtySecondAd: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: palette.black}}>
      <Audio
        src={staticFile("audio/cinematic-bed-30.wav")}
        volume={(frame) =>
          interpolate(frame, [0, 16, 820, 899], [0.25, 0.13, 0.13, 0.24], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={105}>
          <Hook30Scene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transition} />
        <TransitionSeries.Sequence durationInFrames={120}>
          <EarlySignalScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({direction: "from-right"})} timing={transition} />
        <TransitionSeries.Sequence durationInFrames={165}>
          <TreatmentOptionsScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({direction: "from-bottom"})} timing={transition} />
        <TransitionSeries.Sequence durationInFrames={240}>
          <AppJourneyScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={transition} />
        <TransitionSeries.Sequence durationInFrames={150}>
          <EvidenceScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({direction: "from-right"})} timing={transition} />
        <TransitionSeries.Sequence durationInFrames={170}>
          <ConversionCtaScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Sequence from={10} durationInFrames={870}>
        <Audio src={staticFile("audio/elevenlabs-vo-30.mp3")} volume={1} />
      </Sequence>
      <Sequence from={85} durationInFrames={33}>
        <Audio src={staticFile("audio/cinematic-riser.wav")} volume={0.22} />
      </Sequence>
      <Sequence from={340} durationInFrames={33}>
        <Audio src={staticFile("audio/cinematic-riser.wav")} volume={0.2} />
      </Sequence>
      <Sequence from={708} durationInFrames={33}>
        <Audio src={staticFile("audio/cinematic-riser.wav")} volume={0.24} />
      </Sequence>
      <ImpactAt from={0} volume={0.48} />
      <ImpactAt from={95} volume={0.34} />
      <ImpactAt from={205} volume={0.42} />
      <ImpactAt from={360} volume={0.34} />
      <ImpactAt from={590} volume={0.38} />
      <ImpactAt from={730} volume={0.48} />

      <ThirtySecondCaptions />
      <LegalLine />
      <FilmTexture />
    </AbsoluteFill>
  );
};
