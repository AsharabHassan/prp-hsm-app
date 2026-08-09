import {Video} from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {PhoneCapture} from "../effects/PhoneCapture";
import {palette, sans} from "../theme";

const SCENE_DURATION = 240;

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const tapPulse = (frame: number, at: number) =>
  interpolate(frame, [at - 4, at, at + 8, at + 15], [0, 1, 0.36, 0], clamp);

const StillPlate: React.FC<{
  durationInFrames: number;
  src: string;
  zoomTo?: number;
}> = ({durationInFrames, src, zoomTo = 1.035}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 7], [0, 1], clamp);
  const zoom = interpolate(frame, [0, durationInFrames - 1], [1.006, zoomTo], clamp);

  return (
    <AbsoluteFill
      style={{
        opacity,
        backgroundColor: "#050505",
        overflow: "hidden",
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          transform: `scale(${zoom})`,
          transformOrigin: "50% 46%",
        }}
      />
    </AbsoluteFill>
  );
};

const ReportPlate: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 8], [0, 1], clamp);
  const zoom = interpolate(frame, [0, 88], [1.008, 1.026], clamp);

  return (
    <AbsoluteFill
      style={{
        opacity,
        backgroundColor: "#050505",
        overflow: "hidden",
      }}
    >
      <Video
        src={staticFile("source/app/hair-analysis-report-scroll.mp4")}
        muted
        playbackRate={1.08}
        objectFit="cover"
        style={{
          width: "100%",
          height: "100%",
          transform: `scale(${zoom})`,
          transformOrigin: "50% 35%",
        }}
      />
    </AbsoluteFill>
  );
};

export const AppJourneyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleEnter = spring({
    fps,
    frame,
    config: {damping: 18, mass: 0.82, stiffness: 125},
  });
  const backgroundDrift = interpolate(frame, [0, SCENE_DURATION - 1], [-110, 120], clamp);
  const progress = interpolate(frame, [0, SCENE_DURATION - 1], [5, 100], clamp);
  const transitionFlash = Math.max(
    tapPulse(frame, 49),
    tapPulse(frame, 100),
    tapPulse(frame, 150),
  );

  const landingTap = tapPulse(frame, 39);
  const profileTap = tapPulse(frame, 88);
  const photoTap = tapPulse(frame, 139);
  const touch =
    photoTap > 0
      ? {x: 50, y: 79, opacity: photoTap}
      : profileTap > 0
        ? {x: 49, y: 34, opacity: profileTap}
        : landingTap > 0
          ? {x: 50, y: 68, opacity: landingTap}
          : undefined;

  const activeStep =
    frame < 50
      ? "START FREE"
      : frame < 101
        ? "BUILD YOUR PROFILE"
        : frame < 151
          ? "TAKE ONE PHOTO"
          : "SEE YOUR REPORT";
  const stageNumber = frame < 50 ? "01" : frame < 101 ? "02" : frame < 151 ? "03" : "04";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.black,
        color: palette.ink,
        overflow: "hidden",
        fontFamily: sans,
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 72% 43%, rgba(199,163,92,.18), transparent 33%), radial-gradient(circle at 15% 77%, rgba(100,233,255,.065), transparent 31%), linear-gradient(150deg, #090908, #030303 66%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: backgroundDrift,
          top: 560,
          width: 1260,
          height: 780,
          borderRadius: "50%",
          border: "1px solid rgba(199,163,92,.13)",
          boxShadow:
            "0 0 0 90px rgba(199,163,92,.026), 0 0 0 180px rgba(199,163,92,.018)",
          transform: `rotate(${interpolate(frame, [0, 239], [-9, 8], clamp)}deg)`,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.12,
          backgroundImage:
            "linear-gradient(rgba(234,215,167,.11) 1px, transparent 1px), linear-gradient(90deg, rgba(234,215,167,.08) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          backgroundPosition: `${interpolate(frame, [0, 239], [0, -48], clamp)}px ${interpolate(frame, [0, 239], [0, 34], clamp)}px`,
          maskImage:
            "linear-gradient(to bottom, transparent 14%, black 33%, black 78%, transparent 92%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 98,
          transform: `translateY(${interpolate(titleEnter, [0, 1], [30, 0], clamp)}px)`,
          opacity: titleEnter,
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        <div
          style={{
            color: palette.goldLight,
            fontSize: 23,
            fontWeight: 800,
            letterSpacing: 7,
          }}
        >
          A real 60-second journey
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 84,
            fontWeight: 900,
            letterSpacing: -4,
            lineHeight: 0.93,
          }}
        >
          One photo.
          <br />
          <span style={{color: palette.gold}}>Clear next step.</span>
        </div>
      </div>

      <PhoneCapture
        durationInFrames={SCENE_DURATION}
        label="Real screen recording"
        touch={touch}
      >
        <Sequence durationInFrames={58}>
          <StillPlate
            src="app-capture/01-landing.jpg"
            durationInFrames={58}
            zoomTo={1.025}
          />
        </Sequence>
        <Sequence from={50} durationInFrames={59}>
          <StillPlate
            src="app-capture/02-profile.jpg"
            durationInFrames={59}
            zoomTo={1.04}
          />
        </Sequence>
        <Sequence from={101} durationInFrames={60}>
          <StillPlate
            src="app-capture/04-photo-correct.jpg"
            durationInFrames={60}
            zoomTo={1.036}
          />
        </Sequence>
        <Sequence from={151} durationInFrames={89}>
          <ReportPlate />
        </Sequence>

        <AbsoluteFill
          style={{
            backgroundColor: palette.goldLight,
            opacity: transitionFlash * 0.16,
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
      </PhoneCapture>

      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 1570,
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          borderTop: "1px solid rgba(234,215,167,.25)",
          paddingTop: 27,
        }}
      >
        <div
          style={{
            fontSize: 25,
            fontWeight: 800,
            letterSpacing: 5,
            color: palette.goldLight,
          }}
        >
          STEP {stageNumber} / 04
        </div>
        <div
          style={{
            fontSize: 37,
            fontWeight: 900,
            letterSpacing: 1,
            textAlign: "right",
            textTransform: "uppercase",
          }}
        >
          {activeStep}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 1667,
          height: 7,
          backgroundColor: "rgba(255,255,255,.1)",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            borderRadius: 999,
            background: `linear-gradient(90deg, ${palette.gold}, ${palette.goldLight})`,
            boxShadow: "0 0 22px rgba(199,163,92,.8)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 1730,
          textAlign: "center",
          color: palette.ink,
          fontSize: 38,
          lineHeight: 1.2,
          fontWeight: 700,
        }}
      >
        Private to start. Clinician-led when treatment is worth discussing.
      </div>
    </AbsoluteFill>
  );
};
