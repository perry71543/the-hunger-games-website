import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FavoriteButton } from "@/components/FavoriteButton";
import { MarkdownContent } from "@/components/MarkdownContent";
import { SectionTitle } from "@/components/SectionTitle";
import { getNoteBySlug, getNotes } from "@/lib/notes";

type NotePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getNotes().map((note) => ({
    slug: note.slug,
  }));
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  return {
    title: note ? note.title : "私人筆記",
    description: note?.excerpt,
  };
}

export default async function NoteDetailPage({ params }: NotePageProps) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);

  if (!note) {
    notFound();
  }

  return (
    <>
      <SectionTitle
        eyebrow={`${note.category} / ${note.date}`}
        title={note.title}
        description={note.excerpt}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Notes", href: "/notes" },
          { label: note.title },
        ]}
      />
      <section className="archive-shell pb-16">
        <div className="grid gap-6 pt-6 lg:grid-cols-[0.68fr_0.32fr]">
          <article className="archive-card-enhanced archive-panel p-6 sm:p-8">
            <MarkdownContent body={note.body} />
          </article>
          <aside className="space-y-5">
            <div className="archive-card-enhanced archive-panel p-6">
              <div className="flex items-center justify-between gap-4">
                <p className="archive-kicker">Note Shelf</p>
                <FavoriteButton
                  compact
                  item={{
                    id: `note:${note.slug}`,
                    type: "Note",
                    title: note.title,
                    href: `/notes/${note.slug}`,
                    subtitle: note.excerpt,
                  }}
                />
              </div>
              <p className="mt-5 text-sm leading-7 text-stone-300/75">
                這份筆記來自本地 Markdown 檔案，適合持續追加閱讀心得、象徵整理與角色觀察。
              </p>
            </div>
            <div className="archive-card-enhanced archive-panel p-6">
              <p className="archive-kicker">Related Characters</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {note.relatedCharacters.map((name) => (
                  <span
                    key={name}
                    className="border border-orange-200/10 bg-orange-200/[0.035] px-2.5 py-1 text-xs text-orange-100/80"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
