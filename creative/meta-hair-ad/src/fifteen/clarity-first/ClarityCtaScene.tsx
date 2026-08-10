import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {palette, sans, serif} from "../../theme";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const ClarityCtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({
    fps,
    frame: frame - 1,
    config: {damping: 17, mass: 0.8, stiffness: 165},
  });
  const button = spring({
    fps,
    frame: frame - 14,
    config: {damping: 15, mass: 0.78, stiffness: 205},
  });

  return (
    <AbsoluteFill style={{background: palette.black, overflow: "hidden"}}>
      <Img
        src={staticFile("brand/wellness-clinic.webp")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% center",
          scale: interpolate(frame, [0, 74], [1.16, 1.08], clamp),
          filter: "grayscale(.22) contrast(1.18) brightness(.35)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 34%, rgba(199,163,92,.25), transparent 34%), linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,.95) 88%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 65,
          right: 65,
          top: 350,
          bottom: 390,
          padding: "58px 54px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          border: "1px solid rgba(234,215,167,.44)",
          background: "rgba(0,0,0,.62)",
          backdropFilter: "blur(12px)",
          opacity: enter,
          scale: interpolate(enter, [0, 1], [0.92, 1], clamp),
          boxShadow: "0 38px 120px rgba(0,0,0,.55)",
        }}
      >
        <Img
          src={staticFile("brand/hsw-logo.png")}
          style={{width: 142, height: 142, objectFit: "contain"}}
        />
        <div
          style={{
            marginTop: 25,
            color: palette.goldLight,
            fontFamily: sans,
            fontSize: 19,
            fontWeight: 850,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Free / private / around 60 seconds
        </div>
        <div
          style={{
            marginTop: 33,
            color: palette.ink,
            fontFamily: serif,
            fontSize: 91,
            fontWeight: 800,
            letterSpacing: -4,
            lineHeight: 0.9,
          }}
        >
          Get the free
          <br />
          <span style={{color: palette.gold}}>hair analysis.</span>
        </div>
        <div
          style={{
            position: "relative",
            width: "100%",
            marginTop: 48,
            padding: "29px 28px",
            overflow: "hidden",
            borderRadius: 999,
            color: "#080706",
            background: `linear-gradient(115deg, ${palette.goldLight}, ${palette.gold})`,
            boxShadow: "0 22px 75px rgba(199,163,92,.32)",
            opacity: button,
            scale: interpolate(button, [0, 1], [0.8, 1], clamp),
            fontFamily: sans,
            fontSize: 30,
            fontWeight: 950,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Start free now <span aria-hidden="true">→</span>
          <div
            style={{
              position: "absolute",
              top: -45,
              bottom: -45,
              left: `${interpolate(frame % 48, [0, 47], [-35, 145])}%`,
              width: 95,
              background: "rgba(255,255,255,.52)",
              transform: "skewX(-18deg)",
              filter: "blur(8px)",
            }}
          />
        </div>
        <div
          style={{
            marginTop: 29,
            color: palette.muted,
            fontFamily: sans,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: 2.4,
            textTransform: "uppercase",
          }}
        >
          Harley Street Medical Wellness / London &amp; Glasgow
        </div>
      </div>
    </AbsoluteFill>
  );
};
