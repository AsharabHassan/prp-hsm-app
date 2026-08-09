import {
  AbsoluteFill,
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

export const BeforeTreatmentScene: React.FC = () => {
  const frame = useCurrentFrame();
  const entrance = interpolate(frame, [2, 14], [0, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.black,
        color: palette.ink,
        overflow: "hidden",
        fontFamily: sans,
      }}
    >
      <Img
        src={staticFile("brand/hair-analysis-hero.webp")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "67% center",
          scale: interpolate(frame, [0, 59], [1.07, 1.16], clamp),
          filter: "saturate(.62) contrast(1.24) brightness(.48)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(3,3,3,.92) 0%, rgba(3,3,3,.66) 52%, rgba(3,3,3,.18) 100%), linear-gradient(180deg, rgba(0,0,0,.2), rgba(0,0,0,.9) 88%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 470,
          bottom: 360,
          left: interpolate(frame, [0, 59], [-120, 1190], clamp),
          width: 2,
          background: palette.goldLight,
          boxShadow: "0 0 42px 14px rgba(199,163,92,.62)",
          opacity: 0.72,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 76,
          right: 68,
          top: 675,
          opacity: entrance,
          translate: `0 ${interpolate(entrance, [0, 1], [54, 0])}px`,
          textTransform: "uppercase",
        }}
      >
        <div
          style={{
            color: palette.goldLight,
            fontSize: 29,
            fontWeight: 800,
            letterSpacing: 9,
          }}
        >
          Before
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 132,
            fontWeight: 950,
            letterSpacing: -7,
            lineHeight: 0.82,
          }}
        >
          Treatment…
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 18,
            marginTop: 52,
            padding: "18px 22px",
            color: "#090806",
            background: palette.goldLight,
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: 4,
          }}
        >
          A BETTER QUESTION COMES FIRST <span aria-hidden="true">→</span>
        </div>
      </div>

      <AbsoluteFill
        style={{
          backgroundColor: "white",
          opacity: interpolate(frame, [0, 1, 5], [0.72, 0.14, 0], clamp),
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
