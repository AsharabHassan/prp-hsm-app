import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {ScanHud} from "../effects/ScanHud";
import {palette, sans} from "../theme";

const signals = [
  {number: "01", label: "MORE SCALP", from: 23},
  {number: "02", label: "LESS DENSITY", from: 52},
  {number: "03", label: "WIDER-LOOKING PART", from: 81},
];

export const EarlySignalScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const zoom = interpolate(frame, [0, 119], [1.12, 1.28], {
    extrapolateRight: "clamp",
  });
  const sweep = interpolate(frame % 50, [0, 49], [-120, 1200]);

  return (
    <AbsoluteFill style={{backgroundColor: palette.black, overflow: "hidden"}}>
      <Img
        src={staticFile("results/hair-before.webp")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "52% center",
          transform: `scale(${zoom})`,
          filter: "grayscale(.2) contrast(1.28) brightness(.43)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 54% 38%, rgba(199,163,92,.06), transparent 28%), linear-gradient(90deg, rgba(0,0,0,.8), rgba(0,0,0,.2) 72%), linear-gradient(180deg, rgba(0,0,0,.32), transparent 48%, rgba(0,0,0,.95))",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: sweep,
          width: 4,
          backgroundColor: palette.goldLight,
          boxShadow: `0 0 40px 12px ${palette.gold}`,
          opacity: 0.42,
        }}
      />
      <ScanHud label="VISIBLE PATTERN / EARLY SIGNALS" />
      <div
        style={{
          position: "absolute",
          left: 76,
          right: 76,
          top: 310,
          fontFamily: sans,
          textTransform: "uppercase",
        }}
      >
        <div style={{fontSize: 31, letterSpacing: 8, color: palette.goldLight, fontWeight: 700}}>
          It starts with
        </div>
        <div style={{fontSize: 105, lineHeight: 0.9, marginTop: 18, color: palette.ink, fontWeight: 900, letterSpacing: -5}}>
          Small
          <br />
          changes.
        </div>
      </div>
      <div style={{position: "absolute", left: 70, right: 70, top: 825, display: "flex", flexDirection: "column", gap: 22}}>
        {signals.map((signal) => {
          const reveal = spring({fps, frame: frame - signal.from, config: {damping: 18, stiffness: 210}});
          return (
            <div
              key={signal.label}
              style={{
                minHeight: 126,
                display: "grid",
                gridTemplateColumns: "105px 1fr",
                alignItems: "center",
                border: "1px solid rgba(234,215,167,.22)",
                background: "linear-gradient(90deg, rgba(3,3,3,.9), rgba(3,3,3,.42))",
                backdropFilter: "blur(14px)",
                transform: `translateX(${interpolate(reveal, [0, 1], [140, 0])}px)`,
                opacity: reveal,
                overflow: "hidden",
              }}
            >
              <div style={{fontFamily: sans, fontSize: 24, color: palette.gold, letterSpacing: 4, textAlign: "center"}}>
                {signal.number}
              </div>
              <div style={{fontFamily: sans, fontSize: 49, lineHeight: 1, color: palette.ink, fontWeight: 900, letterSpacing: 1}}>
                {signal.label}
              </div>
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          left: 76,
          bottom: 180,
          fontFamily: sans,
          fontSize: 19,
          letterSpacing: 5,
          color: palette.muted,
          textTransform: "uppercase",
        }}
      >
        Observation first / no assumptions
      </div>
    </AbsoluteFill>
  );
};
