import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DistrictBadge } from "@/components/DistrictBadge";
import { FavoriteButton } from "@/components/FavoriteButton";
import { SectionTitle } from "@/components/SectionTitle";
import { getCharacters, getDistrictById, getDistricts } from "@/lib/data";

type DistrictPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return getDistricts().map((district) => ({
    id: district.id,
  }));
}

export async function generateMetadata({
  params,
}: DistrictPageProps): Promise<Metadata> {
  const { id } = await params;
  const district = getDistrictById(id);

  return {
    title: district ? district.name : "分區資料",
  };
}

export default async function DistrictDetailPage({ params }: DistrictPageProps) {
  const { id } = await params;
  const district = getDistrictById(id);

  if (!district) {
    notFound();
  }

  const characters = getCharacters();
  const characterByName = new Map(
    characters.map((character) => [character.name, character.slug]),
  );

  return (
    <>
      <SectionTitle
        eyebrow="District Record"
        title={district.name}
        description={`${district.industry} / ${district.status}`}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Districts", href: "/districts" },
          { label: district.name },
        ]}
      />
      <section className="archive-shell pb-16">
        <div className="grid gap-6 pt-6 lg:grid-cols-[0.68fr_0.32fr]">
          <article className="archive-card-enhanced archive-panel p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <p className="archive-kicker">District Brief</p>
              <div className="flex items-center gap-2">
                <FavoriteButton
                  compact
                  item={{
                    id: `district:${district.id}`,
                    type: "District",
                    title: district.name,
                    href: `/districts/${district.id}`,
                    subtitle: `${district.industry} / ${district.status}`,
                  }}
                />
                <span className="dossier-chip">D{district.id}</span>
              </div>
            </div>
            <p className="mt-5 text-lg leading-9 text-stone-200/90">
              {district.description}
            </p>
          </article>

          <aside className="space-y-5">
            <div className="archive-card-enhanced archive-panel grid place-items-center p-8">
              <DistrictBadge district={district} size="lg" />
              <p className="mt-5 text-center text-sm leading-7 text-stone-300/75">
                {district.industry}
              </p>
            </div>

            <div className="archive-card-enhanced archive-panel p-6">
              <p className="archive-kicker">Notable Characters</p>
              <ul className="mt-5 space-y-3">
                {district.notableCharacters.map((name) => {
                  const slug = characterByName.get(name);

                  return (
                    <li key={name}>
                      {slug ? (
                        <Link
                          href={`/characters/${slug}`}
                          className="block rounded-[4px] border border-stone-200/10 bg-black/25 px-4 py-3 text-sm text-stone-200 transition hover:border-orange-200/30 hover:bg-white/[0.035] hover:text-orange-100"
                        >
                          {name}
                        </Link>
                      ) : (
                        <span className="block rounded-[4px] border border-stone-200/10 bg-black/25 px-4 py-3 text-sm text-stone-200">
                          {name}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
