import {Audio, Video} from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  Series,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {palette, sans, serif} from "../../theme";
import {FifteenCaptions} from "../FifteenCaptions";

export const ANALYSIS_HOW_TO_15_DURATION = 450;

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const SectionLabel: React.FC<{children: React.ReactNode; dark?: boolean}> = ({
  children,
  dark = true,
}) => (
  <div
    style={{
      color: dark ? palette.goldLight : "#725722",
      fontFamily: sans,
      fontSize: 19,
      fontWeight: 900,
      letterSpacing: 6,
      textTransform: "uppercase",
    }}
  >
    {children}
  </div>
);

const AnalysisHookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({
    fps,
    frame: frame - 2,
    config: {damping: 17, mass: 0.82, stiffness: 148},
  });
  const line = interpolate(frame, [5, 37], [0, 100], clamp);

  return (
    <AbsoluteFill
      style={{backgroundColor: palette.black, overflow: "hidden", fontFamily: sans}}
    >
      <Img
        src={staticFile("brand/hair-analysis-hero.webp")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "68% center",
          scale: interpolate(frame, [0, 71], [1.16, 1.07], clamp),
          filter: "contrast(1.13) saturate(.78) brightness(.64)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,.97) 0%, rgba(0,0,0,.78) 47%, rgba(0,0,0,.2) 78%), linear-gradient(180deg, rgba(0,0,0,.22), rgba(0,0,0,.92) 92%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 70,
          top: 170,
          width: 720,
          opacity: enter,
          transform: `translateY(${interpolate(enter, [0, 1], [36, 0], clamp)}px)`,
        }}
      >
        <SectionLabel>HSA / Free hair analysis</SectionLabel>
        <div
          style={{
            marginTop: 34,
            color: palette.ink,
            fontFamily: serif,
            fontSize: 112,
            fontWeight: 800,
            letterSpacing: -5,
            lineHeight: 0.91,
          }}
        >
          One photo.
          <br />
          <span style={{color: palette.goldLight}}>More context.</span>
        </div>
        <div
          style={{
            width: `${line}%`,
            maxWidth: 540,
            height: 4,
            marginTop: 38,
            background: `linear-gradient(90deg, ${palette.gold}, transparent)`,
            boxShadow: "0 0 24px rgba(199,163,92,.65)",
          }}
        />
        <div
          style={{
            marginTop: 35,
            width: 600,
            color: "#dedbd3",
            fontSize: 31,
            fontWeight: 600,
            lineHeight: 1.3,
          }}
        >
          See what the analysis organises before you speak with a clinician.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 1260,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          borderTop: "1px solid rgba(234,215,167,.46)",
          borderBottom: "1px solid rgba(234,215,167,.22)",
          background: "rgba(3,3,3,.7)",
          backdropFilter: "blur(10px)",
        }}
      >
        {["Visible signs", "Organised report", "Next-step questions"].map(
          (item, index) => (
            <div
              key={item}
              style={{
                padding: "23px 16px",
                color: index === 1 ? palette.goldLight : palette.ink,
                borderLeft:
                  index === 0 ? undefined : "1px solid rgba(234,215,167,.2)",
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: 1.6,
                lineHeight: 1.2,
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              {item}
            </div>
          ),
        )}
      </div>
    </AbsoluteFill>
  );
};

