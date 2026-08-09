import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {palette, sans} from "../theme";

export const GlitchTitle: React.FC<{
  line1: string;
  line2?: string;
  goldLine?: string;
}> = ({line1, line2, goldLine}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({fps, frame, config: {damping: 18, stiffness: 220}});
  const jitter = frame < 13 ? (frame % 3 === 0 ? 8 : frame % 3 === 1 ? -5 : 1) : 0;
  const tracking = interpolate(enter, [0, 1], [28, 2]);

  const textStyle: React.CSSProperties = {
    fontFamily: sans,
    fontSize: 128,
    lineHeight: 0.84,
    fontWeight: 900,
    letterSpacing: tracking,
    textTransform: "uppercase",
    transform: `translateX(${jitter}px) scale(${interpolate(enter, [0, 1], [1.16, 1])})`,
    opacity: enter,
    margin: 0,
  };

  return (
    <div style={{position: "relative", textAlign: "left"}}>
      {frame < 13 ? (
        <>
          <div style={{...textStyle, position: "absolute", color: palette.red, left: -7, opacity: 0.48}}>
            {line1}
          </div>
          <div style={{...textStyle, position: "absolute", color: palette.cyan, left: 7, opacity: 0.44}}>
            {line1}
          </div>
        </>
      ) : null}
      <div style={{...textStyle, position: "relative", color: palette.ink}}>{line1}</div>
      {line2 ? <div style={{...textStyle, color: palette.ink}}>{line2}</div> : null}
      {goldLine ? <div style={{...textStyle, color: palette.gold}}>{goldLine}</div> : null}
    </div>
  );
};
