import Link from "next/link";
import { DistrictBadge } from "@/components/DistrictBadge";
import type { District } from "@/lib/data";

type DistrictCardProps = {
  district: District;
};

export function DistrictCard({ district }: DistrictCardProps) {
  return (
    <Link
      href={`/districts/${district.id}`}
      className="archive-card-enhanced archive-panel group block h-full p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-200/25 hover:bg-zinc-900/70 hover:shadow-ember sm:p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-[0.08em] text-orange-200/70">
          District {district.id}
        </p>
        <DistrictBadge district={district} />
      </div>
      <h3 className="mt-4 text-2xl font-bold text-stone-50">
        {district.industry}
      </h3>
      <p className="mt-3 text-sm leading-6 text-stone-400">{district.status}</p>
      <p className="mt-5 line-clamp-3 text-sm leading-7 text-stone-300/75">
        {district.description}
      </p>
      <div className="mt-6 flex items-center justify-between border-t border-orange-200/10 pt-4 text-xs uppercase text-stone-500">
        <span>Open district record</span>
        <span className="text-orange-200 transition group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
