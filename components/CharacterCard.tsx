import Link from "next/link";
import type { Character } from "@/lib/data";

type CharacterCardProps = {
  character: Character;
};

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link
      href={`/characters/${character.slug}`}
      className="archive-panel group block h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-200/30 hover:bg-zinc-900/70 hover:shadow-ember"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-200/70">
            {character.district}
          </p>
          <h3 className="mt-3 text-2xl font-bold text-stone-50">
            {character.name}
          </h3>
        </div>
        <span className="border border-orange-200/15 px-2 py-1 text-xs text-orange-100/75">
          File
        </span>
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
    </Link>
  );
}
