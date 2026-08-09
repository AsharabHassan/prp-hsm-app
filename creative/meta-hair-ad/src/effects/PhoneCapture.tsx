import type {ReactNode} from "react";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {palette, sans} from "../theme";

type TouchPoint = {
  opacity: number;
  x: number;
  y: number;
};

type PhoneCaptureProps = {
  children: ReactNode;
  durationInFrames?: number;
  label?: string;
  touch?: TouchPoint;
};

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

/**
 * A tracked, dimensional phone plate for genuine product captures.
 * Motion is intentionally frame-driven so renders remain deterministic.
 */
export const PhoneCapture: React.FC<PhoneCaptureProps> = ({
  children,
  durationInFrames = 240,
  label = "LIVE APP CAPTURE",
  touch,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const enter = spring({
    fps,
    frame: frame - 2,
    config: {damping: 17, mass: 0.86, stiffness: 118},
  });
  const motionProgress = interpolate(
    frame,
    [0, Math.max(1, durationInFrames - 1)],
    [0, 1],
    clamp,
  );
  const exit = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames - 1],
    [1, 0.94],
    clamp,
  );
  const driftX = interpolate(
    motionProgress,
    [0, 0.2, 0.42, 0.64, 1],
    [-22, 16, -10, 18, 0],
    clamp,
  );
  const driftY = interpolate(
    motionProgress,
    [0, 0.25, 0.53, 0.78, 1],
    [38, -5, 12, -8, 4],
    clamp,
  );
  const rotateY = interpolate(
    motionProgress,
    [0, 0.23, 0.45, 0.7, 1],
    [-8, 2.8, -2.2, 3.6, 0],
    clamp,
  );
  const rotateX = interpolate(
    motionProgress,
    [0, 0.33, 0.64, 1],
    [4.8, -1.4, 1.5, 0],
    clamp,
  );
  const rotateZ = interpolate(
    motionProgress,
    [0, 0.29, 0.61, 1],
    [-1.8, 0.7, -0.5, 0],
    clamp,
  );
  const trackedScale = interpolate(enter, [0, 1], [0.86, 1], clamp) * exit;
  const sheenX = interpolate(frame % 116, [0, 115], [-230, 690]);
  const scanY = interpolate(frame % 72, [0, 71], [-20, 1080]);
  const trackingPulse = interpolate(
    frame % 30,
    [0, 10, 20, 29],
    [0.38, 0.92, 0.58, 0.38],
  );

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 414,
        width: 500,
        height: 1084,
        opacity: interpolate(enter, [0, 0.22, 1], [0, 0.82, 1], clamp),
        transform: [
          "translateX(-50%)",
          `translate3d(${driftX}px, ${driftY}px, 0)`,
          "perspective(1800px)",
          `rotateX(${rotateX}deg)`,
          `rotateY(${rotateY}deg)`,
          `rotateZ(${rotateZ}deg)`,
          `scale(${trackedScale})`,
        ].join(" "),
        transformStyle: "preserve-3d",
        transformOrigin: "50% 54%",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -58,
          borderRadius: 118,
          background:
            "radial-gradient(ellipse at 50% 52%, rgba(199,163,92,.24), rgba(199,163,92,.055) 46%, transparent 72%)",
          filter: "blur(23px)",
          opacity: 0.78,
          transform: "translateZ(-24px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 78,
          background:
            "linear-gradient(138deg, #4b463e 0%, #11100f 14%, #050505 54%, #302d28 88%, #0a0908 100%)",
          border: "2px solid rgba(234,215,167,.62)",
          boxShadow:
            "0 56px 110px rgba(0,0,0,.72), inset 0 0 0 2px rgba(255,255,255,.08), inset 0 -18px 34px rgba(0,0,0,.72)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 16,
            top: 34,
            width: 468,
            height: 1014,
            overflow: "hidden",
            borderRadius: 61,
            backgroundColor: "#050505",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,.14)",
          }}
        >
          {children}

          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: scanY,
              height: 2,
              background:
                "linear-gradient(90deg, transparent, rgba(234,215,167,.72), transparent)",
              boxShadow: "0 0 16px rgba(199,163,92,.62)",
              opacity: 0.42,
              pointerEvents: "none",
            }}
          />

          {touch ? (
            <div
              style={{
                position: "absolute",
                left: `${touch.x}%`,
                top: `${touch.y}%`,
                width: 70,
                height: 70,
                marginLeft: -35,
                marginTop: -35,
                borderRadius: "50%",
                border: "3px solid rgba(234,215,167,.95)",
                boxShadow:
                  "0 0 0 12px rgba(199,163,92,.16), 0 0 36px rgba(199,163,92,.7)",
                opacity: touch.opacity,
                transform: `scale(${interpolate(touch.opacity, [0, 1], [1.45, 0.72], clamp)})`,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 22,
                  borderRadius: "50%",
                  backgroundColor: palette.goldLight,
                }}
              />
            </div>
          ) : null}
        </div>

        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 21,
            width: 152,
            height: 43,
            borderRadius: 999,
            background: "linear-gradient(180deg, #030303, #111)",
            transform: "translateX(-50%)",
            border: "1px solid rgba(255,255,255,.12)",
            boxShadow: "0 5px 14px rgba(0,0,0,.55)",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: 15,
              top: 14,
              width: 13,
              height: 13,
              borderRadius: "50%",
              background: "#111b23",
              boxShadow: "inset 0 0 0 3px #06090c, 0 0 5px #3a5871",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            top: -160,
            bottom: -160,
            left: sheenX,
            width: 112,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,.17), transparent)",
            transform: "skewX(-13deg)",
            filter: "blur(4px)",
            pointerEvents: "none",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          right: -76,
          top: 78,
          padding: "13px 20px",
          borderRadius: 999,
          border: "1px solid rgba(234,215,167,.55)",
          backgroundColor: "rgba(5,5,5,.84)",
          color: palette.goldLight,
          fontFamily: sans,
          fontSize: 17,
          fontWeight: 800,
          letterSpacing: 3,
          textTransform: "uppercase",
          boxShadow: "0 16px 38px rgba(0,0,0,.5)",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{opacity: trackingPulse}}>●</span> {label}
      </div>

      <div
        style={{
          position: "absolute",
          left: -34,
          top: -34,
          width: 84,
          height: 84,
          borderLeft: `3px solid ${palette.gold}`,
          borderTop: `3px solid ${palette.gold}`,
          opacity: trackingPulse,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -34,
          top: -34,
          width: 84,
          height: 84,
          borderRight: `3px solid ${palette.gold}`,
          borderTop: `3px solid ${palette.gold}`,
          opacity: trackingPulse,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -34,
          bottom: -34,
          width: 84,
          height: 84,
          borderLeft: `3px solid ${palette.gold}`,
          borderBottom: `3px solid ${palette.gold}`,
          opacity: trackingPulse,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -34,
          bottom: -34,
          width: 84,
          height: 84,
          borderRight: `3px solid ${palette.gold}`,
          borderBottom: `3px solid ${palette.gold}`,
          opacity: trackingPulse,
        }}
      />
    </div>
  );
};
