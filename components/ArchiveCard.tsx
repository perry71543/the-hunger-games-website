import Link from "next/link";
import Image from "next/image";

type ArchiveCardProps = {
  href: string;
  title: string;
  description: string;
  marker: string;
  code?: string;
  image?: {
    src: string;
    alt: string;
  };
};

export function ArchiveCard({
  href,
  title,
  description,
  marker,
  code = "MMA",
  image,
}: ArchiveCardProps) {
  return (
    <Link
      href={href}
      className="archive-card-enhanced archive-panel group block p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-200/30 hover:bg-zinc-900/70 hover:shadow-ember"
    >
      {image ? (
        <div className="relative mb-5 aspect-[16/9] overflow-hidden border border-orange-100/10 bg-black/40">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 30vw, 100vw"
            className="object-cover opacity-85 transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />
        </div>
      ) : null}
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="archive-kicker">{marker}</p>
          <h3 className="mt-4 text-2xl font-bold text-stone-50">{title}</h3>
        </div>
        <span className="grid h-12 w-12 place-items-center border border-orange-200/15 bg-black/35 text-[11px] font-bold uppercase text-orange-200 transition group-hover:border-orange-200/40">
          {code}
        </span>
      </div>
      <p className="mt-5 text-sm leading-7 text-stone-300/75">{description}</p>
      <div className="mt-6 flex items-center justify-between border-t border-orange-200/10 pt-4 text-xs uppercase text-stone-500">
        <span>Open dossier</span>
        <span className="text-orange-200 transition group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
