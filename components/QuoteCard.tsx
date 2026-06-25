import { FavoriteButton } from "@/components/FavoriteButton";
import type { Quote } from "@/lib/data";

type QuoteCardProps = {
  quote: Quote;
};

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <article className="archive-card-enhanced archive-panel h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-200/30 hover:bg-zinc-900/70 hover:shadow-ember">
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="archive-kicker">Quote Ledger</p>
        <div className="flex items-center gap-2">
          <FavoriteButton
            compact
            item={{
              id: `quote:${quote.id}`,
              type: "Quote",
              title: quote.text,
              href: "/quotes",
              subtitle: `${quote.speaker} / ${quote.source}`,
            }}
          />
          <span className="dossier-chip">QT</span>
        </div>
      </div>
      <p className="text-xl font-semibold leading-8 text-orange-50">
        “{quote.text}”
      </p>
      <div className="mt-6 border-t border-orange-200/10 pt-5">
        <p className="text-sm font-semibold text-stone-100">{quote.speaker}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-orange-200/60">
          {quote.source}
        </p>
        <p className="mt-4 text-sm leading-7 text-stone-300/75">{quote.note}</p>
      </div>
    </article>
  );
}
