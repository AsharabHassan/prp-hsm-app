import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {palette, sans} from "../../theme";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const CheckChangeHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const headlineIn = spring({
    fps,
    frame: frame - 2,
    config: {damping: 16, mass: 0.82, stiffness: 205},
  });
  const zoom = interpolate(frame, [0, 59], [1.1, 1.24], clamp);
  const scanX = interpolate(frame, [0, 59], [-140, 1180], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });
  const flash = interpolate(frame, [0, 2, 8], [0.82, 0.18, 0], clamp);
  const microGlitch = frame < 17 ? (frame % 5 === 0 ? 9 : frame % 5 === 1 ? -6 : 0) : 0;

  return (
    <AbsoluteFill style={{backgroundColor: palette.black, overflow: "hidden"}}>
      <Img
        src={staticFile("results/hair-before.webp")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "52% 35%",
          scale: zoom,
          filter: "grayscale(.2) saturate(.74) contrast(1.27) brightness(.55)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 52% 32%, transparent 0 20%, rgba(0,0,0,.23) 42%, rgba(0,0,0,.86) 81%), linear-gradient(180deg, rgba(0,0,0,.06), rgba(0,0,0,.88) 78%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: scanX,
          top: -160,
          width: 110,
          height: 2240,
          rotate: "12deg",
          background:
            "linear-gradient(90deg, transparent, rgba(234,215,167,.2), rgba(255,255,255,.7), rgba(234,215,167,.22), transparent)",
          filter: "blur(14px)",
          mixBlendMode: "screen",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 112,
          display: "flex",
          justifyContent: "space-between",
          color: palette.goldLight,
          fontFamily: sans,
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: 5,
          textTransform: "uppercase",
        }}
      >
        <span>Visual pattern check</span>
        <span>01 / 05</span>
      </div>

      <div
        style={{
          position: "absolute",
          left: 76,
          right: 76,
          top: 760,
          opacity: headlineIn,
          translate: `${microGlitch}px ${interpolate(headlineIn, [0, 1], [74, 0], clamp)}px`,
          fontFamily: sans,
          textTransform: "uppercase",
          textShadow: "0 18px 50px rgba(0,0,0,.72)",
        }}
      >
        <div
          style={{
            color: palette.ink,
            fontSize: 137,
            lineHeight: 0.82,
            fontWeight: 900,
            letterSpacing: -7,
          }}
        >
          Hair change
        </div>
        <div
          style={{
            marginTop: 32,
            color: palette.gold,
            fontSize: 78,
            lineHeight: 0.93,
            fontWeight: 900,
            letterSpacing: -3,
          }}
        >
          Rarely announces itself.
        </div>
        <div style={{display: "flex", alignItems: "center", gap: 20, marginTop: 42}}>
          <div style={{width: 100, height: 3, backgroundColor: palette.goldLight}} />
          <div
            style={{
              color: palette.muted,
              fontSize: 19,
              fontWeight: 700,
              letterSpacing: 5,
            }}
          >
            CHECK THE VISIBLE PATTERN
          </div>
        </div>
      </div>

      <AbsoluteFill
        style={{
          backgroundColor: `rgba(255,255,255,${flash})`,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
