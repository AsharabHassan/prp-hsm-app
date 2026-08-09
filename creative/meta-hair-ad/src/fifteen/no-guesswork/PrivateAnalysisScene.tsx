import {Video} from "@remotion/media";
import {AbsoluteFill, Img, interpolate, Sequence, staticFile, useCurrentFrame} from "remotion";
import {PhoneCapture} from "../../effects/PhoneCapture";
import {palette, sans} from "../../theme";

const Still: React.FC<{src: string}> = ({src}) => (
  <AbsoluteFill style={{backgroundColor: "#050505", overflow: "hidden"}}>
    <Img src={staticFile(src)} style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center"}} />
  </AbsoluteFill>
);

export const PrivateAnalysisScene: React.FC = () => {
  const frame = useCurrentFrame();
  const touch =
    frame >= 28 && frame <= 42
      ? {x: 49, y: 33, opacity: interpolate(frame, [28, 33, 42], [0, 1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}
      : frame >= 61 && frame <= 75
        ? {x: 50, y: 78, opacity: interpolate(frame, [61, 66, 75], [0, 1, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}
        : undefined;

  return (
    <AbsoluteFill style={{background: "radial-gradient(circle at 50% 50%, rgba(199,163,92,.18), transparent 42%), #050505", overflow: "hidden"}}>
      <div style={{position: "absolute", left: 72, right: 72, top: 82, textAlign: "center", fontFamily: sans, textTransform: "uppercase"}}>
        <div style={{fontSize: 21, letterSpacing: 8, color: palette.goldLight, fontWeight: 700}}>Private hair analysis</div>
        <div style={{fontSize: 76, lineHeight: 0.92, color: palette.ink, fontWeight: 900, marginTop: 20}}>
          One photo. <span style={{color: palette.gold}}>60 seconds.</span>
        </div>
      </div>
      <PhoneCapture durationInFrames={122} label="REAL APP" touch={touch}>
        <Sequence durationInFrames={40}>
          <Still src="app-capture/02-profile.jpg" />
        </Sequence>
        <Sequence from={36} durationInFrames={42}>
          <Still src="app-capture/04-photo-correct.jpg" />
        </Sequence>
        <Sequence from={74} durationInFrames={48}>
          <Video
            src={staticFile("source/app/hair-analysis-report-scroll.mp4")}
            muted
            playbackRate={1.55}
            objectFit="cover"
            style={{width: "100%", height: "100%"}}
          />
        </Sequence>
      </PhoneCapture>
    </AbsoluteFill>
  );
};
