import {AbsoluteFill, interpolate, staticFile, useCurrentFrame} from "remotion";
import {Video} from "@remotion/media";
import {FilmTexture} from "../effects/FilmTexture";
import {GlitchTitle} from "../effects/GlitchTitle";
import {palette, sans} from "../theme";

export const DoctorScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 44], [1.05, 1.14], {extrapolateRight: "clamp"});

  return (
    <AbsoluteFill style={{backgroundColor: palette.black, overflow: "hidden"}}>
      <Video
        src={staticFile("source/clinic/exosome-procedure.mp4")}
        trimBefore={1 * 30}
        muted
        objectFit="cover"
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${zoom}) translateY(-1.5%)`,
          filter: "contrast(1.18) saturate(.72) brightness(.62)",
        }}
      />
      <AbsoluteFill style={{background: "linear-gradient(90deg, rgba(0,0,0,.78), transparent 74%)"}} />
      <AbsoluteFill style={{background: "linear-gradient(180deg, transparent 42%, rgba(0,0,0,.94) 62%, #050505 72%)"}} />
      <div style={{position: "absolute", left: 80, right: 55, bottom: 260}}>
        <GlitchTitle line1="Not too" goldLine="early." />
        <div
          style={{
            marginTop: 42,
            fontFamily: sans,
            color: palette.ink,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Doctor-led · non-surgical
        </div>
      </div>
      <FilmTexture />
    </AbsoluteFill>
  );
};
