import {Video} from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {palette, sans} from "../theme";

export const Hook30Scene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({fps, frame: frame - 3, config: {damping: 18, stiffness: 190}});
  const zoom = interpolate(frame, [0, 104], [1.04, 1.15], {
    extrapolateRight: "clamp",
  });
  const flareX = interpolate(frame, [0, 104], [-420, 1320], {
    extrapolateRight: "clamp",
  });
  const flash = interpolate(frame, [0, 2, 9], [1, 0.24, 0], {
    extrapolateRight: "clamp",
  });
  const glitch = frame < 15 ? (frame % 4 === 0 ? 10 : frame % 4 === 1 ? -7 : 0) : 0;

  return (
    <AbsoluteFill style={{backgroundColor: palette.black, overflow: "hidden"}}>
      <Video
        src={staticFile("source/clinic/exosome-procedure.mp4")}
        trimBefore={0}
        muted
        objectFit="cover"
        style={{
          width: "100%",
          height: "100%",
          objectPosition: "50% 24%",
          transform: `scale(${zoom})`,
          filter: "grayscale(.18) saturate(.72) contrast(1.22) brightness(.5)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,.24) 0%, rgba(0,0,0,.25) 35%, rgba(5,5,5,.82) 49%, #050505 63%, #050505 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -180,
          bottom: -180,
          left: flareX,
          width: 230,
          transform: "rotate(16deg)",
          background:
            "linear-gradient(90deg, transparent, rgba(234,215,167,.35), rgba(255,255,255,.68), transparent)",
          filter: "blur(28px)",
          mixBlendMode: "screen",
          opacity: 0.75,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 74,
          right: 74,
          top: 112,
          display: "flex",
          justifyContent: "space-between",
          color: palette.goldLight,
          fontFamily: sans,
          fontSize: 19,
          fontWeight: 700,
          letterSpacing: 5,
          textTransform: "uppercase",
        }}
      >
        <span>Doctor-led hair analysis</span>
        <span>01 / 06</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 72,
          right: 54,
          bottom: 318,
          transform: `translateX(${glitch}px) translateY(${interpolate(enter, [0, 1], [80, 0])}px)`,
          opacity: enter,
          fontFamily: sans,
          textTransform: "uppercase",
        }}
      >
        <div style={{fontSize: 52, lineHeight: 1, color: palette.goldLight, letterSpacing: 9, fontWeight: 700}}>
          Hair thinning
        </div>
        <div style={{fontSize: 128, lineHeight: 0.82, color: palette.ink, fontWeight: 900, letterSpacing: -6, marginTop: 22}}>
          Rarely
        </div>
        <div style={{fontSize: 103, lineHeight: 0.86, color: palette.gold, fontWeight: 900, letterSpacing: -4}}>
          announces itself.
        </div>
        <div style={{display: "flex", alignItems: "center", gap: 18, marginTop: 42}}>
          <div style={{height: 2, width: 92, backgroundColor: palette.gold}} />
          <div style={{fontSize: 20, letterSpacing: 5, color: palette.muted, fontWeight: 700}}>
            Small change / real uncertainty
          </div>
        </div>
      </div>
      <AbsoluteFill style={{backgroundColor: `rgba(255,255,255,${flash})`, mixBlendMode: "screen"}} />
    </AbsoluteFill>
  );
};
