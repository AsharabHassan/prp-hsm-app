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
import {PhoneCapture} from "../../effects/PhoneCapture";
import {palette, sans} from "../../theme";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const AppStill: React.FC<{src: string; durationInFrames: number}> = ({
  src,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{backgroundColor: "#050505", overflow: "hidden"}}>
      <Img
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          scale: interpolate(frame, [0, durationInFrames - 1], [1.005, 1.035], clamp),
          opacity: interpolate(frame, [0, 6], [0, 1], clamp),
        }}
      />
    </AbsoluteFill>
  );
};

export const CheckChangePhotoAppScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const titleIn = spring({fps, frame: frame - 1, config: {damping: 18, stiffness: 175}});
  const tap = interpolate(frame, [38, 43, 52, 62], [0, 1, 0.32, 0], clamp);
  const flash = interpolate(frame, [44, 48, 54], [0, 0.2, 0], clamp);
  const progress = interpolate(frame, [0, 89], [18, 72], clamp);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.black,
        overflow: "hidden",
        fontFamily: sans,
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 76% 42%, rgba(199,163,92,.2), transparent 31%), radial-gradient(circle at 12% 74%, rgba(100,233,255,.07), transparent 28%), linear-gradient(145deg, #0b0a08, #020202 72%)",
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.13,
          backgroundImage:
            "linear-gradient(rgba(234,215,167,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(234,215,167,.09) 1px, transparent 1px)",
          backgroundSize: "92px 92px",
          backgroundPosition: `${interpolate(frame, [0, 89], [0, -42], clamp)}px ${interpolate(frame, [0, 89], [0, 30], clamp)}px`,
          maskImage: "linear-gradient(to bottom, transparent, black 24%, black 83%, transparent)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 104,
          textAlign: "center",
          textTransform: "uppercase",
          opacity: titleIn,
          translate: `0 ${interpolate(titleIn, [0, 1], [34, 0], clamp)}px`,
        }}
      >
        <div style={{fontSize: 20, letterSpacing: 6, color: palette.goldLight, fontWeight: 800}}>
          One private photo
        </div>
        <div style={{fontSize: 91, lineHeight: 0.9, letterSpacing: -4, color: palette.ink, fontWeight: 900, marginTop: 20}}>
          Start with
          <br />
          <span style={{color: palette.gold}}>what is visible.</span>
        </div>
      </div>

      <PhoneCapture
        durationInFrames={90}
        label="Real app capture"
        touch={{x: 50, y: 78, opacity: tap}}
      >
        <Sequence durationInFrames={52}>
          <AppStill src="app-capture/03-photo.jpg" durationInFrames={52} />
        </Sequence>
        <Sequence from={45} durationInFrames={45}>
          <AppStill src="app-capture/04-photo-correct.jpg" durationInFrames={45} />
        </Sequence>
        <AbsoluteFill
          style={{
            backgroundColor: palette.goldLight,
            opacity: flash,
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
          top: 1638,
          height: 7,
          borderRadius: 999,
          backgroundColor: "rgba(255,255,255,.1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            borderRadius: 999,
            background: `linear-gradient(90deg, ${palette.gold}, ${palette.goldLight})`,
            boxShadow: "0 0 20px rgba(199,163,92,.7)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 1680,
          display: "flex",
          justifyContent: "space-between",
          color: palette.goldLight,
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        <span>Photo quality check</span>
        <span>Private to start</span>
      </div>
    </AbsoluteFill>
  );
};
