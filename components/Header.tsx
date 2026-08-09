import Image from "next/image";
import Link from "next/link";

const LOGO_URL = "/brand/hsa-logo.png";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-black-rich/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="Harley Street Aesthetics home">
          <Image
            src={LOGO_URL}
            alt="Harley Street Aesthetics"
            width={150}
            height={44}
            className="h-10 w-auto object-contain"
            priority
          />
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
