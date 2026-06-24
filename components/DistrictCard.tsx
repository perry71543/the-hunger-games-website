import Link from "next/link";
import type { District } from "@/lib/data";

type DistrictCardProps = {
  district: District;
};

export function DistrictCard({ district }: DistrictCardProps) {
  return (
    <Link
      href={`/districts/${district.id}`}
      className="archive-panel group block h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-200/30 hover:bg-zinc-900/70 hover:shadow-ember"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-200/70">
          District {district.id}
        </p>
        <span className="h-2 w-2 rounded-full bg-orange-300 shadow-ember" />
      </div>
      <h3 className="mt-4 text-2xl font-bold text-stone-50">
        {district.industry}
      </h3>
      <p className="mt-3 text-sm text-stone-400">{district.status}</p>
      <p className="mt-5 line-clamp-3 text-sm leading-7 text-stone-300/75">
        {district.description}
      </p>
    </Link>
  );
}
