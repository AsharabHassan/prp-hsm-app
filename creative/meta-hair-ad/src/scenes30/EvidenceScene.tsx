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

export const EvidenceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const split = interpolate(frame, [12, 92], [88, 42], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardIn = spring({fps, frame: frame - 74, config: {damping: 18, stiffness: 170}});
  const titleIn = spring({fps, frame: frame - 6, config: {damping: 17, stiffness: 180}});

  return (
    <AbsoluteFill style={{backgroundColor: palette.black, overflow: "hidden"}}>
      <Img
        src={staticFile("results/hair-before.webp")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "52% center",
          filter: "contrast(1.18) saturate(.72) brightness(.63)",
          transform: "scale(1.17)",
        }}
      />
      <div style={{position: "absolute", left: `${split}%`, top: 0, right: 0, bottom: 0, overflow: "hidden"}}>
        <Img
          src={staticFile("results/hair-after.webp")}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 1080,
            height: 1920,
            objectFit: "cover",
            objectPosition: "52% center",
            filter: "contrast(1.18) saturate(.78) brightness(.68)",
            transform: "scale(1.17)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: `${split}%`,
          top: 0,
          bottom: 0,
          width: 4,
          background: palette.goldLight,
          boxShadow: `0 0 38px 9px ${palette.gold}`,
        }}
      />
      <AbsoluteFill style={{background: "linear-gradient(180deg, rgba(0,0,0,.42), transparent 45%, rgba(0,0,0,.96) 88%)"}} />
      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          top: 120,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: sans,
          fontSize: 20,
          letterSpacing: 5,
          color: palette.ink,
          textTransform: "uppercase",
        }}
      >
        <span>Before</span>
        <span style={{color: palette.goldLight}}>Clinic case / After</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          bottom: 300,
          transform: `translateY(${interpolate(titleIn, [0, 1], [80, 0])}px)`,
          opacity: titleIn,
        }}
      >
        <div style={{fontFamily: sans, fontSize: 22, letterSpacing: 7, color: palette.goldLight, fontWeight: 700, textTransform: "uppercase"}}>
          Sixty-second pre-assessment
        </div>
        <div style={{fontFamily: serif, fontSize: 96, lineHeight: 0.92, color: palette.ink, fontWeight: 800, marginTop: 25}}>
          See the change.
          <br />
          <span style={{color: palette.gold}}>Find the next step.</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          width: 268,
          height: 580,
          right: 54,
          top: 520,
          border: "10px solid #080808",
          borderRadius: 38,
          overflow: "hidden",
          boxShadow: "0 30px 100px rgba(0,0,0,.75), 0 0 0 1px rgba(234,215,167,.35)",
          transform: `translateX(${interpolate(cardIn, [0, 1], [330, 0])}px) rotate(3deg)`,
          opacity: cardIn,
        }}
      >
        <Img src={staticFile("app-capture/05-report-top.jpg")} style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center"}} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 70,
          bottom: 170,
          fontFamily: sans,
          fontSize: 17,
          color: palette.muted,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}
      >
        Individual outcomes vary / case images do not predict a result
      </div>
    </AbsoluteFill>
  );
};
