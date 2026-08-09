export default function ScoreGauge({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(100, score));
  const radius = 54;
  const circumference = Math.PI * radius; // half circle
  const filled = (clamped / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 140 80" className="w-44" role="img" aria-label={`Candidacy score ${clamped} out of 100`}>
        <path
          d="M 16 74 A 54 54 0 0 1 124 74"
          fill="none"
          stroke="rgba(212,175,55,0.15)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M 16 74 A 54 54 0 0 1 124 74"
          fill="none"
          stroke="#d4af37"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`}
        />
        <text
          x="70"
          y="62"
          textAnchor="middle"
          fill="#f4e4c1"
          fontSize="30"
          fontFamily="var(--font-playfair)"
        >
          {clamped}
        </text>
        <text x="70" y="76" textAnchor="middle" fill="#9ca3af" fontSize="9">
          / 100 candidacy score
        </text>
      </svg>
    </div>
  );
}
