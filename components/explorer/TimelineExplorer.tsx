"use client";

import { useMemo, useState } from "react";
import { TimelineItem } from "@/components/TimelineItem";
import type { TimelineEvent } from "@/lib/data";

type TimelineExplorerProps = {
  events: TimelineEvent[];
};

export function TimelineExplorer({ events }: TimelineExplorerProps) {
  const [query, setQuery] = useState("");
  const [era, setEra] = useState("all");

  const eras = useMemo(
    () => Array.from(new Set(events.map((event) => event.era))).sort(),
    [events],
  );

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return events.filter((event) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          event.era,
          event.title,
          event.description,
          event.relatedCharacters.join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesEra = era === "all" || event.era === era;

      return matchesQuery && matchesEra;
    });
  }, [era, events, query]);

  return (
    <div>
      <div className="archive-panel mb-6 grid gap-3 p-4 md:grid-cols-[1fr_300px]">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
            Search
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="rebellion, Capitol, Quarter Quell..."
            className="w-full border border-orange-200/10 bg-black/35 px-4 py-3 text-sm text-stone-100 outline-none transition placeholder:text-stone-600 focus:border-orange-200/40"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
            Era
          </span>
          <select
            value={era}
            onChange={(event) => setEra(event.target.value)}
            className="w-full border border-orange-200/10 bg-black/35 px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-orange-200/40"
          >
            <option value="all">All eras</option>
            {eras.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-4 flex items-center justify-between border-b border-orange-200/10 pb-3 text-xs uppercase tracking-[0.18em] text-stone-500">
        <span>{filteredEvents.length} events</span>
        <span>Timeline Explorer</span>
      </div>

      <div className="relative space-y-6 before:absolute before:bottom-0 before:left-[7px] before:top-2 before:w-px before:bg-orange-200/15">
        {filteredEvents.map((event) => (
          <TimelineItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
