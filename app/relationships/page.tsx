import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { getCharacters, getRelationships } from "@/lib/data";

export const metadata = {
  title: "人物關係索引",
};

export default function RelationshipsPage() {
  const relationships = getRelationships();
  const characterByName = new Map(
    getCharacters().map((character) => [character.name, character.slug]),
  );

  return (
    <>
      <SectionTitle
        eyebrow="Relationship Index"
        title="人物關係索引"
        description="把同盟、家人、權力對峙、勝利者網絡與象徵傳遞整理成可瀏覽的私人關係檔案。"
      />
      <section className="archive-shell pb-16 pt-8">
        <div className="grid gap-5 md:grid-cols-2">
          {relationships.map((relationship) => {
            const sourceSlug = characterByName.get(relationship.source);
            const targetSlug = characterByName.get(relationship.target);

            return (
              <article
                key={relationship.id}
                className="archive-card-enhanced archive-panel p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="archive-kicker">{relationship.type}</p>
                  <span className="dossier-chip">RL</span>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                  <CharacterLink name={relationship.source} slug={sourceSlug} />
                  <span className="text-center text-orange-200/60">→</span>
                  <CharacterLink name={relationship.target} slug={targetSlug} />
                </div>
                <p className="mt-5 text-sm leading-7 text-stone-300/75">
                  {relationship.note}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}

function CharacterLink({
  name,
  slug,
}: {
  name: string;
  slug?: string;
}) {
  const className =
    "block border border-stone-200/10 bg-black/25 px-4 py-3 text-sm font-semibold text-stone-100 transition hover:border-orange-200/30 hover:text-orange-100";

  return slug ? (
    <Link href={`/characters/${slug}`} className={className}>
      {name}
    </Link>
  ) : (
    <span className={className}>{name}</span>
  );
}
