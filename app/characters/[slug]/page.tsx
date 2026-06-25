import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionTitle } from "@/components/SectionTitle";
import { getCharacterBySlug, getCharacters } from "@/lib/data";

type CharacterPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getCharacters().map((character) => ({
    slug: character.slug,
  }));
}

export async function generateMetadata({
  params,
}: CharacterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);

  return {
    title: character ? character.name : "角色檔案",
  };
}

export default async function CharacterDetailPage({
  params,
}: CharacterPageProps) {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);

  if (!character) {
    notFound();
  }

  return (
    <>
      <SectionTitle
        eyebrow={`${character.district} / ${character.firstAppearance}`}
        title={character.name}
        description={character.role}
      />
      <section className="archive-shell pb-16">
        <div className="grid gap-6 lg:grid-cols-[0.74fr_0.26fr]">
          <article className="archive-card-enhanced archive-panel p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <p className="archive-kicker">Archive Note</p>
              <span className="dossier-chip">CH</span>
            </div>
            <p className="mt-5 text-lg leading-9 text-stone-200/90">
              {character.description}
            </p>

            <div className="mt-8 grid gap-4 border-t border-orange-200/10 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-orange-200/60">
                  Role
                </p>
                <p className="mt-2 text-stone-100">{character.role}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-orange-200/60">
                  First Appearance
                </p>
                <p className="mt-2 text-stone-100">
                  {character.firstAppearance}
                </p>
              </div>
            </div>
          </article>

          <aside className="space-y-5">
            <div className="archive-card-enhanced archive-panel p-6">
              <p className="archive-kicker">Tags</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {character.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-stone-200/10 bg-black/25 px-2.5 py-1 text-xs text-stone-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="archive-card-enhanced archive-panel p-6">
              <p className="archive-kicker">Related Quotes</p>
              <ul className="mt-5 space-y-3">
                {character.relatedQuotes.map((quote) => (
                  <li
                    key={quote}
                    className="border-l border-orange-200/25 pl-4 text-sm leading-7 text-stone-300/80"
                  >
                    {quote}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
