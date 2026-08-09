import {Audio} from "@remotion/media";
import {TransitionSeries, linearTiming} from "@remotion/transitions";
import {fade} from "@remotion/transitions/fade";
import {slide} from "@remotion/transitions/slide";
import {AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame} from "remotion";
import {palette, sans} from "../../theme";
import {FifteenCaptions} from "../FifteenCaptions";
import {NoGuessworkScene} from "./NoGuessworkScene";
import {PrivateAnalysisScene} from "./PrivateAnalysisScene";
import {QuestionHookScene} from "./QuestionHookScene";
import {TreatmentCtaScene} from "./TreatmentCtaScene";

const timing = linearTiming({durationInFrames: 8});

const Legal: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        right: 70,
        bottom: 210,
        color: palette.muted,
        fontFamily: sans,
        fontSize: 21,
        lineHeight: 1.25,
        letterSpacing: 1.2,
        textAlign: "center",
        opacity: interpolate(frame, [55, 75, 430, 449], [0, 0.82, 0.82, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}),
      }}
    >
      Analysis is informational, not a diagnosis. Consultation required. Treatment suitability and results vary.
    </div>
  );
};

const Impact: React.FC<{from: number}> = ({from}) => (
  <Sequence from={from} durationInFrames={25}>
    <Audio src={staticFile("audio/cinematic-impact.wav")} volume={0.36} />
  </Sequence>
);

export const NoGuesswork15: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: palette.black}}>
      <Audio src={staticFile("audio/cinematic-bed-30.wav")} trimBefore={300} volume={0.13} />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={90}>
          <QuestionHookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={132}>
          <NoGuessworkScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({direction: "from-bottom"})} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={122}>
          <PrivateAnalysisScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={timing} />
        <TransitionSeries.Sequence durationInFrames={130}>
          <TreatmentCtaScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Sequence from={3} durationInFrames={440}>
        <Audio src={staticFile("audio/vo-15-no-guesswork.mp3")} volume={1} />
      </Sequence>
      <Impact from={0} />
      <Impact from={82} />
      <Impact from={206} />
      <Impact from={320} />
      <FifteenCaptions captionsFile="captions/15-no-guesswork.json" placement="bottom" />
      <Legal />
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          opacity: 0.055,
          backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 7px, rgba(255,255,255,.16) 8px)",
          boxShadow: "inset 0 0 180px 70px rgba(0,0,0,.78)",
        }}
      />
    </AbsoluteFill>
  );
};
