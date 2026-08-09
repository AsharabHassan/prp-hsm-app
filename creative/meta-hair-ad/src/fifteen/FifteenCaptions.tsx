import {
  createTikTokStyleCaptions,
  type Caption,
  type TikTokPage,
} from "@remotion/captions";
import {useCallback, useEffect, useMemo, useState} from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useDelayRender,
  useVideoConfig,
} from "remotion";
import {palette, sans} from "../theme";

const CAPTION_PAGE_WINDOW_MS = 900;
const VOICEOVER_START_FRAME = 3;

type FifteenCaptionsProps = {
  captionsFile: string;
  placement?: "top" | "bottom";
};

type CaptionPageProps = {
  durationInFrames: number;
  page: TikTokPage;
  placement: "top" | "bottom";
};

const CaptionPage: React.FC<CaptionPageProps> = ({
  durationInFrames,
  page,
  placement,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const absoluteTimeMs = page.startMs + (frame / fps) * 1000;
  const enter = interpolate(frame, [0, 5], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitStart = Math.max(1, durationInFrames - 5);
  const exit = interpolate(frame, [exitStart, durationInFrames], [1, 0], {
    easing: Easing.in(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const presence = Math.min(enter, exit);
  const entranceDirection = placement === "top" ? -1 : 1;
  const translateY =
    entranceDirection * interpolate(enter, [0, 1], [22, 0]);
  const scale = interpolate(enter, [0, 1], [0.985, 1]);
  const accentWidth = interpolate(frame, [1, 8], [0, 100], {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: placement === "top" ? "flex-start" : "flex-end",
        padding:
          placement === "top" ? "170px 80px 0" : "0 80px 330px",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          padding: "27px 34px 30px 38px",
          opacity: presence,
          transform: `translateY(${translateY}px) scale(${scale})`,
          background:
            "linear-gradient(105deg, rgba(5,5,5,.92) 0%, rgba(5,5,5,.82) 72%, rgba(5,5,5,.62) 100%)",
          border: "1px solid rgba(234,215,167,.22)",
          borderLeft: `5px solid ${palette.gold}`,
          borderRadius: 6,
          boxShadow:
            "0 24px 75px rgba(0,0,0,.48), inset 0 1px 0 rgba(255,255,255,.045)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 38,
            width: `${accentWidth}%`,
            maxWidth: 220,
            height: 3,
            background: `linear-gradient(90deg, ${palette.goldLight}, ${palette.gold}, transparent)`,
            boxShadow: `0 0 18px rgba(199,163,92,.68)`,
          }}
        />
        <div
          style={{
            color: palette.ink,
            fontFamily: sans,
            fontSize: 56,
            fontWeight: 750,
            letterSpacing: -1.5,
            lineHeight: 1.1,
            textShadow: "0 3px 20px rgba(0,0,0,.92)",
            textWrap: "balance",
            whiteSpace: "pre-wrap",
          }}
        >
          {page.tokens.map((token, index) => {
            const isCurrentToken =
              token.fromMs <= absoluteTimeMs && token.toMs > absoluteTimeMs;

            return (
              <span
                key={`${token.fromMs}-${token.toMs}-${index}`}
                style={{
                  color: isCurrentToken ? palette.goldLight : palette.ink,
                  fontWeight: isCurrentToken ? 900 : 750,
                  textShadow: isCurrentToken
                    ? "0 0 26px rgba(199,163,92,.42), 0 3px 20px rgba(0,0,0,.92)"
                    : "0 3px 20px rgba(0,0,0,.92)",
                }}
              >
                {token.text}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const FifteenCaptions: React.FC<FifteenCaptionsProps> = ({
  captionsFile,
  placement = "bottom",
}) => {
  const [captions, setCaptions] = useState<Caption[] | null>(null);
  const {cancelRender, continueRender, delayRender} = useDelayRender();
  const [renderHandle] = useState(() =>
    delayRender(`Loading captions: ${captionsFile}`),
  );
  const {fps} = useVideoConfig();

  const loadCaptions = useCallback(async () => {
    try {
      const response = await fetch(staticFile(captionsFile));

      if (!response.ok) {
        throw new Error(
          `Could not load captions from ${captionsFile}: ${response.status} ${response.statusText}`,
        );
      }

      const data: unknown = await response.json();

      if (!Array.isArray(data)) {
        throw new Error(`Caption file ${captionsFile} must contain a JSON array.`);
      }

      setCaptions(data as Caption[]);
      continueRender(renderHandle);
    } catch (error) {
      cancelRender(
        error instanceof Error
          ? error
          : new Error(`Could not load captions from ${captionsFile}.`),
      );
    }
  }, [cancelRender, captionsFile, continueRender, renderHandle]);

  useEffect(() => {
    void loadCaptions();
  }, [loadCaptions]);

  const pages = useMemo(() => {
    if (!captions) {
      return [];
    }

    return createTikTokStyleCaptions({
      captions,
      combineTokensWithinMilliseconds: CAPTION_PAGE_WINDOW_MS,
    }).pages;
  }, [captions]);

  if (!captions) {
    return null;
  }

  return (
    <AbsoluteFill>
      {pages.map((page, index) => {
        const startFrame =
          VOICEOVER_START_FRAME + Math.round((page.startMs / 1000) * fps);
        const durationInFrames = Math.max(
          1,
          Math.ceil((page.durationMs / 1000) * fps),
        );

        return (
          <Sequence
            key={`${page.startMs}-${index}`}
            from={startFrame}
            durationInFrames={durationInFrames}
            premountFor={Math.min(6, startFrame)}
          >
            <CaptionPage
              durationInFrames={durationInFrames}
              page={page}
              placement={placement}
            />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