const HeadTopGuide: React.FC = () => {
  const frame = useCurrentFrame();
  const scan = interpolate(frame % 42, [0, 41], [-170, 240]);
  const pulse = interpolate(frame % 36, [0, 18, 35], [0.42, 1, 0.42]);

  return (
    <div
      style={{
        position: "absolute",
        left: 55,
        top: 165,
        width: 485,
        height: 650,
        overflow: "hidden",
        borderRadius: 28,
        border: "2px solid rgba(234,215,167,.35)",
        background:
          "radial-gradient(circle at 50% 58%, rgba(199,163,92,.17), transparent 41%), linear-gradient(155deg, #161513, #050505)",
        boxShadow: "0 30px 80px rgba(0,0,0,.45)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 68,
          top: 44,
          width: 350,
          height: 136,
          borderRadius: 28,
          border: "3px solid rgba(234,215,167,.8)",
          background: "linear-gradient(160deg, #2e2b26, #080808)",
          boxShadow: "0 18px 34px rgba(0,0,0,.6)",
        }}
      >
        {[0, 1, 2].map((lens) => (
          <div
            key={lens}
            style={{
              position: "absolute",
              left: 28 + lens * 49,
              top: 35,
              width: 37,
              height: 37,
              borderRadius: "50%",
              border: "4px solid #42423f",
              background: "radial-gradient(circle at 35% 30%, #496377, #071018 58%)",
              boxShadow: "0 0 0 2px #050505",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            right: 28,
            top: 48,
            color: palette.goldLight,
            fontFamily: sans,
            fontSize: 15,
            fontWeight: 900,
            letterSpacing: 3,
          }}
        >
          CAMERA DOWN
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 167,
          top: 178,
          width: 150,
          height: 110,
          borderLeft: "2px dashed rgba(234,215,167,.65)",
          borderRight: "2px dashed rgba(234,215,167,.65)",
          transform: "perspective(260px) rotateX(-18deg)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 109,
          top: 272,
          width: 267,
          height: 321,
          borderRadius: "48% 48% 44% 44% / 40% 40% 56% 56%",
          background:
            "radial-gradient(circle at 50% 37%, #463b2f 0%, #211a15 32%, #0b0907 66%, #030303 100%)",
          border: "4px solid rgba(234,215,167,.7)",
          boxShadow:
            "0 0 0 15px rgba(199,163,92,.07), 0 30px 60px rgba(0,0,0,.65)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 126,
            top: 27,
            width: 8,
            height: 235,
            borderRadius: 999,
            background:
              "linear-gradient(180deg, rgba(234,215,167,.76), rgba(199,163,92,.08))",
            filter: "blur(1px)",
            opacity: 0.75,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -16,
            right: -16,
            top: scan,
            height: 4,
            background: `linear-gradient(90deg, transparent, ${palette.goldLight}, transparent)`,
            boxShadow: "0 0 20px rgba(234,215,167,.9)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 71,
          right: 71,
          bottom: 18,
          padding: "14px 18px",
          color: palette.goldLight,
          border: "1px solid rgba(234,215,167,.3)",
          background: "rgba(0,0,0,.7)",
          fontFamily: sans,
          fontSize: 15,
          fontWeight: 900,
          letterSpacing: 4,
          textAlign: "center",
          textTransform: "uppercase",
          opacity: pulse,
        }}
      >
        Top and hairline visible
      </div>
    </div>
  );
};

const PhotoGuideScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({
    fps,
    frame,
    config: {damping: 18, mass: 0.82, stiffness: 160},
  });

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        color: "#090806",
        background:
          "radial-gradient(circle at 82% 22%, rgba(255,255,255,.8), transparent 26%), linear-gradient(150deg, #f3ecdc, #d4c5a5)",
        fontFamily: sans,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 132,
          opacity: enter,
          transform: `translateY(${interpolate(enter, [0, 1], [28, 0], clamp)}px)`,
        }}
      >
        <SectionLabel dark={false}>How to take the photo</SectionLabel>
        <div
          style={{
            marginTop: 18,
            fontFamily: serif,
            fontSize: 82,
            fontWeight: 800,
            letterSpacing: -3.6,
            lineHeight: 0.94,
          }}
        >
          Camera above.
          <br />
          <span style={{color: "#80601f"}}>Head clearly in frame.</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 410,
          height: 900,
          borderRadius: 38,
          border: "1px solid rgba(55,39,10,.22)",
          background: "rgba(255,252,246,.56)",
          boxShadow: "0 34px 90px rgba(77,51,7,.18)",
          opacity: enter,
          transform: `scale(${interpolate(enter, [0, 1], [0.96, 1], clamp)})`,
        }}
      >
        <HeadTopGuide />

        <div
          style={{
            position: "absolute",
            right: 42,
            top: 164,
            width: 315,
            height: 646,
            overflow: "hidden",
            borderRadius: 38,
            border: "10px solid #090909",
            background: "#080808",
            boxShadow: "0 30px 70px rgba(0,0,0,.28)",
          }}
        >
          <Sequence durationInFrames={70}>
            <Img
              src={staticFile("guide/guide-man-correct.webp")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                scale: interpolate(frame, [0, 69], [1.015, 1.045], clamp),
              }}
            />
          </Sequence>
          <Sequence from={70} durationInFrames={65}>
            <Img
              src={staticFile("guide/guide-woman-correct.webp")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                scale: interpolate(frame, [70, 134], [1.015, 1.045], clamp),
              }}
            />
          </Sequence>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 80,
              background: "linear-gradient(180deg, rgba(0,0,0,.65), transparent)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 20,
              right: 20,
              bottom: 19,
              padding: "13px 10px",
              borderRadius: 999,
              color: "#080706",
              background: palette.goldLight,
              fontSize: 15,
              fontWeight: 950,
              letterSpacing: 2.4,
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            Real app guide
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 1345,
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 12,
        }}
      >
        {["Even light", "Hair moved aside", "Hold steady"].map((rule, index) => (
          <div
            key={rule}
            style={{
              padding: "18px 8px",
              border: "2px solid #16120a",
              background: index === 1 ? "#16120a" : "rgba(255,252,245,.62)",
              color: index === 1 ? palette.goldLight : "#16120a",
              fontSize: 17,
              fontWeight: 900,
              letterSpacing: 2.2,
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {String(index + 1).padStart(2, "0")} / {rule}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const PhotoQualityScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({
    fps,
    frame,
    config: {damping: 17, mass: 0.8, stiffness: 175},
  });

  const cards = [
    {
      src: "guide/guide-wrong.webp",
      label: "Avoid",
      note: "Too far / hair covering view",
      color: palette.red,
      mark: "X",
    },
    {
      src: "guide/guide-man-correct.webp",
      label: "Use this",
      note: "Close / clear / evenly lit",
      color: palette.goldLight,
      mark: "CHECK",
    },
  ];

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background:
          "radial-gradient(circle at 50% 45%, rgba(199,163,92,.15), transparent 38%), #050505",
        fontFamily: sans,
      }}
    >
      <div style={{position: "absolute", left: 70, right: 70, top: 130}}>
        <SectionLabel>Photo quality check</SectionLabel>
        <div
          style={{
            marginTop: 15,
            color: palette.ink,
            fontFamily: serif,
            fontSize: 80,
            fontWeight: 800,
            letterSpacing: -3,
          }}
        >
          Clear beats perfect.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 370,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 25,
        }}
      >
        {cards.map((card, index) => (
          <div
            key={card.label}
            style={{
              position: "relative",
              height: 825,
              overflow: "hidden",
              border: `2px solid ${card.color}`,
              borderRadius: 26,
              background: "#080808",
              boxShadow: `0 30px 80px rgba(0,0,0,.55), 0 0 32px ${card.color}22`,
              opacity: enter,
              transform: `translateY(${interpolate(enter, [0, 1], [70 + index * 28, 0], clamp)}px)`,
            }}
          >
            <Img
              src={staticFile(card.src)}
              style={{
                width: "100%",
                height: 674,
                objectFit: "cover",
                objectPosition: "center top",
                filter: index === 0 ? "grayscale(.4) brightness(.67)" : "brightness(.91)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 22,
                top: 22,
                padding: "12px 16px",
                borderRadius: 999,
                color: index === 0 ? "white" : "#080706",
                background: card.color,
                fontSize: 17,
                fontWeight: 950,
                letterSpacing: 2.3,
                textTransform: "uppercase",
              }}
            >
              {card.mark}
            </div>
            <div
              style={{
                padding: "19px 24px 0",
                color: card.color,
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: 3.2,
                textTransform: "uppercase",
              }}
            >
              {card.label}
            </div>
            <div
              style={{
                padding: "8px 24px",
                color: "#cac6bd",
                fontSize: 18,
                fontWeight: 650,
                lineHeight: 1.25,
              }}
            >
              {card.note}
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const ValueCard: React.FC<{
  number: string;
  title: string;
  body: string;
  delay: number;
}> = ({number, title, body, delay}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({
    fps,
    frame: frame - delay,
    config: {damping: 18, mass: 0.78, stiffness: 185},
  });

  return (
    <div
      style={{
        position: "relative",
        padding: "27px 25px 24px 76px",
        borderLeft: `3px solid ${palette.gold}`,
        background: "linear-gradient(100deg, rgba(199,163,92,.13), rgba(255,255,255,.025))",
        opacity: enter,
        transform: `translateX(${interpolate(enter, [0, 1], [40, 0], clamp)}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 20,
          top: 27,
          color: palette.goldLight,
          fontSize: 18,
          fontWeight: 900,
          letterSpacing: 2,
        }}
      >
        {number}
      </div>
      <div
        style={{
          color: palette.ink,
          fontSize: 25,
          fontWeight: 900,
          letterSpacing: -0.3,
        }}
      >
        {title}
      </div>
      <div
        style={{
          marginTop: 8,
          color: palette.muted,
          fontSize: 17,
          fontWeight: 600,
          lineHeight: 1.3,
        }}
      >
        {body}
      </div>
    </div>
  );
};

const AnalysisValueScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        color: palette.ink,
        background:
          "radial-gradient(circle at 18% 45%, rgba(100,233,255,.08), transparent 34%), radial-gradient(circle at 78% 16%, rgba(199,163,92,.15), transparent 30%), #050505",
        fontFamily: sans,
      }}
    >
      <div style={{position: "absolute", left: 65, right: 65, top: 126}}>
        <SectionLabel>What the analysis does</SectionLabel>
        <div
          style={{
            marginTop: 13,
            fontFamily: serif,
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: -3,
            lineHeight: 0.96,
          }}
        >
          Turns a photo into a
          <br />
          <span style={{color: palette.goldLight}}>structured starting point.</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 65,
          top: 410,
          width: 470,
          height: 930,
          overflow: "hidden",
          border: "10px solid #11100e",
          borderRadius: 62,
          background: "#050505",
          boxShadow:
            "0 38px 100px rgba(0,0,0,.7), 0 0 0 2px rgba(234,215,167,.45)",
          transform: `rotate(${interpolate(frame, [0, 107], [-1.4, 0.6], clamp)}deg)`,
        }}
      >
        <Video
          src={staticFile("source/app/hair-analysis-report-scroll.mp4")}
          muted
          playbackRate={1.35}
          objectFit="cover"
          style={{width: "100%", height: "100%"}}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 15,
            width: 136,
            height: 34,
            borderRadius: 999,
            background: "#030303",
            transform: "translateX(-50%)",
            border: "1px solid rgba(255,255,255,.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 20,
            right: 20,
            bottom: 20,
            padding: "13px",
            color: palette.goldLight,
            border: "1px solid rgba(234,215,167,.35)",
            background: "rgba(0,0,0,.8)",
            fontSize: 14,
            fontWeight: 900,
            letterSpacing: 3,
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Real report screen
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 575,
          right: 58,
          top: 480,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <ValueCard
          number="01"
          title="Organises visible signs"
          body="A structured photo pre-assessment, not a diagnosis."
          delay={4}
        />
        <ValueCard
          number="02"
          title="Surfaces useful questions"
          body="Know what to discuss during a clinical consultation."
          delay={15}
        />
        <ValueCard
          number="03"
          title="Makes the next step clearer"
          body="Treatment suitability is decided with a clinician."
          delay={26}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 575,
          right: 58,
          top: 1136,
          paddingTop: 22,
          borderTop: "1px solid rgba(234,215,167,.32)",
          color: palette.goldLight,
          fontSize: 17,
          fontWeight: 900,
          letterSpacing: 3.2,
          lineHeight: 1.35,
          textTransform: "uppercase",
        }}
      >
        Value: a more informed conversation, sooner.
      </div>
    </AbsoluteFill>
  );
};

const AnalysisCtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({
    fps,
    frame,
    config: {damping: 16, mass: 0.82, stiffness: 170},
  });
  const button = spring({
    fps,
    frame: frame - 12,
    config: {damping: 15, mass: 0.78, stiffness: 205},
  });

  return (
    <AbsoluteFill style={{background: palette.black, overflow: "hidden"}}>
      <Img
        src={staticFile("brand/hair-analysis-hero.webp")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "68% center",
          scale: interpolate(frame, [0, 59], [1.18, 1.09], clamp),
          filter: "grayscale(.18) contrast(1.18) brightness(.32)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(199,163,92,.27), transparent 31%), linear-gradient(180deg, rgba(0,0,0,.25), rgba(0,0,0,.96) 86%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 68,
          right: 68,
          top: 250,
          height: 960,
          padding: "52px 50px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          border: "1px solid rgba(234,215,167,.46)",
          background: "rgba(0,0,0,.65)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 36px 110px rgba(0,0,0,.6)",
          opacity: enter,
          transform: `scale(${interpolate(enter, [0, 1], [0.93, 1], clamp)})`,
        }}
      >
        <Img
          src={staticFile("brand/hsa-logo.png")}
          style={{width: 132, height: 132, objectFit: "contain"}}
        />
        <div
          style={{
            marginTop: 22,
            color: palette.goldLight,
            fontFamily: sans,
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          One clear photo / around 60 seconds
        </div>
        <div
          style={{
            marginTop: 34,
            color: palette.ink,
            fontFamily: serif,
            fontSize: 89,
            fontWeight: 800,
            letterSpacing: -4,
            lineHeight: 0.91,
          }}
        >
          See the value
          <br />
          <span style={{color: palette.gold}}>for yourself.</span>
        </div>
        <div
          style={{
            position: "relative",
            width: "100%",
            marginTop: 48,
            padding: "28px 24px",
            overflow: "hidden",
            borderRadius: 999,
            color: "#080706",
            background: `linear-gradient(115deg, ${palette.goldLight}, ${palette.gold})`,
            boxShadow: "0 22px 75px rgba(199,163,92,.34)",
            opacity: button,
            transform: `scale(${interpolate(button, [0, 1], [0.8, 1], clamp)})`,
            fontFamily: sans,
            fontSize: 29,
            fontWeight: 950,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Start free analysis
          <div
            style={{
              position: "absolute",
              top: -48,
              bottom: -48,
              left: `${interpolate(frame % 42, [0, 41], [-35, 145])}%`,
              width: 95,
              background: "rgba(255,255,255,.5)",
              transform: "skewX(-18deg)",
              filter: "blur(8px)",
            }}
          />
        </div>
        <div
          style={{
            marginTop: 27,
            color: palette.muted,
            fontFamily: sans,
            fontSize: 17,
            fontWeight: 800,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Private to start / HSA
        </div>
      </div>
    </AbsoluteFill>
  );
};

const LegalLine: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [112, 132, 428, 449], [0, 0.9, 0.9, 0], clamp);

  return (
    <div
      style={{
        position: "absolute",
        left: 54,
        right: 54,
        bottom: 210,
        padding: "11px 15px",
        color: "#d4d0c8",
        borderTop: "1px solid rgba(234,215,167,.25)",
        background: "rgba(0,0,0,.82)",
        opacity,
        fontFamily: sans,
        fontSize: 20,
        fontWeight: 650,
        letterSpacing: 0.7,
        lineHeight: 1.28,
        textAlign: "center",
      }}
    >
      AI photo pre-assessment only - not a diagnosis or treatment recommendation.
      Clinician review required. Suitability and results vary. 18+.
    </div>
  );
};

const ProgressRail: React.FC = () => {
  const frame = useCurrentFrame();
  const step = frame < 72 ? "VALUE" : frame < 207 ? "PHOTO" : frame < 282 ? "CHECK" : frame < 390 ? "REPORT" : "START";

  return (
    <div
      style={{
        position: "absolute",
        left: 58,
        right: 58,
        top: 54,
        color: palette.goldLight,
        fontFamily: sans,
        textTransform: "uppercase",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 16,
          fontWeight: 900,
          letterSpacing: 4.5,
          textShadow: "0 2px 12px rgba(0,0,0,.9)",
        }}
      >
        <span>HSA / How it works</span>
        <span>{step}</span>
      </div>
      <div
        style={{
          height: 5,
          marginTop: 14,
          overflow: "hidden",
          background: "rgba(255,255,255,.2)",
          boxShadow: "0 2px 12px rgba(0,0,0,.42)",
        }}
      >
        <div
          style={{
            width: `${interpolate(frame, [0, 449], [1, 100], clamp)}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${palette.gold}, ${palette.goldLight})`,
            boxShadow: "0 0 16px rgba(199,163,92,.72)",
          }}
        />
      </div>
    </div>
  );
};

const Impact: React.FC<{at: number; volume?: number}> = ({at, volume = 0.3}) => (
  <Sequence from={at} durationInFrames={25}>
    <Audio src={staticFile("audio/cinematic-impact.wav")} volume={volume} />
  </Sequence>
);

export const AnalysisHowTo15: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: palette.black}}>
      <Audio
        src={staticFile("audio/cinematic-bed-30.wav")}
        trimBefore={150}
        volume={(frame) =>
          interpolate(frame, [0, 14, 410, 449], [0.08, 0.125, 0.125, 0], clamp)
        }
      />

      <Series>
        <Series.Sequence durationInFrames={72}>
          <AnalysisHookScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={135}>
          <PhotoGuideScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={75}>
          <PhotoQualityScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={108}>
          <AnalysisValueScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={60}>
          <AnalysisCtaScene />
        </Series.Sequence>
      </Series>

      <Sequence from={3} durationInFrames={447}>
        <Audio src={staticFile("audio/vo-15-analysis-howto.mp3")} volume={1} />
      </Sequence>

      <Sequence from={92} durationInFrames={28}>
        <Audio src={staticFile("audio/shutter.wav")} volume={0.34} />
      </Sequence>
      <Sequence from={190} durationInFrames={34}>
        <Audio src={staticFile("audio/cinematic-riser.wav")} volume={0.18} />
      </Sequence>
      <Sequence from={292} durationInFrames={28}>
        <Audio src={staticFile("audio/switch.wav")} volume={0.2} />
      </Sequence>
      <Impact at={0} volume={0.4} />
      <Impact at={72} volume={0.28} />
      <Impact at={207} volume={0.33} />
      <Impact at={282} volume={0.32} />
      <Impact at={390} volume={0.45} />

      <FifteenCaptions captionsFile="captions/15-analysis-howto.json" />
      <LegalLine />
      <ProgressRail />
    </AbsoluteFill>
  );
};
