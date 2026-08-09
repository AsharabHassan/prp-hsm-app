import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {palette, sans, serif} from "../theme";

export const ConversionCtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({fps, frame: frame - 4, config: {damping: 17, stiffness: 165}});
  const buttonIn = spring({fps, frame: frame - 58, config: {damping: 15, stiffness: 190}});
  const zoom = interpolate(frame, [0, 169], [1.14, 1.04], {extrapolateRight: "clamp"});
  const sheen = interpolate(frame % 72, [0, 71], [-45, 145]);
  const ringScale = interpolate(frame, [0, 169], [0.72, 1.35], {extrapolateRight: "clamp"});

  return (
    <AbsoluteFill style={{backgroundColor: palette.black, overflow: "hidden"}}>
      <Img
        src={staticFile("brand/clinic-reception.webp")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          transform: `scale(${zoom})`,
          filter: "grayscale(.32) contrast(1.18) brightness(.3)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 34%, rgba(199,163,92,.3), transparent 35%), linear-gradient(180deg, rgba(0,0,0,.38), rgba(2,2,2,.93) 84%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          border: "1px solid rgba(234,215,167,.22)",
          left: 190,
          top: 210,
          transform: `scale(${ringScale})`,
          boxShadow: "0 0 90px rgba(199,163,92,.08), inset 0 0 80px rgba(199,163,92,.06)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 68,
          right: 68,
          top: 126,
          bottom: 155,
          border: "1px solid rgba(199,163,92,.44)",
          background: "rgba(0,0,0,.54)",
          backdropFilter: "blur(13px)",
          padding: "70px 58px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          transform: `scale(${interpolate(enter, [0, 1], [.94, 1])})`,
          opacity: enter,
          boxShadow: "0 35px 120px rgba(0,0,0,.58)",
        }}
      >
        <Img src={staticFile("brand/hsa-logo.png")} style={{width: 158, height: 158, objectFit: "contain"}} />
        <div style={{fontFamily: sans, fontSize: 20, letterSpacing: 7, color: palette.goldLight, fontWeight: 700, textTransform: "uppercase", marginTop: 28}}>
          Free / private / around 60 seconds
        </div>
        <div style={{fontFamily: serif, fontSize: 98, lineHeight: 0.91, color: palette.ink, fontWeight: 800, marginTop: 46}}>
          Check the change
          <br />
          <span style={{color: palette.gold}}>before the gap.</span>
        </div>
        <div style={{fontFamily: sans, fontSize: 28, lineHeight: 1.45, color: palette.muted, marginTop: 38, maxWidth: 700}}>
          One photo can make the visible pattern easier to understand.
        </div>
        <div
          style={{
            position: "relative",
            width: "100%",
            marginTop: 58,
            padding: "33px 30px",
            borderRadius: 999,
            background: `linear-gradient(120deg, ${palette.goldLight}, ${palette.gold})`,
            boxShadow: "0 24px 80px rgba(199,163,92,.34)",
            overflow: "hidden",
            transform: `scale(${interpolate(buttonIn, [0, 1], [.82, 1])})`,
            opacity: buttonIn,
            fontFamily: sans,
            fontSize: 31,
            color: "#080706",
            fontWeight: 900,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Start free now&nbsp;&nbsp;→
          <div
            style={{
              position: "absolute",
              top: -50,
              bottom: -50,
              left: `${sheen}%`,
              width: 100,
              transform: "skewX(-18deg)",
              background: "rgba(255,255,255,.5)",
              filter: "blur(9px)",
            }}
          />
        </div>
        <div style={{fontFamily: sans, fontSize: 18, letterSpacing: 4, color: palette.muted, textTransform: "uppercase", marginTop: 36}}>
          Harley Street Aesthetics / London &amp; Glasgow
        </div>
      </div>
    </AbsoluteFill>
  );
};
