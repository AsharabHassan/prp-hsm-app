import {AbsoluteFill, interpolate, staticFile, useCurrentFrame} from "remotion";
import {Video} from "@remotion/media";
import {FilmTexture} from "../effects/FilmTexture";
import {ScanHud} from "../effects/ScanHud";
import {palette, sans} from "../theme";

export const TreatmentScene: React.FC = () => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [5, 20], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  const zoom = interpolate(frame, [0, 69], [1.12, 1.25], {extrapolateRight: "clamp"});

  return (
    <AbsoluteFill style={{backgroundColor: palette.black, overflow: "hidden"}}>
      <Video
        src={staticFile("source/clinic/exosome-procedure.mp4")}
        trimBefore={35 * 30}
        muted
        playbackRate={0.78}
        objectFit="cover"
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${zoom})`,
          filter: "contrast(1.18) saturate(.78) brightness(.68)",
        }}
      />
      <AbsoluteFill style={{background: "linear-gradient(180deg, rgba(0,0,0,.26), transparent 50%, rgba(0,0,0,.92) 70%, #050505 78%)"}} />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 535,
          height: 122,
          background: "rgba(6,6,6,.9)",
          borderTop: "1px solid rgba(199,163,92,.38)",
          borderBottom: "1px solid rgba(199,163,92,.38)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: palette.goldLight,
          fontFamily: sans,
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: 6,
          textTransform: "uppercase",
        }}
      >
        Clinician-led scalp treatment · HSW
      </div>
      <ScanHud label="REAL CLINIC / REAL TREATMENT" />
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          bottom: 220,
          opacity: reveal,
          transform: `translateY(${interpolate(reveal, [0, 1], [28, 0])}px)`,
          color: palette.ink,
          fontFamily: sans,
          textTransform: "uppercase",
        }}
      >
        <div style={{fontSize: 27, letterSpacing: 8, color: palette.goldLight, fontWeight: 700}}>
          When the change is subtle
        </div>
        <div style={{fontSize: 78, lineHeight: 0.98, marginTop: 18, fontWeight: 900}}>
          that may be
          <br />
          the point.
        </div>
      </div>
      <FilmTexture />
    </AbsoluteFill>
  );
};
