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

export const NoGuessworkScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({fps, frame: frame - 5, config: {damping: 17, stiffness: 175}});
  const scanY = interpolate(frame, [0, 131], [220, 1620], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{backgroundColor: palette.black, overflow: "hidden"}}>
      <Img
        src={staticFile("brand/hair-analysis-hero.webp")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "72% center",
          scale: interpolate(frame, [0, 131], [1.04, 1.12], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          filter: "grayscale(.24) contrast(1.18) brightness(.37)",
        }}
      />
      <AbsoluteFill style={{background: "linear-gradient(90deg, rgba(0,0,0,.9), rgba(0,0,0,.25)), linear-gradient(180deg, rgba(0,0,0,.24), transparent 46%, rgba(0,0,0,.93))"}} />
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: scanY,
          height: 2,
          background: "linear-gradient(90deg, transparent, #64e9ff, transparent)",
          boxShadow: "0 0 28px rgba(100,233,255,.72)",
          opacity: 0.65,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          top: 235,
          opacity: enter,
          translate: `0px ${interpolate(enter, [0, 1], [80, 0])}px`,
        }}
      >
        <div style={{fontFamily: sans, fontSize: 21, letterSpacing: 8, color: palette.goldLight, fontWeight: 700, textTransform: "uppercase"}}>
          The better starting point
        </div>
        <div style={{fontFamily: serif, fontSize: 116, lineHeight: 0.87, color: palette.ink, fontWeight: 800, marginTop: 38}}>
          Do not start
          <br />
          with <span style={{color: palette.gold}}>guesswork.</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 72,
          bottom: 310,
          width: 690,
          padding: "30px 34px",
          borderLeft: `4px solid ${palette.cyan}`,
          background: "rgba(4,4,4,.75)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div style={{fontFamily: sans, color: palette.cyan, fontSize: 22, letterSpacing: 6, fontWeight: 800, textTransform: "uppercase"}}>
          Pattern first
        </div>
        <div style={{fontFamily: sans, color: palette.ink, fontSize: 43, lineHeight: 1.18, fontWeight: 700, marginTop: 18}}>
          Let the visible signs guide the conversation.
        </div>
      </div>
    </AbsoluteFill>
  );
};
