"use client";

import { useMemo, useState } from "react";
import { DistrictCard } from "@/components/DistrictCard";
import type { District } from "@/lib/data";

type DistrictExplorerProps = {
  districts: District[];
};

export function DistrictExplorer({ districts }: DistrictExplorerProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const statuses = useMemo(
    () => Array.from(new Set(districts.map((district) => district.status))).sort(),
    [districts],
  );

  const filteredDistricts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return districts.filter((district) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          district.name,
          district.industry,
          district.status,
          district.description,
          district.notableCharacters.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesStatus = status === "all" || district.status === status;

      return matchesQuery && matchesStatus;
    });
  }, [districts, query, status]);

  return (
    <div>
      <div className="archive-panel mb-6 grid gap-3 p-4 md:grid-cols-[1fr_300px]">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-stone-500">
            Search
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="coal, agriculture, rebuilt..."
            className="archive-field text-sm"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-stone-500">
            Status
          </span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="archive-field text-sm"
          >
            <option value="all">All statuses</option>
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-4 flex items-center justify-between border-b border-orange-200/10 pb-3 text-xs uppercase tracking-[0.08em] text-stone-500">
        <span>{filteredDistricts.length} records</span>
        <span>District Explorer</span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDistricts.map((district) => (
          <DistrictCard key={district.id} district={district} />
        ))}
      </div>
    </div>
  );
}
