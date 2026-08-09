import Image from "next/image";

const DOCTORS = [
  {
    img: "/doctors/dr_ahmad_v2.webp",
    name: "Dr Ahmad",
    role: "Founder & Medical Director",
  },
  {
    img: "/doctors/dr_humera_v2.webp",
    name: "Dr Humera Faisal",
    role: "Dermatologist",
  },
  {
    img: "/doctors/dr_ayda.webp",
    name: "Dr Ayda Soltanzadeh",
    role: "Cosmetic Consultant & Dermatology Specialist",
  },
];

export default function DoctorsStrip() {
  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">Your clinical team</p>
        <h2 className="section-title mt-4">Medicine first. Always.</h2>
        <p className="section-copy mt-5">
          Your scan is a starting point. Treatment suitability is confirmed in person by a doctor who can examine your scalp properly.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {DOCTORS.map((doc) => (
          <figure key={doc.name} className="group overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-black-soft">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={doc.img}
                alt={doc.name}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover object-top grayscale-[20%] transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black-rich via-transparent to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[9px] uppercase tracking-[0.15em] text-gold-light backdrop-blur-md">
                GMC registered
              </span>
            </div>
            <figcaption className="p-5">
              <p className="font-serif text-xl text-ink">{doc.name}</p>
              <p className="mt-1 min-h-8 text-[11px] leading-relaxed text-muted">
                {doc.role}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mx-auto mt-7 max-w-xl text-center text-xs leading-relaxed text-muted">
        Every treatment is performed by a <span className="text-ink">GMC-registered doctor</span> — never a nurse or technician.
      </p>
    </div>
  );
}
