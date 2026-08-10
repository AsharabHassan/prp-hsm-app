import {Composition} from "remotion";
import {MetaHairAd} from "./MetaHairAd";
import {ThirtySecondAd} from "./ThirtySecondAd";
import {CheckTheChange15} from "./fifteen/check-change/CheckTheChange15";
import {NoGuesswork15} from "./fifteen/no-guesswork/NoGuesswork15";
import {ClarityFirst15} from "./fifteen/clarity-first/ClarityFirst15";
import {AnalysisHowTo15} from "./fifteen/analysis-howto/AnalysisHowTo15";
import {HairAnalysisReportScrollCapture} from "./capture/HairAnalysisReportScrollCapture";

export type MetaHairAdProps = {
  voiceoverReady: boolean;
};

export const MyComposition: React.FC = () => {
  return (
    <>
      <Composition
        id="NotBaldNotTooEarly"
        component={MetaHairAd}
        durationInFrames={285}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{voiceoverReady: false} satisfies MetaHairAdProps}
      />
      <Composition
        id="NotBaldNotTooEarlyWithVO"
        component={MetaHairAd}
        durationInFrames={285}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{voiceoverReady: true} satisfies MetaHairAdProps}
      />
      <Composition
        id="HairAnalysisConversion30"
        component={ThirtySecondAd}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HairAnalysis15CheckTheChange"
        component={CheckTheChange15}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HairAnalysis15NoGuesswork"
        component={NoGuesswork15}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HairAnalysis15ClarityFirst"
        component={ClarityFirst15}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HairAnalysis15HowItWorks"
        component={AnalysisHowTo15}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="HairAnalysisReportScrollCapture"
        component={HairAnalysisReportScrollCapture}
        durationInFrames={150}
        fps={30}
        width={376}
        height={812}
      />
    </>
  );
};
