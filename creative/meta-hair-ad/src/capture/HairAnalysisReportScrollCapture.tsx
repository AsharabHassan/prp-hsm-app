import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from "remotion";

const SOURCE_WIDTH = 375;
const SOURCE_HEIGHT = 3672;
const COMPOSITION_WIDTH = 376;
const COMPOSITION_HEIGHT = 812;
const START_HOLD_FRAMES = 12;
const END_HOLD_START_FRAME = 137;

const scaledImageHeight = (SOURCE_HEIGHT * COMPOSITION_WIDTH) / SOURCE_WIDTH;
const scrollDistance = scaledImageHeight - COMPOSITION_HEIGHT;

export const HairAnalysisReportScrollCapture: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{backgroundColor: "#050505", overflow: "hidden"}}>
      <Img
        src={staticFile("app-capture/report-full.jpg")}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "auto",
          translate: `0 ${interpolate(
            frame,
            [START_HOLD_FRAMES, END_HOLD_START_FRAME],
            [0, -scrollDistance],
            {
              easing: Easing.bezier(0.42, 0, 0.58, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          )}px`,
        }}
      />
    </AbsoluteFill>
  );
};
