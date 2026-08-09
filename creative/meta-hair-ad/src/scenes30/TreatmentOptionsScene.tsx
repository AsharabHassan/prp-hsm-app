import {Video} from "@remotion/media";
import {
  AbsoluteFill,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {palette, sans, serif} from "../theme";

export const TreatmentOptionsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const titleIn = spring({fps, frame: frame - 5, config: {damping: 17, stiffness: 190}});
  const cardsIn = spring({fps, frame: frame - 55, config: {damping: 18, stiffness: 175}});
  const scan = interpolate(frame % 60, [0, 59], [170, 1670]);
  const insetScale = interpolate(frame, [0, 164], [1.02, 1.11], {extrapolateRight: "clamp"});

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
          transform: "scale(1.13)",
          filter: "contrast(1.2) saturate(.72) brightness(.4)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,.28), rgba(0,0,0,.68) 42%, rgba(2,2,2,.97) 82%), radial-gradient(circle at 82% 25%, rgba(100,233,255,.2), transparent 30%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 310,
          height: 480,
          right: 70,
          top: 170,
          border: "2px solid rgba(234,215,167,.46)",
          overflow: "hidden",
          boxShadow: "0 30px 90px rgba(0,0,0,.6)",
          transform: "rotate(2deg)",
        }}
      >
        <Video
          src={staticFile("source/clinic/exosome-procedure.mp4")}
          trimBefore={0}
          muted
          objectFit="cover"
          style={{
            width: "100%",
            height: "100%",
            objectPosition: "50% 18%",
            transform: `scale(${insetScale})`,
            filter: "contrast(1.1) saturate(.8) brightness(.78)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 16,
            right: 16,
            bottom: 16,
            padding: "12px 14px",
            background: "rgba(0,0,0,.82)",
            fontFamily: sans,
            fontSize: 15,
            letterSpacing: 3,
            color: palette.goldLight,
            textTransform: "uppercase",
          }}
        >
          Real clinician / real clinic
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 72,
          top: 160,
          width: 630,
          transform: `translateY(${interpolate(titleIn, [0, 1], [70, 0])}px)`,
          opacity: titleIn,
        }}
      >
        <div style={{fontFamily: sans, fontSize: 22, letterSpacing: 7, color: palette.goldLight, textTransform: "uppercase", fontWeight: 700}}>
          Doctor-led decision
        </div>
        <div style={{fontFamily: serif, fontSize: 105, lineHeight: 0.9, color: palette.ink, fontWeight: 800, marginTop: 25}}>
          Pattern first.
          <br />
          <span style={{color: palette.gold}}>Treatment second.</span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 55,
          right: 55,
          top: 845,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          transform: `translateY(${interpolate(cardsIn, [0, 1], [120, 0])}px)`,
          opacity: cardsIn,
        }}
      >
        <div
          style={{
            minHeight: 440,
            padding: "45px 34px",
            border: "1px solid rgba(199,163,92,.52)",
            background: "linear-gradient(155deg, rgba(19,16,10,.96), rgba(3,3,3,.8))",
            boxShadow: "inset 0 0 55px rgba(199,163,92,.08)",
          }}
        >
          <div style={{fontFamily: sans, fontSize: 18, letterSpacing: 6, color: palette.muted}}>OPTION 01</div>
          <div style={{fontFamily: sans, fontSize: 91, lineHeight: 0.9, fontWeight: 900, color: palette.gold, marginTop: 34}}>PRP</div>
          <div style={{fontFamily: sans, fontSize: 25, lineHeight: 1.3, color: palette.ink, fontWeight: 700, marginTop: 25}}>
            Platelet-rich plasma
          </div>
          <div style={{height: 1, background: "rgba(199,163,92,.35)", margin: "30px 0"}} />
          <div style={{fontFamily: sans, fontSize: 18, lineHeight: 1.6, color: palette.muted, letterSpacing: 2}}>
            DISCUSSED ONLY AFTER ASSESSMENT
          </div>
        </div>
        <div
          style={{
            minHeight: 440,
            padding: "45px 34px",
            border: "1px solid rgba(100,233,255,.42)",
            background: "linear-gradient(155deg, rgba(8,20,22,.96), rgba(3,3,3,.82))",
            boxShadow: "inset 0 0 55px rgba(100,233,255,.07)",
          }}
        >
          <div style={{fontFamily: sans, fontSize: 18, letterSpacing: 6, color: palette.muted}}>OPTION 02</div>
          <div style={{fontFamily: sans, fontSize: 61, lineHeight: 0.9, fontWeight: 900, color: palette.cyan, marginTop: 45}}>EXOSOME</div>
          <div style={{fontFamily: sans, fontSize: 25, lineHeight: 1.3, color: palette.ink, fontWeight: 700, marginTop: 30}}>
            Clinician-led therapy
          </div>
          <div style={{height: 1, background: "rgba(100,233,255,.3)", margin: "30px 0"}} />
          <div style={{fontFamily: sans, fontSize: 18, lineHeight: 1.6, color: palette.muted, letterSpacing: 2}}>
            AUTHENTIC EXOSOME FOOTAGE SHOWN
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          top: scan,
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(100,233,255,.8), transparent)",
          boxShadow: "0 0 24px rgba(100,233,255,.72)",
          opacity: 0.55,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 72,
          right: 72,
          bottom: 190,
          textAlign: "center",
          fontFamily: sans,
          fontSize: 20,
          letterSpacing: 5,
          color: palette.goldLight,
          textTransform: "uppercase",
        }}
      >
        Only when clinically appropriate
      </div>
    </AbsoluteFill>
  );
};
