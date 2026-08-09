import {Audio} from "@remotion/media";
import {TransitionSeries, linearTiming} from "@remotion/transitions";
import {fade} from "@remotion/transitions/fade";
import {slide} from "@remotion/transitions/slide";
import {Sequence, staticFile} from "remotion";
import type {MetaHairAdProps} from "./Composition";
import {CtaScene} from "./scenes/CtaScene";
import {DoctorScene} from "./scenes/DoctorScene";
import {HookScene} from "./scenes/HookScene";
import {ProofScene} from "./scenes/ProofScene";
import {TreatmentScene} from "./scenes/TreatmentScene";

const cut = linearTiming({durationInFrames: 6});

export const MetaHairAd: React.FC<MetaHairAdProps> = ({voiceoverReady}) => {
  return (
    <>
      <Audio src={staticFile("audio/cinematic-bed.wav")} volume={() => (voiceoverReady ? 0.16 : 0.3)} />
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={48}>
          <HookScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={cut} />
        <TransitionSeries.Sequence durationInFrames={45}>
          <DoctorScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({direction: "from-bottom"})} timing={cut} />
        <TransitionSeries.Sequence durationInFrames={70}>
          <TreatmentScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={cut} />
        <TransitionSeries.Sequence durationInFrames={60}>
          <ProofScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({direction: "from-right"})} timing={cut} />
        <TransitionSeries.Sequence durationInFrames={86}>
          <CtaScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Audio src={staticFile("audio/whoosh.wav")} volume={() => (voiceoverReady ? 0.24 : 0.42)} />
      <Sequence from={42} durationInFrames={30}>
        <Audio src={staticFile("audio/switch.wav")} volume={() => (voiceoverReady ? 0.16 : 0.25)} />
      </Sequence>
      <Sequence from={142} durationInFrames={30}>
        <Audio src={staticFile("audio/shutter.wav")} volume={() => (voiceoverReady ? 0.22 : 0.34)} />
      </Sequence>
      {voiceoverReady ? <Audio src={staticFile("audio/elevenlabs-vo.mp3")} volume={0.96} /> : null}
    </>
  );
};
