import Image from "next/image";
import Link from "next/link";
import { BRAND_LOGO_PATH, BRAND_NAME } from "@/lib/brand";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-black-rich/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          aria-label={`${BRAND_NAME} hair analysis home`}
          className="flex items-center gap-3"
        >
          <Image
            src={BRAND_LOGO_PATH}
            alt="Harley Street Wellness logo"
            width={44}
            height={44}
            className="h-10 w-10 object-contain"
            priority
          />
          <span className="hidden leading-none sm:block">
            <span className="block font-serif text-[15px] tracking-[0.08em] text-gold-light">
              Harley Street
            </span>
            <span className="mt-1 block text-[8px] uppercase tracking-[0.24em] text-white/55">
              Medical Wellness
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-5">
          <span className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted md:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,55,.8)]" />
            Doctor-led · London &amp; Glasgow
          </span>
          <Link
            href="/analyze"
            className="rounded-full border border-gold/50 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-light transition hover:border-gold hover:bg-gold hover:text-black-rich sm:px-5"
          >
            Free analysis
          </Link>
        </div>
      </div>
    </header>
  );
}
