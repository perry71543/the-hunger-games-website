import type { Character } from "@/lib/data";

type CharacterPortraitProps = {
  character: Character;
  compact?: boolean;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function CharacterPortrait({
  character,
  compact = false,
}: CharacterPortraitProps) {
  return (
    <div
      className={`character-portrait ${compact ? "min-h-32" : "min-h-72"}`}
      aria-label={`${character.name} abstract dossier portrait`}
    >
      <div className="absolute left-4 top-4 border border-orange-200/15 bg-black/35 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-100/70">
        File Photo
      </div>
      <div className="absolute right-4 top-4 text-[10px] uppercase tracking-[0.2em] text-stone-500">
        {character.district}
      </div>
      <div className="relative grid h-24 w-24 place-items-center border border-orange-200/20 bg-black/45 text-3xl font-black text-orange-100 shadow-ember">
        {getInitials(character.name)}
      </div>
      <div className="absolute inset-x-4 bottom-4 border-t border-orange-200/10 pt-3">
        <p className="truncate text-sm font-semibold text-stone-100">
          {character.name}
        </p>
        <p className="mt-1 truncate text-xs uppercase tracking-[0.18em] text-stone-500">
          {character.role}
        </p>
      </div>
    </div>
  );
}
