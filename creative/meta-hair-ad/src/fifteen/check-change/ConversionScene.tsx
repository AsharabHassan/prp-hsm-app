import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {palette, sans, serif} from "../../theme";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const CheckChangeConversionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const split = interpolate(frame, [2, 30], [94, 42], clamp);
  const proofFade = interpolate(frame, [30, 54], [1, 0.27], clamp);
  const ctaIn = spring({fps, frame: frame - 30, config: {damping: 16, mass: 0.8, stiffness: 185}});
  const buttonIn = spring({fps, frame: frame - 47, config: {damping: 15, stiffness: 205}});
  const sheen = interpolate(frame, [50, 89], [-40, 140], clamp);
  const ringScale = interpolate(frame, [25, 89], [0.7, 1.24], clamp);

  return (
    <AbsoluteFill style={{backgroundColor: palette.black, overflow: "hidden"}}>
      <Img
        src={staticFile("results/hair-before.webp")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "52% center",
          scale: 1.17,
          filter: "contrast(1.2) saturate(.72) brightness(.58)",
          opacity: proofFade,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: `${split}%`,
          top: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          opacity: proofFade,
        }}
      >
        <Img
          src={staticFile("results/hair-after.webp")}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 1080,
            height: 1920,
            objectFit: "cover",
            objectPosition: "52% center",
            scale: 1.17,
            filter: "contrast(1.2) saturate(.78) brightness(.62)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: `${split}%`,
          top: 0,
          bottom: 0,
          width: 4,
          opacity: proofFade,
          backgroundColor: palette.goldLight,
          boxShadow: `0 0 38px 8px ${palette.gold}`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 34%, rgba(199,163,92,.23), transparent 35%), linear-gradient(180deg, rgba(0,0,0,.25), rgba(2,2,2,.95) 83%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 112,
          display: "flex",
          justifyContent: "space-between",
          color: palette.ink,
          fontFamily: sans,
          fontSize: 18,
          fontWeight: 800,
          letterSpacing: 5,
          textTransform: "uppercase",
          opacity: interpolate(frame, [0, 8, 32, 40], [0, 1, 1, 0], clamp),
        }}
      >
        <span>Before</span>
        <span style={{color: palette.goldLight}}>Clinic case / after</span>
      </div>

      <div
        style={{
          position: "absolute",
          left: 190,
          top: 255,
          width: 700,
          height: 700,
          borderRadius: "50%",
          border: "1px solid rgba(234,215,167,.22)",
          scale: ringScale,
          opacity: ctaIn * 0.9,
          boxShadow: "0 0 90px rgba(199,163,92,.09), inset 0 0 90px rgba(199,163,92,.06)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          top: 238,
          padding: "54px 50px 58px",
          border: "1px solid rgba(199,163,92,.48)",
          backgroundColor: "rgba(2,2,2,.72)",
          backdropFilter: "blur(13px)",
          boxShadow: "0 35px 110px rgba(0,0,0,.62)",
          opacity: ctaIn,
          scale: interpolate(ctaIn, [0, 1], [0.92, 1], clamp),
          translate: `0 ${interpolate(ctaIn, [0, 1], [70, 0], clamp)}px`,
          textAlign: "center",
        }}
      >
        <Img
          src={staticFile("brand/hsw-logo.png")}
          style={{width: 138, height: 138, objectFit: "contain"}}
        />
        <div
          style={{
            marginTop: 24,
            color: palette.goldLight,
            fontFamily: sans,
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Free / private / around 60 seconds
        </div>
        <div
          style={{
            marginTop: 34,
            color: palette.ink,
            fontFamily: serif,
            fontSize: 102,
            fontWeight: 800,
            lineHeight: 0.88,
          }}
        >
          Check the change.
        </div>
        <div
          style={{
            position: "relative",
            marginTop: 48,
            padding: "29px 30px",
            borderRadius: 999,
            overflow: "hidden",
            background: `linear-gradient(120deg, ${palette.goldLight}, ${palette.gold})`,
            boxShadow: "0 24px 75px rgba(199,163,92,.34)",
            opacity: buttonIn,
            scale: interpolate(buttonIn, [0, 1], [0.8, 1], clamp),
            color: "#080706",
            fontFamily: sans,
            fontSize: 31,
            fontWeight: 900,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Start free now&nbsp;&nbsp;→
          <div
            style={{
              position: "absolute",
              top: -50,
              bottom: -50,
              left: `${sheen}%`,
              width: 90,
              rotate: "18deg",
              background: "rgba(255,255,255,.5)",
              filter: "blur(9px)",
            }}
          />
        </div>
        <div
          style={{
            marginTop: 30,
            color: palette.muted,
            fontFamily: sans,
            fontSize: 16,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Harley Street Medical Wellness / London &amp; Glasgow
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 80,
          bottom: 188,
          color: palette.muted,
          fontFamily: sans,
          fontSize: 15,
          letterSpacing: 2.5,
          textTransform: "uppercase",
          opacity: interpolate(frame, [0, 8, 32, 40], [0, 0.9, 0.9, 0], clamp),
        }}
      >
        Individual outcomes vary / case images do not predict a result
      </div>
    </AbsoluteFill>
  );
};
