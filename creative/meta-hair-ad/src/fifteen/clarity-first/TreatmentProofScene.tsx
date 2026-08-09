import {Video} from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {palette, sans} from "../../theme";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const TreatmentProofScene: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [1, 9], [0, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 78% 31%, rgba(100,233,255,.14), transparent 30%), linear-gradient(150deg, #080807, #020202)",
        color: palette.ink,
        overflow: "hidden",
        fontFamily: sans,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          top: 390,
          height: 720,
          overflow: "hidden",
          border: "2px solid rgba(234,215,167,.42)",
          boxShadow: "0 36px 110px rgba(0,0,0,.62)",
          opacity: enter,
          translate: `0 ${interpolate(enter, [0, 1], [55, 0])}px`,
        }}
      >
        <Video
          src={staticFile("source/clinic/exosome-procedure.mp4")}
          trimBefore={35 * 30}
          muted
          objectFit="cover"
          playbackRate={0.86}
          style={{
            width: "100%",
            height: "100%",
            objectPosition: "50% 63%",
            scale: interpolate(frame, [0, 74], [1.02, 1.08], clamp),
            filter: "contrast(1.12) saturate(.76) brightness(.72)",
          }}
        />
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, transparent 42%, rgba(0,0,0,.88) 72%, rgba(0,0,0,.98))",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 22,
            bottom: 22,
            padding: "13px 17px",
            color: palette.goldLight,
            background: "rgba(0,0,0,.88)",
            borderLeft: `4px solid ${palette.gold}`,
            fontSize: 19,
            fontWeight: 900,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Authentic exosome procedure footage
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          top: 1160,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          opacity: enter,
        }}
      >
        <div
          style={{
            padding: "27px 26px 25px",
            border: "1px solid rgba(199,163,92,.6)",
            background: "rgba(20,16,8,.94)",
          }}
        >
          <div style={{fontSize: 62, fontWeight: 950, color: palette.gold}}>PRP</div>
          <div
            style={{
              marginTop: 12,
              color: palette.muted,
              fontSize: 17,
              fontWeight: 800,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Option discussed
          </div>
        </div>
        <div
          style={{
            padding: "27px 26px 25px",
            border: "1px solid rgba(100,233,255,.48)",
            background: "rgba(5,18,20,.94)",
          }}
        >
          <div style={{fontSize: 46, fontWeight: 950, color: palette.cyan}}>EXOSOME</div>
          <div
            style={{
              marginTop: 20,
              color: palette.muted,
              fontSize: 17,
              fontWeight: 800,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Footage shown
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          top: 1460,
          color: palette.goldLight,
          fontSize: 20,
          fontWeight: 850,
          letterSpacing: 5,
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        Discussed only when clinically appropriate
      </div>
    </AbsoluteFill>
  );
};
