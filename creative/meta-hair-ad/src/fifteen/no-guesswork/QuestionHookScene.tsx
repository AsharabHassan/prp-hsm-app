import {Video} from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {palette, sans} from "../../theme";

export const QuestionHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const prpIn = spring({fps, frame: frame - 2, config: {damping: 15, stiffness: 220}});
  const exosomeIn = spring({fps, frame: frame - 19, config: {damping: 15, stiffness: 220}});
  const flash = interpolate(frame, [0, 2, 5, 20, 22, 25], [0.9, 0.12, 0, 0, 0.55, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{backgroundColor: palette.black, overflow: "hidden"}}>
      <Video
        src={staticFile("source/clinic/exosome-procedure.mp4")}
        trimBefore={300}
        muted
        objectFit="cover"
        style={{
          width: "100%",
          height: "100%",
          scale: 1.22,
          filter: "blur(18px) saturate(.42) brightness(.26) contrast(1.28)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 270,
          top: 108,
          width: 540,
          height: 960,
          overflow: "hidden",
          border: "1px solid rgba(234,215,167,.38)",
          boxShadow: "0 30px 110px rgba(0,0,0,.75)",
        }}
      >
        <Video
          src={staticFile("source/clinic/exosome-procedure.mp4")}
          trimBefore={300}
          muted
          objectFit="cover"
          style={{
            width: "100%",
            height: "100%",
            filter: "saturate(.72) brightness(.58) contrast(1.12)",
          }}
        />
        <div style={{position: "absolute", left: 0, right: 0, bottom: 0, height: 390, background: "linear-gradient(transparent, #050505 55%)"}} />
      </div>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.08) 35%, rgba(5,5,5,.92) 67%, #050505 100%)",
        }}
      />
      <div style={{position: "absolute", left: 72, right: 72, top: 130, fontFamily: sans, textTransform: "uppercase"}}>
        <div style={{fontSize: 21, letterSpacing: 8, color: palette.goldLight, fontWeight: 700}}>
          Treatment decoder / 01
        </div>
        <div
          style={{
            marginTop: 220,
            fontSize: 190,
            lineHeight: 0.78,
            color: palette.gold,
            fontWeight: 900,
            letterSpacing: -12,
            opacity: prpIn,
            translate: `${interpolate(prpIn, [0, 1], [-150, 0])}px 0px`,
          }}
        >
          PRP?
        </div>
        <div
          style={{
            marginTop: 72,
            fontSize: 123,
            lineHeight: 0.82,
            color: palette.cyan,
            fontWeight: 900,
            letterSpacing: -7,
            opacity: exosomeIn,
            translate: `${interpolate(exosomeIn, [0, 1], [160, 0])}px 0px`,
            textAlign: "right",
          }}
        >
          Exosomes?
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          bottom: 280,
          paddingTop: 28,
          borderTop: "1px solid rgba(234,215,167,.32)",
          fontFamily: sans,
          fontSize: 54,
          lineHeight: 1,
          color: palette.ink,
          fontWeight: 900,
          letterSpacing: 1,
          textTransform: "uppercase",
        }}
      >
        Start with clarity.
      </div>
      <AbsoluteFill style={{backgroundColor: `rgba(255,255,255,${flash})`, mixBlendMode: "screen"}} />
    </AbsoluteFill>
  );
};
