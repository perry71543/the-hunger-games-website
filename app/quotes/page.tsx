import { QuoteCard } from "@/components/QuoteCard";
import { SectionTitle } from "@/components/SectionTitle";
import { getQuotes } from "@/lib/data";

export const metadata = {
  title: "名言收藏",
};

export default function QuotesPage() {
  const quotes = getQuotes();

  return (
    <>
      <SectionTitle
        eyebrow="Quote Ledger"
        title="名言收藏"
        description="這裡只保留少量短句或自行改寫的閱讀筆記，避免大量引用原作文字。"
      />
      <section className="archive-shell pb-16">
        <div className="grid gap-5 md:grid-cols-2">
          {quotes.map((quote) => (
            <QuoteCard key={quote.id} quote={quote} />
          ))}
        </div>
      </section>
    </>
  );
}
