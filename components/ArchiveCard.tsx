import Link from "next/link";

type ArchiveCardProps = {
  href: string;
  title: string;
  description: string;
  marker: string;
};

export function ArchiveCard({
  href,
  title,
  description,
  marker,
}: ArchiveCardProps) {
  return (
    <Link
      href={href}
      className="archive-panel group block p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-200/30 hover:bg-zinc-900/70 hover:shadow-ember"
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="archive-kicker">{marker}</p>
          <h3 className="mt-4 text-2xl font-bold text-stone-50">{title}</h3>
        </div>
        <span className="grid h-10 w-10 place-items-center border border-orange-200/15 text-orange-200 transition group-hover:border-orange-200/40">
          →
        </span>
      </div>
      <p className="mt-5 text-sm leading-7 text-stone-300/75">{description}</p>
    </Link>
  );
}
