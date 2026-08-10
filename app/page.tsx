import Image from "next/image";
import Link from "next/link";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import DoctorsStrip from "@/components/DoctorsStrip";
import FinancingStrip from "@/components/FinancingStrip";
import Header from "@/components/Header";
import ReviewsStrip from "@/components/ReviewsStrip";
import VideoEmbed from "@/components/VideoEmbed";
import { BRAND_NAME, BRAND_WEBSITE } from "@/lib/brand";

const TRUST_CHIPS = ["GMC-registered doctors", "Private & secure", "No obligation"];

const STEPS = [
  {
    number: "01",
    title: "Show us your hairline",
    body: "Hold your hair back and take one clear photo. No special equipment, no app download.",
  },
  {
    number: "02",
    title: "We map what matters",
    body: "Your scan looks at recession pattern, visible density and signs of active miniaturisation.",
  },
  {
    number: "03",
    title: "Get an honest next step",
    body: "See your stage, likely suitability and whether a clinical consultation is worth your time.",
  },
];

const FAQS = [
  {
    question: "Is the photo analysis really free?",
    answer:
      "Yes. There is no charge and no obligation to book treatment. It is designed to help you understand whether a clinical consultation is likely to be useful.",
  },
  {
    question: "Is this a medical diagnosis?",
    answer:
      "No. It is an AI photographic pre-assessment based on the area visible in your image. A clinician must examine your scalp and medical history before recommending any treatment.",
  },
  {
    question: "Who tends to respond best to PRP or exosomes?",
    answer:
      "These treatments are generally most relevant where follicles are weakened but still active, often in earlier stages of thinning. Smooth areas with long-standing follicle loss are less likely to respond.",
  },
  {
    question: "What happens to my photo?",
    answer:
      "Your image is used to create your assessment and support your consultation journey. The upload flow explains the privacy details before you submit anything.",
  },
];

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-gold" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m4 10 4 4 8-9" />
    </svg>
  );
}

function FollicleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M24 42c0-14-7-18-7-27 0-5 3-9 7-9s7 4 7 9c0 9-7 13-7 27Z" />
      <path d="M24 6V1M17 10l-5-4M31 10l5-4M11 19H5M43 19h-6" />
      <path d="M20 29c2 1 6 1 8 0" />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero-section">
          <Image
            src="/brand/hair-analysis-hero.webp"
            alt="Clinician examining a patient's scalp with a trichoscope"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[66%_center] sm:object-center"
          />
          <div className="hero-scrim" />
          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] max-w-7xl items-center px-5 py-20 sm:px-8 lg:min-h-[720px]">
            <div className="max-w-3xl fade-in-up">
              <p className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-gold/80" />
                Doctor-led hair restoration
              </p>
              <h1 className="mt-7 max-w-3xl text-[clamp(3.2rem,8vw,7rem)] leading-[0.9] tracking-[-0.045em] text-white">
                Know what your hairline is <span className="text-gradient-gold italic">telling you.</span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
                One photo gives you a personalised view of your hair loss stage—and whether PRP or exosome therapy could still be worth considering.
              </p>
              <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <Link href="/analyze" className="primary-cta group">
                  Start my free analysis
                  <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a href="#results" className="text-link">
                  See a clinic result <span aria-hidden="true">↓</span>
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
                {TRUST_CHIPS.map((chip) => (
                  <span key={chip} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.13em] text-white/55">
                    <Check /> {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="hero-index" aria-hidden="true">01 / 06</div>
        </section>

        <section className="border-y border-white/[0.07] bg-black-soft/60">
          <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-white/[0.07] px-5 sm:px-8">
            {[
              ["01", "clear photo"],
              ["≈60", "seconds"],
              ["£0", "no obligation"],
            ].map(([value, label]) => (
              <div key={label} className="py-7 text-center sm:py-9">
                <p className="font-serif text-2xl text-gold-light sm:text-4xl">{value}</p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.18em] text-muted sm:text-[10px]">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-space mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
            <div>
              <p className="eyebrow">A clearer first step</p>
              <h2 className="section-title mt-5">Before treatment, understand the pattern.</h2>
            </div>
            <p className="section-copy max-w-2xl lg:pb-2">
              Hair thinning is personal, but the first questions are simple: are follicles still active, where is density changing, and is regenerative treatment suitable for this stage? Your analysis helps answer those questions before a sales conversation begins.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.08] lg:grid-cols-3">
            {STEPS.map((step) => (
              <article key={step.number} className="process-card group">
                <div className="flex items-start justify-between">
                  <span className="font-serif text-4xl text-gold/45 transition group-hover:text-gold">{step.number}</span>
                  <span className="mt-1 h-2 w-2 rounded-full border border-gold/70" />
                </div>
                <h3 className="mt-12 text-2xl text-ink">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{step.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/analyze" className="text-link group inline-flex items-center gap-2">
              See how your hairline reads <Arrow className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        <section id="results" className="section-space border-y border-white/[0.07] bg-[#0b0b0b]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-20">
            <div>
              <p className="eyebrow">Clinic result</p>
              <h2 className="section-title mt-5">Progress you can examine, not promises.</h2>
              <p className="section-copy mt-6">
                Regenerative treatments work gradually. This clinic case shows the type of density change that may be possible when follicles are still active.
              </p>
              <div className="mt-8 border-l border-gold/35 pl-5">
                <p className="text-sm leading-7 text-ink/80">
                  “The right treatment depends on what is still happening beneath the visible thinning—not only what you see in the mirror.”
                </p>
                <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-gold">Clinical philosophy</p>
              </div>
              <p className="mt-8 text-[10px] leading-5 text-muted">
                Individual results vary. Images are illustrative of a clinic treatment outcome and do not predict your result.
              </p>
            </div>
            <BeforeAfterSlider />
          </div>
        </section>

        <section className="section-space mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid overflow-hidden rounded-[2rem] border border-white/[0.08] bg-black-soft lg:grid-cols-2">
            <div className="relative min-h-[340px] lg:min-h-[600px]">
              <Image
                src="/brand/wellness-clinic.webp"
                alt="Harley Street Wellness clinic"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black-rich via-black-rich/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black-rich/25" />
              <span className="absolute bottom-5 left-5 rounded-full border border-white/15 bg-black/50 px-4 py-2 text-[9px] uppercase tracking-[0.16em] text-white/70 backdrop-blur-md">
                Doctor-led clinics · London &amp; Glasgow
              </span>
            </div>
            <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
              <p className="eyebrow">Why timing matters</p>
              <h2 className="section-title mt-5">Treat the follicle while it can still respond.</h2>
              <p className="section-copy mt-6">
                PRP and exosome therapy are designed to support weakened, miniaturising follicles. They cannot recreate follicles that are no longer active—which is why an honest stage assessment matters.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="treatment-note">
                  <span className="text-gold"><FollicleIcon /></span>
                  <h3 className="mt-5 text-lg text-ink">PRP therapy</h3>
                  <p className="mt-2 text-xs leading-6 text-muted">Your own platelet-rich plasma, concentrated and delivered to targeted areas.</p>
                </div>
                <div className="treatment-note">
                  <span className="text-gold"><FollicleIcon /></span>
                  <h3 className="mt-5 text-lg text-ink">Exosome therapy</h3>
                  <p className="mt-2 text-xs leading-6 text-muted">A regenerative protocol selected for suitable patterns of active thinning.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space border-y border-white/[0.07] bg-[#090909]">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-16">
            <div>
              <VideoEmbed videoId="Droyoj-laXQ" title={`Exosome hair therapy at ${BRAND_NAME}`} />
              <p className="mt-4 text-center text-[10px] uppercase tracking-[0.16em] text-muted">Inside the clinic · Exosome hair therapy</p>
            </div>
            <div>
              <p className="eyebrow">See the treatment</p>
              <h2 className="section-title mt-5">Clinical, precise and personal.</h2>
              <p className="section-copy mt-6">
                Watch what an exosome hair session looks like inside our clinic, then use your free scan to see whether a conversation about treatment makes sense for you.
              </p>
              <div className="mt-8 rounded-2xl border border-gold/20 bg-gold/[0.05] p-5">
                <p className="text-sm leading-7 text-ink/80">
                  If your photo suggests regenerative treatment is unlikely to help, your report will tell you straight.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space mx-auto max-w-7xl px-5 sm:px-8">
          <DoctorsStrip />
        </section>

        <section className="section-space border-y border-white/[0.07] bg-[#0b0b0b]">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <ReviewsStrip />
          </div>
        </section>

        <section className="section-space mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-center">
            <p className="eyebrow">Transparent pricing</p>
            <h2 className="section-title mt-5">Know the investment upfront.</h2>
            <p className="section-copy mx-auto mt-5 max-w-2xl">Your exact protocol is confirmed at a free consultation. No bundled treatment is recommended before a clinician has assessed your scalp.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="price-card">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Platelet-rich plasma</p>
                <h3 className="mt-3 text-2xl text-ink">PRP therapy</h3>
              </div>
              <div className="sm:text-right">
                <p className="font-serif text-5xl text-gold-light">£399</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted">per session</p>
              </div>
            </div>
            <div className="price-card">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted">Regenerative protocol</p>
                <h3 className="mt-3 text-2xl text-ink">Exosome therapy</h3>
              </div>
              <div className="sm:text-right">
                <p className="font-serif text-5xl text-gold-light">£599</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted">per session</p>
              </div>
            </div>
          </div>
          <p className="mt-5 text-center text-xs text-muted">Three-session courses from £1,099 · confirmed at your free consultation</p>
          <div className="mt-6"><FinancingStrip /></div>
        </section>

        <section className="section-space border-y border-white/[0.07] bg-black-soft/55">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Questions, answered</p>
              <h2 className="section-title mt-5">The useful things to know first.</h2>
            </div>
            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {FAQS.map((faq) => (
                <details key={faq.question} className="faq-item group">
                  <summary>
                    <span>{faq.question}</span>
                    <span className="faq-plus" aria-hidden="true">+</span>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 sm:py-24">
          <div className="final-cta mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-gold/20 px-6 py-16 text-center sm:px-12 sm:py-24">
            <p className="eyebrow">Your next step</p>
            <h2 className="mx-auto mt-6 max-w-4xl font-serif text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.04em] text-white">
              One photo. A more honest conversation.
            </h2>
            <p className="section-copy mx-auto mt-6 max-w-xl">Find out what stage your hairline may be at—and whether there is still something worth treating.</p>
            <Link href="/analyze" className="primary-cta group mt-9">
              Analyse my hairline — free
              <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <p className="mt-5 text-[10px] uppercase tracking-[0.14em] text-muted">Private · around 60 seconds · no obligation</p>
          </div>
        </section>

        <footer className="border-t border-white/[0.07] px-5 pb-28 pt-10 sm:px-8 sm:pb-10">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 text-xs leading-6 text-muted sm:flex-row">
            <div>
              <a
                href={BRAND_WEBSITE}
                className="font-serif text-lg text-gold-light transition hover:text-gold"
              >
                {BRAND_NAME}
              </a>
              <p className="mt-2">10 Harley Street, London W1G 9PF<br />227 Ingram Street, Glasgow G1 1DA</p>
            </div>
            <p className="max-w-xl sm:text-right">
              AI photographic pre-assessment, not a medical diagnosis. Treatment suitability is confirmed at consultation with a GMC-registered clinician. Individual results vary. 18+.
            </p>
          </div>
        </footer>
      </main>

      <div className="fixed inset-x-4 bottom-4 z-50 sm:hidden">
        <Link href="/analyze" className="primary-cta w-full justify-center shadow-2xl">Start free analysis <Arrow className="h-4 w-4" /></Link>
      </div>
    </>
  );
}
