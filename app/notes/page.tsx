import Link from "next/link";
import { SectionTitle } from "@/components/SectionTitle";
import { getNotes } from "@/lib/notes";

export const metadata = {
  title: "私人筆記",
};

export default function NotesPage() {
  const notes = getNotes();

  return (
    <>
      <SectionTitle
        eyebrow="Private Notes"
        title="私人筆記"
        description="以 Markdown 保存的閱讀整理與象徵筆記，方便之後繼續擴充成更完整的私人資料庫。"
      />
      <section className="archive-shell pb-16 pt-8">
        <div className="grid gap-5 md:grid-cols-3">
          {notes.map((note) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              className="archive-card-enhanced archive-panel block p-5 transition duration-300 hover:-translate-y-1 hover:border-orange-200/25 hover:bg-zinc-900/70 hover:shadow-ember sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="archive-kicker">{note.category}</p>
                <span className="dossier-chip">NT</span>
              </div>
              <h2 className="mt-4 text-2xl font-bold leading-tight text-stone-50">
                {note.title}
              </h2>
              <p className="mt-2 text-xs uppercase tracking-[0.08em] text-stone-500">
                {note.date}
              </p>
              <p className="mt-5 text-sm leading-7 text-stone-300/75">
                {note.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-orange-200/10 pt-4 text-xs uppercase text-stone-500">
                <span>Open note</span>
                <span className="text-orange-200">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
