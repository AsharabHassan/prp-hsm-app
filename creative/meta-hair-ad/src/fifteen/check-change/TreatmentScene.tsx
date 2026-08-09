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

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const CheckChangeTreatmentScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const titleIn = spring({fps, frame: frame - 2, config: {damping: 17, stiffness: 190}});
  const cardsIn = spring({fps, frame: frame - 27, config: {damping: 17, stiffness: 180}});
  const zoom = interpolate(frame, [0, 119], [1.06, 1.18], clamp);
  const scanY = interpolate(frame % 54, [0, 53], [160, 1700]);
  const prpGlow = interpolate(frame % 34, [0, 12, 23, 33], [0.2, 0.62, 0.34, 0.2]);
  const exosomeGlow = interpolate(frame % 40, [0, 14, 28, 39], [0.24, 0.72, 0.42, 0.24]);

  return (
    <AbsoluteFill style={{backgroundColor: palette.black, overflow: "hidden"}}>
      <Video
        src={staticFile("source/clinic/exosome-procedure.mp4")}
        trimBefore={210}
        muted
        objectFit="cover"
        style={{
          width: "100%",
          height: "100%",
          objectPosition: "50% 24%",
          scale: zoom,
          filter: "contrast(1.24) saturate(.72) brightness(.42)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,.25), rgba(0,0,0,.58) 40%, rgba(3,3,3,.95) 77%), radial-gradient(circle at 78% 28%, rgba(100,233,255,.18), transparent 31%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 108,
          opacity: titleIn,
          translate: `0 ${interpolate(titleIn, [0, 1], [42, 0], clamp)}px`,
          fontFamily: sans,
          textTransform: "uppercase",
        }}
      >
        <div style={{fontSize: 19, letterSpacing: 6, color: palette.goldLight, fontWeight: 800}}>
          Options to discuss with a clinician
        </div>
        <div style={{fontSize: 91, lineHeight: 0.9, color: palette.ink, fontWeight: 900, letterSpacing: -4, marginTop: 22}}>
          Pattern first.
          <br />
          <span style={{color: palette.gold}}>Treatment second.</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 62,
          right: 62,
          top: 860,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          opacity: cardsIn,
          translate: `0 ${interpolate(cardsIn, [0, 1], [90, 0], clamp)}px`,
          fontFamily: sans,
        }}
      >
        <div
          style={{
            minHeight: 400,
            padding: "38px 30px",
            border: "1px solid rgba(199,163,92,.62)",
            background: "linear-gradient(150deg, rgba(20,16,9,.94), rgba(3,3,3,.88))",
            boxShadow: `inset 0 0 65px rgba(199,163,92,${prpGlow * 0.18}), 0 25px 70px rgba(0,0,0,.42)`,
          }}
        >
          <div style={{fontSize: 17, letterSpacing: 5, color: palette.muted}}>OPTION 01</div>
          <div style={{fontSize: 100, lineHeight: 0.86, fontWeight: 900, color: palette.gold, marginTop: 30}}>PRP</div>
          <div style={{fontSize: 24, lineHeight: 1.3, fontWeight: 700, color: palette.ink, marginTop: 24}}>
            Platelet-rich plasma
          </div>
          <div style={{height: 1, background: "rgba(199,163,92,.35)", margin: "26px 0"}} />
          <div style={{fontSize: 16, lineHeight: 1.55, letterSpacing: 2, color: palette.muted}}>
            DISCUSSED AFTER CLINICAL ASSESSMENT
          </div>
        </div>

        <div
          style={{
            minHeight: 400,
            padding: "38px 30px",
            border: "1px solid rgba(100,233,255,.56)",
            background: "linear-gradient(150deg, rgba(7,20,23,.94), rgba(3,3,3,.88))",
            boxShadow: `inset 0 0 65px rgba(100,233,255,${exosomeGlow * 0.16}), 0 25px 70px rgba(0,0,0,.42)`,
          }}
        >
          <div style={{fontSize: 17, letterSpacing: 5, color: palette.muted}}>OPTION 02</div>
          <div style={{fontSize: 55, lineHeight: 0.9, fontWeight: 900, color: palette.cyan, marginTop: 42}}>EXOSOME</div>
          <div style={{fontSize: 24, lineHeight: 1.3, fontWeight: 700, color: palette.ink, marginTop: 29}}>
            Clinician-led therapy
          </div>
          <div style={{height: 1, background: "rgba(100,233,255,.3)", margin: "26px 0"}} />
          <div style={{fontSize: 16, lineHeight: 1.55, letterSpacing: 2, color: palette.muted}}>
            FOOTAGE SHOWN: EXOSOME PROCEDURE
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: scanY,
          height: 2,
          opacity: 0.55,
          background: "linear-gradient(90deg, transparent, rgba(100,233,255,.9), transparent)",
          boxShadow: "0 0 24px rgba(100,233,255,.72)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 1388,
          padding: "17px 20px",
          border: "1px solid rgba(234,215,167,.24)",
          backgroundColor: "rgba(0,0,0,.72)",
          color: palette.goldLight,
          fontFamily: sans,
          fontSize: 17,
          fontWeight: 800,
          letterSpacing: 4,
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        Authentic clinic footage / exosome procedure
      </div>
    </AbsoluteFill>
  );
};
