import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {palette, sans} from "../theme";

type CaptionSegment = {
  text: string;
  emphasis?: boolean;
};

type CaptionCue = {
  start: number;
  end: number;
  segments: CaptionSegment[];
};

const cues: CaptionCue[] = [
  {
    start: 12,
    end: 68,
    segments: [
      {text: "Hair thinning", emphasis: true},
      {text: " rarely announces itself."},
    ],
  },
  {
    start: 77,
    end: 126,
    segments: [
      {text: "It starts with "},
      {text: "small changes.", emphasis: true},
    ],
  },
  {
    start: 137,
    end: 170,
    segments: [
      {text: "More scalp", emphasis: true},
      {text: " showing."},
    ],
  },
  {
    start: 177,
    end: 209,
    segments: [{text: "Less density.", emphasis: true}],
  },
  {
    start: 215,
    end: 252,
    segments: [
      {text: "A part that looks "},
      {text: "wider.", emphasis: true},
    ],
  },
  {
    start: 266,
    end: 304,
    segments: [
      {text: "At our "},
      {text: "doctor-led", emphasis: true},
      {text: " clinics."},
    ],
  },
  {
    start: 305,
    end: 360,
    segments: [
      {text: "Clinicians assess "},
      {text: "the pattern first.", emphasis: true},
    ],
  },
  {
    start: 366,
    end: 475,
    segments: [
      {text: "PRP", emphasis: true},
      {text: " or "},
      {text: "exosome therapy", emphasis: true},
      {text: "\u2014only when appropriate."},
    ],
  },
  {
    start: 543,
    end: 590,
    segments: [
      {text: "Start privately with "},
      {text: "one photo.", emphasis: true},
    ],
  },
  {
    start: 622,
    end: 691,
    segments: [
      {text: "In "},
      {text: "sixty seconds", emphasis: true},
      {text: ", see the change more clearly."},
    ],
  },
  {
    start: 693,
    end: 729,
    segments: [
      {text: "And discover "},
      {text: "the next step.", emphasis: true},
    ],
  },
  {
    start: 764,
    end: 807,
    segments: [
      {text: "Check the change "},
      {text: "before the gap.", emphasis: true},
    ],
  },
  {
    start: 821,
    end: 863,
    segments: [
      {text: "Start your free analysis "},
      {text: "now.", emphasis: true},
    ],
  },
];

const CaptionCard: React.FC<{cue: CaptionCue; frame: number}> = ({cue, frame}) => {
  const localFrame = frame - cue.start;
  const duration = cue.end - cue.start + 1;
  const enter = interpolate(localFrame, [0, 7], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exit = interpolate(localFrame, [duration - 7, duration], [1, 0], {
    easing: Easing.in(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const presence = Math.min(enter, exit);
  const translateY = interpolate(enter, [0, 1], [24, 0]);
  const scale = interpolate(enter, [0, 1], [0.985, 1]);
  const blur = interpolate(enter, [0, 1], [10, 0]);
  const accentWidth = interpolate(localFrame, [2, 11], [0, 100], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const longCaption = cue.segments.reduce((sum, segment) => sum + segment.text.length, 0) > 48;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        padding: "30px 34px 32px 40px",
        overflow: "hidden",
        opacity: presence,
        transform: `translateY(${translateY}px) scale(${scale})`,
        filter: `blur(${blur}px)`,
        background:
          "linear-gradient(102deg, rgba(5,5,5,.91) 0%, rgba(5,5,5,.78) 70%, rgba(5,5,5,.48) 100%)",
        border: "1px solid rgba(234,215,167,.22)",
        borderLeft: `5px solid ${palette.gold}`,
        borderRadius: 6,
        boxShadow: "0 22px 70px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.04)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 40,
          top: 0,
          width: `${accentWidth}%`,
          maxWidth: 230,
          height: 3,
          background: `linear-gradient(90deg, ${palette.goldLight}, ${palette.gold}, transparent)`,
          boxShadow: `0 0 18px ${palette.gold}`,
        }}
      />

      <div
        style={{
          fontFamily: sans,
          fontSize: longCaption ? 50 : 56,
          lineHeight: 1.13,
          fontWeight: 700,
          letterSpacing: -1.4,
          color: palette.ink,
          textWrap: "balance",
          textShadow: "0 3px 18px rgba(0,0,0,.9)",
        }}
      >
        {cue.segments.map((segment, index) => (
          <span
            key={`${cue.start}-${index}`}
            style={
              segment.emphasis
                ? {
                    color: palette.goldLight,
                    fontWeight: 850,
                    textShadow: `0 0 24px rgba(199,163,92,.24), 0 3px 18px rgba(0,0,0,.9)`,
                  }
                : undefined
            }
          >
            {segment.text}
          </span>
        ))}
      </div>
    </div>
  );
};

export const ThirtySecondCaptions: React.FC = () => {
  const frame = useCurrentFrame();
  const activeCue = cues.find((cue) => frame >= cue.start && frame <= cue.end);
  const appOrEvidenceBeat = frame >= 360 && frame < 740;

  if (!activeCue) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        justifyContent: appOrEvidenceBeat ? "flex-start" : "flex-end",
        padding: appOrEvidenceBeat ? "300px 76px 0" : "0 80px 170px",
        pointerEvents: "none",
      }}
    >
      <CaptionCard cue={activeCue} frame={frame} />
    </AbsoluteFill>
  );
};
