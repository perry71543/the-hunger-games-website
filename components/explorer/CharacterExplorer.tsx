"use client";

import { useMemo, useState } from "react";
import { CharacterCard } from "@/components/CharacterCard";
import type { Character } from "@/lib/data";

type CharacterExplorerProps = {
  characters: Character[];
};

export function CharacterExplorer({ characters }: CharacterExplorerProps) {
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("all");
  const [tag, setTag] = useState("all");

  const districts = useMemo(
    () => Array.from(new Set(characters.map((character) => character.district))).sort(),
    [characters],
  );

  const tags = useMemo(
    () =>
      Array.from(new Set(characters.flatMap((character) => character.tags))).sort(),
    [characters],
  );

  const filteredCharacters = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return characters.filter((character) => {
      const matchesQuery =
        !normalizedQuery ||
        [character.name, character.role, character.district, character.description]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesDistrict =
        district === "all" || character.district === district;
      const matchesTag = tag === "all" || character.tags.includes(tag);

      return matchesQuery && matchesDistrict && matchesTag;
    });
  }, [characters, district, query, tag]);

  return (
    <div>
      <div className="archive-panel mb-6 grid gap-3 p-4 md:grid-cols-[1fr_220px_220px]">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
            Search
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Katniss, victor, rebellion..."
            className="w-full border border-orange-200/10 bg-black/35 px-4 py-3 text-sm text-stone-100 outline-none transition placeholder:text-stone-600 focus:border-orange-200/40"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
            District
          </span>
          <select
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
            className="w-full border border-orange-200/10 bg-black/35 px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-orange-200/40"
          >
            <option value="all">All districts</option>
            {districts.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
            Tag
          </span>
          <select
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            className="w-full border border-orange-200/10 bg-black/35 px-4 py-3 text-sm text-stone-100 outline-none transition focus:border-orange-200/40"
          >
            <option value="all">All tags</option>
            {tags.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-4 flex items-center justify-between border-b border-orange-200/10 pb-3 text-xs uppercase tracking-[0.18em] text-stone-500">
        <span>{filteredCharacters.length} records</span>
        <span>Character Explorer</span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCharacters.map((character) => (
          <CharacterCard key={character.slug} character={character} />
        ))}
      </div>
    </div>
  );
}
