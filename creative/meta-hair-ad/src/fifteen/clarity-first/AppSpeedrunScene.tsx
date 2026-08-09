import {Video} from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {palette, sans} from "../../theme";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const Tap: React.FC<{at: number; x: number; y: number}> = ({at, x, y}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [at - 4, at, at + 8, at + 15],
    [0, 1, 0.34, 0],
    clamp,
  );

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: 82,
        height: 82,
        marginLeft: -41,
        marginTop: -41,
        borderRadius: "50%",
        border: `4px solid ${palette.goldLight}`,
        boxShadow:
          "0 0 0 14px rgba(199,163,92,.2), 0 0 34px rgba(199,163,92,.76)",
        opacity,
        scale: interpolate(opacity, [0, 1], [1.45, 0.72], clamp),
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 26,
          borderRadius: "50%",
          background: palette.goldLight,
        }}
      />
    </div>
  );
};

const Screenshot: React.FC<{src: string; duration: number}> = ({src, duration}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{background: "#050505", overflow: "hidden"}}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          scale: interpolate(frame, [0, duration - 1], [1, 1.026], clamp),
        }}
      />
    </AbsoluteFill>
  );
};

const ReportRecording: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{background: "#050505", overflow: "hidden"}}>
      <Video
        src={staticFile("source/app/hair-analysis-report-scroll.mp4")}
        muted
        objectFit="cover"
        playbackRate={1.35}
        style={{
          width: "100%",
          height: "100%",
          scale: interpolate(frame, [0, 65], [1, 1.02], clamp),
        }}
      />
    </AbsoluteFill>
  );
};

export const AppSpeedrunScene: React.FC = () => {
  const frame = useCurrentFrame();
  const state = frame < 43 ? "START" : frame < 84 ? "ONE PHOTO" : "YOUR REPORT";
  const step = frame < 43 ? "01" : frame < 84 ? "02" : "03";

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 15% 72%, rgba(100,233,255,.11), transparent 28%), linear-gradient(145deg, #f1ebdf 0%, #d8cdb6 58%, #b9934d 130%)",
        color: "#080807",
        overflow: "hidden",
        fontFamily: sans,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 450,
          writingMode: "vertical-rl",
          rotate: "180deg",
          fontSize: 20,
          fontWeight: 900,
          letterSpacing: 6,
          textTransform: "uppercase",
        }}
      >
        Real app / real flow
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 365,
          width: 500,
          height: 1084,
          translate: "-50% 0",
          rotate: `${interpolate(frame, [0, 149], [-1.8, 1.1], clamp)}deg`,
          borderRadius: 72,
          border: "12px solid #090909",
          overflow: "hidden",
          background: "#050505",
          boxShadow:
            "0 48px 120px rgba(30,22,9,.38), 0 0 0 2px rgba(255,255,255,.78), 0 0 0 4px rgba(199,163,92,.44)",
        }}
      >
        <Sequence durationInFrames={43}>
          <Screenshot src="app-capture/01-landing.jpg" duration={43} />
          <Tap at={34} x={50} y={68} />
        </Sequence>
        <Sequence from={43} durationInFrames={41}>
          <Screenshot src="app-capture/04-photo-correct.jpg" duration={41} />
          <Tap at={30} x={50} y={79} />
        </Sequence>
        <Sequence from={84} durationInFrames={66}>
          <ReportRecording />
        </Sequence>

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 13,
            width: 148,
            height: 40,
            translate: "-50% 0",
            borderRadius: 999,
            background: "#030303",
            border: "1px solid rgba(255,255,255,.18)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          right: 68,
          top: 455,
          padding: "14px 18px",
          color: palette.goldLight,
          background: "#080807",
          fontSize: 18,
          fontWeight: 900,
          letterSpacing: 4,
          textTransform: "uppercase",
          boxShadow: "9px 9px 0 rgba(199,163,92,.48)",
        }}
      >
        Screen recording
      </div>

      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          top: 1480,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          paddingTop: 22,
          borderTop: "3px solid #080807",
          fontWeight: 900,
          textTransform: "uppercase",
        }}
      >
        <span style={{fontSize: 22, letterSpacing: 5}}>STEP {step} / 03</span>
        <span style={{fontSize: 42, letterSpacing: -1}}>{state}</span>
      </div>

      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          top: 1565,
          height: 10,
          overflow: "hidden",
          border: "2px solid #080807",
          background: "rgba(255,255,255,.25)",
        }}
      >
        <div
          style={{
            width: `${interpolate(frame, [0, 149], [8, 100], clamp)}%`,
            height: "100%",
            background: "#080807",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
