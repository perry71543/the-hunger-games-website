import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SectionTitle } from "@/components/SectionTitle";
import { getDistrictById, getDistricts } from "@/lib/data";

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

  return (
    <>
      <SectionTitle
        eyebrow="District Record"
        title={district.name}
        description={`${district.industry} / ${district.status}`}
      />
      <section className="archive-shell pb-16">
        <div className="grid gap-6 lg:grid-cols-[0.68fr_0.32fr]">
          <article className="archive-panel p-6 sm:p-8">
            <p className="archive-kicker">District Brief</p>
            <p className="mt-5 text-lg leading-9 text-stone-200/90">
              {district.description}
            </p>
          </article>

          <aside className="archive-panel p-6">
            <p className="archive-kicker">Notable Characters</p>
            <ul className="mt-5 space-y-3">
              {district.notableCharacters.map((name) => (
                <li
                  key={name}
                  className="border border-stone-200/10 bg-black/25 px-4 py-3 text-sm text-stone-200"
                >
                  {name}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
