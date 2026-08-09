import {AbsoluteFill, interpolate, staticFile, useCurrentFrame} from "remotion";
import {Video} from "@remotion/media";
import {FilmTexture} from "../effects/FilmTexture";
import {GlitchTitle} from "../effects/GlitchTitle";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 47], [1.18, 1.04], {extrapolateRight: "clamp"});

  return (
    <AbsoluteFill style={{backgroundColor: "#050505", overflow: "hidden"}}>
      <Video
        src={staticFile("source/clinic/exosome-procedure.mp4")}
        trimBefore={90 * 30}
        muted
        playbackRate={0.72}
        objectFit="cover"
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${zoom})`,
          filter: "contrast(1.24) saturate(.55) brightness(.52)",
        }}
      />
      <AbsoluteFill style={{background: "linear-gradient(180deg, rgba(0,0,0,.08), rgba(0,0,0,.88) 62%, #050505 88%)"}} />
      <div style={{position: "absolute", left: 82, right: 70, bottom: 225}}>
        <GlitchTitle line1="Not" line2="bald." />
      </div>
      <FilmTexture />
    </AbsoluteFill>
  );
};
