import {Video} from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {PhoneCapture} from "../../effects/PhoneCapture";
import {palette, sans} from "../../theme";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const CheckChangeReportScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const titleIn = spring({fps, frame, config: {damping: 18, stiffness: 180}});
  const pulse = interpolate(frame % 30, [0, 10, 20, 29], [0.35, 1, 0.58, 0.35]);
  const progress = interpolate(frame, [0, 89], [72, 100], clamp);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.black,
        overflow: "hidden",
        fontFamily: sans,
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 22% 45%, rgba(100,233,255,.09), transparent 32%), radial-gradient(circle at 78% 70%, rgba(199,163,92,.18), transparent 34%), #050505",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 104,
          textAlign: "center",
          textTransform: "uppercase",
          opacity: titleIn,
          translate: `0 ${interpolate(titleIn, [0, 1], [34, 0], clamp)}px`,
        }}
      >
        <div style={{fontSize: 20, letterSpacing: 6, color: palette.goldLight, fontWeight: 800}}>
          60-second hair analysis
        </div>
        <div style={{fontSize: 91, lineHeight: 0.9, letterSpacing: -4, color: palette.ink, fontWeight: 900, marginTop: 20}}>
          Organise the
          <br />
          <span style={{color: palette.gold}}>visible signs.</span>
        </div>
      </div>

      <PhoneCapture durationInFrames={90} label="Real report scroll">
        <AbsoluteFill style={{backgroundColor: "#050505", overflow: "hidden"}}>
          <Video
            src={staticFile("source/app/hair-analysis-report-scroll.mp4")}
            muted
            playbackRate={1.18}
            objectFit="cover"
            style={{
              width: "100%",
              height: "100%",
              scale: interpolate(frame, [0, 89], [1.005, 1.025], clamp),
              transformOrigin: "50% 34%",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 16,
              right: 16,
              top: 88,
              height: 2,
              opacity: pulse,
              background: "linear-gradient(90deg, transparent, rgba(100,233,255,.9), transparent)",
              boxShadow: "0 0 18px rgba(100,233,255,.8)",
            }}
          />
        </AbsoluteFill>
      </PhoneCapture>

      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 1638,
          height: 7,
          borderRadius: 999,
          backgroundColor: "rgba(255,255,255,.1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            borderRadius: 999,
            background: `linear-gradient(90deg, ${palette.gold}, ${palette.goldLight})`,
            boxShadow: "0 0 20px rgba(199,163,92,.7)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 1680,
          display: "flex",
          justifyContent: "space-between",
          color: palette.goldLight,
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        <span>Visual pre-assessment</span>
        <span>Not a diagnosis</span>
      </div>
    </AbsoluteFill>
  );
};
