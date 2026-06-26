import { FavoriteButton } from "@/components/FavoriteButton";
import type { TimelineEvent } from "@/lib/data";

type TimelineItemProps = {
  event: TimelineEvent;
};

export function TimelineItem({ event }: TimelineItemProps) {
  return (
    <article className="relative pl-9">
      <span className="absolute left-0 top-2 h-4 w-4 rounded-[2px] border border-orange-200/45 bg-zinc-950 shadow-ember" />
      <div className="archive-card-enhanced archive-panel p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <p className="archive-kicker">{event.era}</p>
          <div className="flex items-center gap-2">
            <FavoriteButton
              compact
              item={{
                id: `timeline:${event.id}`,
                type: "Timeline",
                title: event.title,
                href: "/timeline",
                subtitle: event.era,
              }}
            />
            <span className="dossier-chip">TL</span>
          </div>
        </div>
        <h3 className="mt-3 text-2xl font-bold text-stone-50">
          {event.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-stone-300/75">
          {event.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {event.relatedCharacters.map((name) => (
            <span
              key={name}
              className="rounded-[3px] border border-orange-200/10 bg-orange-200/[0.035] px-2.5 py-1 text-xs text-orange-100/80"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
