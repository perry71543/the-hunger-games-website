import Link from "next/link";
import { CharacterPortrait } from "@/components/CharacterPortrait";
import type { Character } from "@/lib/data";

type CharacterCardProps = {
  character: Character;
};

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link
      href={`/characters/${character.slug}`}
      className="archive-card-enhanced archive-panel group block h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-200/30 hover:bg-zinc-900/70 hover:shadow-ember"
    >
      <div className="mb-5 overflow-hidden border border-orange-200/10 bg-black/35">
        <CharacterPortrait character={character} compact />
      </div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-200/70">
            {character.district}
          </p>
          <h3 className="mt-3 text-2xl font-bold text-stone-50">
            {character.name}
          </h3>
        </div>
        <span className="dossier-chip">CH</span>
      </div>
      <p className="mt-3 text-sm font-semibold text-stone-300">
        {character.role}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {character.tags.map((tag) => (
          <span
            key={tag}
            className="border border-stone-200/10 bg-black/25 px-2.5 py-1 text-xs text-stone-400"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-orange-200/10 pt-4 text-xs uppercase text-stone-500">
        <span>Open character file</span>
        <span className="text-orange-200 transition group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}
