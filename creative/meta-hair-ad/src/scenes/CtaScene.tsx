import {AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from "remotion";
import {FilmTexture} from "../effects/FilmTexture";
import {palette, sans, serif} from "../theme";

export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({fps, frame: frame - 5, config: {damping: 16, stiffness: 150}});
  const sheen = interpolate(frame % 55, [0, 54], [-45, 145]);
  const bgZoom = interpolate(frame, [0, 85], [1.18, 1.08], {extrapolateRight: "clamp"});

  return (
    <AbsoluteFill style={{backgroundColor: palette.black, overflow: "hidden"}}>
      <Img
        src={staticFile("brand/wellness-clinic.webp")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${bgZoom})`,
          filter: "grayscale(.25) contrast(1.15) brightness(.32)",
        }}
      />
      <AbsoluteFill style={{background: "radial-gradient(circle at 50% 36%, rgba(199,163,92,.22), transparent 48%), linear-gradient(180deg, rgba(0,0,0,.35), #050505 88%)"}} />
      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          top: 182,
          bottom: 170,
          border: "1px solid rgba(199,163,92,.45)",
          background: "rgba(0,0,0,.54)",
          backdropFilter: "blur(10px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 55px",
          transform: `scale(${interpolate(enter, [0, 1], [.92, 1])})`,
          opacity: enter,
        }}
      >
        <Img src={staticFile("brand/hsw-logo.png")} style={{width: 195, height: 195, objectFit: "contain", marginBottom: 48}} />
        <div style={{fontFamily: sans, fontSize: 20, letterSpacing: 7, textTransform: "uppercase", color: palette.goldLight, fontWeight: 700}}>
          Free · private · 60 seconds
        </div>
        <div style={{fontFamily: serif, fontSize: 94, lineHeight: .97, textAlign: "center", color: palette.ink, marginTop: 30, fontWeight: 800}}>
          Check the change
          <br />
          <span style={{color: palette.gold}}>before the gap.</span>
        </div>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            marginTop: 68,
            padding: "31px 30px",
            borderRadius: 999,
            background: `linear-gradient(120deg, ${palette.goldLight}, ${palette.gold})`,
            color: "#090806",
            textAlign: "center",
            fontFamily: sans,
            fontSize: 30,
            fontWeight: 900,
            letterSpacing: 2,
            textTransform: "uppercase",
            boxShadow: "0 20px 70px rgba(199,163,92,.32)",
          }}
        >
          Start my hair analysis →
          <div
            style={{
              position: "absolute",
              top: -40,
              bottom: -40,
              left: `${sheen}%`,
              width: 90,
              background: "rgba(255,255,255,.45)",
              transform: "skewX(-20deg)",
              filter: "blur(8px)",
            }}
          />
        </div>
        <div style={{fontFamily: sans, fontSize: 18, letterSpacing: 3, marginTop: 34, textTransform: "uppercase", color: palette.muted}}>
          Harley Street Medical Wellness · London &amp; Glasgow
        </div>
      </div>
      <FilmTexture />
    </AbsoluteFill>
  );
};
