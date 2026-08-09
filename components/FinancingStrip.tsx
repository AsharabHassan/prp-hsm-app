import Image from "next/image";

const PLANS = [
  {
    partner: "Klarna",
    logo: "/finance/klarna.webp",
    invert: true,
    logoClass: "max-h-4",
    plan: "Pay in 3",
    detail: "3 interest-free instalments. No fees, no interest.",
  },
  {
    partner: "Clearpay",
    logo: "/finance/clearpay.webp",
    invert: true,
    logoClass: "max-h-6",
    plan: "Pay in 4",
    detail: "4 equal payments over 6 weeks. Always interest free.",
  },
  {
    partner: "Ideal4Finance",
    logo: "/finance/ideal4finance.png",
    invert: false,
    logoClass: "max-h-7",
    plan: "Monthly loans",
    detail: "Interest-free finance for up to 12 months on courses over £1,000.",
  },
];

export default function FinancingStrip() {
  return (
    <div className="rounded-[1.75rem] border border-gold/25 bg-[linear-gradient(145deg,rgba(212,175,55,.08),rgba(17,17,17,.8))] p-6 sm:p-8">
      <p className="text-center text-[10px] uppercase tracking-[0.26em] text-gold">
        Spread the cost — interest free
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {PLANS.map((p) => (
          <div
            key={p.partner}
            className="rounded-2xl border border-white/[0.07] bg-black-rich/70 p-5 text-center"
          >
            <div className="flex h-8 items-center justify-center">
              <Image
                src={p.logo}
                alt={p.partner}
                width={120}
                height={32}
                className={`${p.logoClass} w-auto object-contain ${p.invert ? "brightness-0 invert" : ""}`}
              />
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-gold">
              {p.plan}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted">{p.detail}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-[11px] text-muted">
        0% finance &amp; payment plans available · subject to eligibility
      </p>
    </div>
  );
}
