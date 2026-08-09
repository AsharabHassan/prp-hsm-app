import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from "remotion";
import {FilmTexture} from "../effects/FilmTexture";
import {ScanHud} from "../effects/ScanHud";
import {palette, sans} from "../theme";

export const ProofScene: React.FC = () => {
  const frame = useCurrentFrame();
  const split = interpolate(frame, [8, 42], [76, 48], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const stamp = interpolate(frame, [27, 38], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});

  return (
    <AbsoluteFill style={{backgroundColor: palette.black, overflow: "hidden"}}>
      <Img
        src={staticFile("results/hair-before.webp")}
        style={{position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.08) brightness(.72)"}}
      />
      <div style={{position: "absolute", left: `${split}%`, top: 0, right: 0, bottom: 0, overflow: "hidden"}}>
        <Img
          src={staticFile("results/hair-after.webp")}
          style={{position: "absolute", right: 0, top: 0, width: 1080, height: 1920, objectFit: "cover", filter: "contrast(1.08) brightness(.76)"}}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: `${split}%`,
          top: 0,
          bottom: 0,
          width: 4,
          backgroundColor: palette.gold,
          boxShadow: `0 0 34px ${palette.gold}`,
        }}
      />
      <AbsoluteFill style={{background: "linear-gradient(180deg, rgba(0,0,0,.22), transparent 50%, rgba(0,0,0,.92))"}} />
      <ScanHud label="AUTHENTIC PATIENT IMAGERY" />
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          bottom: 235,
          color: palette.ink,
          fontFamily: sans,
          textTransform: "uppercase",
          transform: `scale(${interpolate(stamp, [0, 1], [1.25, 1])}) rotate(${interpolate(stamp, [0, 1], [-2, 0])}deg)`,
          opacity: stamp,
          transformOrigin: "left bottom",
        }}
      >
        <div style={{fontSize: 86, lineHeight: 0.92, fontWeight: 900}}>One photo.</div>
        <div style={{fontSize: 86, lineHeight: 0.92, fontWeight: 900, color: palette.gold}}>A clearer next step.</div>
        <div style={{fontSize: 20, marginTop: 28, letterSpacing: 4, fontWeight: 600, color: palette.muted}}>
          Individual outcomes vary · assessment is not a diagnosis
        </div>
      </div>
      <FilmTexture />
    </AbsoluteFill>
  );
};
