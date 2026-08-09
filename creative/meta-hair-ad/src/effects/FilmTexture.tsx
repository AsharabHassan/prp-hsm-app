import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";

export const FilmTexture: React.FC = () => {
  const frame = useCurrentFrame();
  const flicker = interpolate(frame % 7, [0, 2, 4, 6], [0.025, 0.055, 0.018, 0.045]);
  const x = (frame * 17) % 120;
  const y = (frame * 29) % 160;

  return (
    <AbsoluteFill style={{pointerEvents: "none", overflow: "hidden"}}>
      <AbsoluteFill
        style={{
          opacity: flicker,
          backgroundImage:
            "repeating-radial-gradient(circle at 20% 30%, #fff 0 1px, transparent 1px 4px)",
          backgroundPosition: `${x}px ${y}px`,
          backgroundSize: "7px 7px",
          mixBlendMode: "screen",
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.12,
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 5px, rgba(255,255,255,.12) 6px)",
        }}
      />
      <AbsoluteFill
        style={{
          boxShadow: "inset 0 0 220px 85px rgba(0,0,0,.92)",
        }}
      />
    </AbsoluteFill>
  );
};
