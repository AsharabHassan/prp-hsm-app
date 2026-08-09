export default function StageScale({
  scale,
  stageNumeric,
  stageEstimate,
}: {
  scale: "norwood" | "ludwig";
  stageNumeric: number;
  stageEstimate: string;
}) {
  const stages =
    scale === "norwood"
      ? ["1", "2", "3", "4", "5", "6", "7"]
      : ["I", "II", "III"];
  const max = stages.length;
  const position = Math.max(0.5, Math.min(max, stageNumeric));
  const percent = ((position - 0.5) / max) * 100;

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-xs uppercase tracking-widest text-muted">
          {scale === "norwood" ? "Norwood scale" : "Ludwig scale"}
        </p>
        <p className="font-serif text-lg text-gold-light">{stageEstimate}</p>
      </div>
      <div className="relative mt-4 h-2 rounded-full bg-gradient-to-r from-gold/60 via-gold/30 to-ink/10">
        <div
          className="absolute -top-1.5 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-gold bg-black-rich luxury-glow"
          style={{ left: `${percent}%` }}
          aria-hidden
        />
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-muted">
        {stages.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[10px] uppercase tracking-wider text-muted/70">
        <span>Early — responds best</span>
        <span>Advanced</span>
      </div>
    </div>
  );
}
