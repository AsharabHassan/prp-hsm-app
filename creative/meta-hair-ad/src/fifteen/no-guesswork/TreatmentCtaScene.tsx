import {Video} from "@remotion/media";
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

export const TreatmentCtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({fps, frame: frame - 4, config: {damping: 16, stiffness: 165}});
  const button = spring({fps, frame: frame - 47, config: {damping: 15, stiffness: 200}});
  const sheen = interpolate(frame % 64, [0, 63], [-40, 140]);

  return (
    <AbsoluteFill style={{backgroundColor: palette.black, overflow: "hidden"}}>
      <Img
        src={staticFile("brand/wellness-clinic.webp")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: interpolate(frame, [0, 129], [1.13, 1.04], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}),
          filter: "grayscale(.35) brightness(.25) contrast(1.2)",
        }}
      />
      <AbsoluteFill style={{background: "radial-gradient(circle at 50% 33%, rgba(199,163,92,.25), transparent 37%), linear-gradient(180deg, rgba(0,0,0,.32), #050505 86%)"}} />
      <div style={{position: "absolute", right: 78, top: 120, width: 220, height: 290, overflow: "hidden", border: "1px solid rgba(234,215,167,.4)"}}>
        <Video
          src={staticFile("source/clinic/exosome-procedure.mp4")}
          trimBefore={0}
          muted
          objectFit="cover"
          style={{width: "100%", height: "100%", objectPosition: "50% 12%", filter: "brightness(.7) saturate(.7)"}}
        />
        <div style={{position: "absolute", left: 0, right: 0, bottom: 0, height: 105, background: "linear-gradient(transparent, #050505)"}} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 66,
          right: 66,
          top: 105,
          bottom: 330,
          border: "1px solid rgba(199,163,92,.42)",
          background: "rgba(0,0,0,.53)",
          backdropFilter: "blur(13px)",
          padding: "64px 52px",
          opacity: enter,
          scale: interpolate(enter, [0, 1], [0.95, 1]),
        }}
      >
        <Img src={staticFile("brand/hsw-logo.png")} style={{width: 125, height: 125, objectFit: "contain"}} />
        <div style={{display: "flex", gap: 13, marginTop: 36}}>
          <div style={{padding: "13px 19px", border: "1px solid rgba(199,163,92,.5)", color: palette.goldLight, fontFamily: sans, fontSize: 19, letterSpacing: 4, fontWeight: 800}}>PRP</div>
          <div style={{padding: "13px 19px", border: "1px solid rgba(100,233,255,.44)", color: palette.cyan, fontFamily: sans, fontSize: 19, letterSpacing: 3, fontWeight: 800}}>EXOSOMES</div>
        </div>
        <div style={{fontFamily: serif, fontSize: 91, lineHeight: 0.9, color: palette.ink, fontWeight: 800, marginTop: 42}}>
          One clearer
          <br />
          <span style={{color: palette.gold}}>next step.</span>
        </div>
        <div style={{fontFamily: sans, fontSize: 28, lineHeight: 1.35, color: palette.muted, marginTop: 34, maxWidth: 720}}>
          Explore options only when a clinician says they are appropriate.
        </div>
        <div
          style={{
            position: "relative",
            marginTop: 48,
            padding: "29px 24px",
            borderRadius: 999,
            overflow: "hidden",
            background: `linear-gradient(120deg, ${palette.goldLight}, ${palette.gold})`,
            color: "#080706",
            fontFamily: sans,
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: 3,
            textAlign: "center",
            textTransform: "uppercase",
            opacity: button,
            scale: interpolate(button, [0, 1], [0.82, 1]),
          }}
        >
          Analyse free now →
          <div style={{position: "absolute", top: -40, bottom: -40, left: `${sheen}%`, width: 90, background: "rgba(255,255,255,.48)", rotate: "12deg", filter: "blur(9px)"}} />
        </div>
        <div
          style={{
            marginTop: 26,
            color: palette.muted,
            fontFamily: sans,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: 2.4,
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Harley Street Medical Wellness
        </div>
      </div>
    </AbsoluteFill>
  );
};
