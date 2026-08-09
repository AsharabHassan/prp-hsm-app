import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {palette, sans} from "../../theme";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const DecisionClarityScene: React.FC = () => {
  const frame = useCurrentFrame();
  const decisionIn = interpolate(frame, [0, 9], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const clarityIn = interpolate(frame, [38, 49], [0, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const wipe = interpolate(frame, [34, 48], [100, 0], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#eee8dc",
        color: "#080807",
        overflow: "hidden",
        fontFamily: sans,
      }}
    >
      <Img
        src={staticFile("results/hair-before.webp")}
        style={{
          position: "absolute",
          right: -280,
          top: 0,
          width: 1350,
          height: 1920,
          objectFit: "cover",
          objectPosition: "53% center",
          filter: "grayscale(.82) contrast(1.18) brightness(.88)",
          scale: interpolate(frame, [0, 89], [1.02, 1.12], clamp),
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(238,232,220,.98) 0%, rgba(238,232,220,.93) 50%, rgba(238,232,220,.25) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 70,
          top: 535,
          width: 860,
          opacity: decisionIn,
          translate: `${interpolate(decisionIn, [0, 1], [-85, 0])}px 0`,
          textTransform: "uppercase",
        }}
      >
        <div
          style={{
            fontSize: 34,
            fontWeight: 850,
            letterSpacing: 8,
          }}
        >
          Comes a
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 132,
            fontWeight: 950,
            letterSpacing: -8,
            lineHeight: 0.82,
          }}
        >
          Decision.
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          clipPath: `inset(0 ${wipe}% 0 0)`,
          background:
            "radial-gradient(circle at 78% 35%, rgba(234,215,167,.28), transparent 31%), linear-gradient(145deg, #090806, #171208 62%, #060606)",
          color: palette.ink,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 70,
            top: 535,
            width: 900,
            opacity: clarityIn,
            translate: `0 ${interpolate(clarityIn, [0, 1], [48, 0])}px`,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              color: palette.goldLight,
              fontSize: 34,
              fontWeight: 850,
              letterSpacing: 8,
            }}
          >
            Comes
          </div>
          <div
            style={{
              marginTop: 14,
              color: palette.gold,
              fontSize: 151,
              fontWeight: 950,
              letterSpacing: -9,
              lineHeight: 0.82,
              textShadow: "0 0 42px rgba(199,163,92,.22)",
            }}
          >
            Clarity.
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            left: 70,
            top: 1045,
            padding: "20px 25px",
            border: "1px solid rgba(234,215,167,.4)",
            color: palette.goldLight,
            fontSize: 22,
            fontWeight: 850,
            letterSpacing: 5,
            textTransform: "uppercase",
            opacity: clarityIn,
          }}
        >
          Pattern first / treatment second
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 70,
          bottom: 350,
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 5,
          textTransform: "uppercase",
          color: frame < 43 ? "#2d2b27" : palette.muted,
        }}
      >
        No assumptions / start with what is visible
      </div>
    </AbsoluteFill>
  );
};
