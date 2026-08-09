import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {palette, sans} from "../theme";

export const ScanHud: React.FC<{label?: string; accent?: string}> = ({
  label = "FOLLICLE PATTERN / VISUAL CHECK",
  accent = palette.gold,
}) => {
  const frame = useCurrentFrame();
  const scanY = interpolate(frame % 45, [0, 44], [150, 1680]);
  const pulse = interpolate(frame % 24, [0, 12, 23], [0.35, 0.9, 0.35]);

  return (
    <AbsoluteFill style={{pointerEvents: "none", color: accent, fontFamily: sans}}>
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: 105,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: 4,
          opacity: 0.85,
        }}
      >
        <span>{label}</span>
        <span style={{opacity: pulse}}>● LIVE</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 70,
          right: 70,
          top: scanY,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          boxShadow: `0 0 24px ${accent}`,
          opacity: 0.7,
        }}
      />
      {[
        {position: {left: 70, top: 148}, edges: {borderLeftWidth: 3, borderTopWidth: 3}},
        {position: {right: 70, top: 148}, edges: {borderRightWidth: 3, borderTopWidth: 3}},
        {position: {left: 70, bottom: 155}, edges: {borderLeftWidth: 3, borderBottomWidth: 3}},
        {position: {right: 70, bottom: 155}, edges: {borderRightWidth: 3, borderBottomWidth: 3}},
      ].map((corner, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            width: 78,
            height: 78,
            borderColor: accent,
            borderStyle: "solid",
            borderWidth: 0,
            ...corner.edges,
            ...corner.position,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
