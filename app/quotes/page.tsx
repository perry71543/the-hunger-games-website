import { QuoteCard } from "@/components/QuoteCard";
import { SectionTitle } from "@/components/SectionTitle";
import { VisualBanner } from "@/components/VisualBanner";
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
      <VisualBanner
        src="/images/memorial-quotes.png"
        alt="紀念火盆旁堆疊著筆記卡、封存信件與暗紅布料"
        label="Memory Notes / Short Fragments"
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
