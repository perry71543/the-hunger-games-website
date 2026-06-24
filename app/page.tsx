import { ArchiveCard } from "@/components/ArchiveCard";
import { Hero } from "@/components/Hero";

const entryCards = [
  {
    href: "/characters",
    title: "角色檔案",
    marker: "Character Files",
    code: "CF",
    description:
      "整理主要角色的身份、分區、首次登場與私人閱讀筆記，像翻閱一份戰後保存的證詞冊。",
  },
  {
    href: "/districts",
    title: "分區資料",
    marker: "District Records",
    code: "DR",
    description:
      "從 District 1 到 District 13，收錄產業、狀態與重要人物，作為 Panem 地圖的索引。",
  },
  {
    href: "/timeline",
    title: "時間線",
    marker: "Historical Timeline",
    code: "TL",
    description:
      "以垂直時間線回顧黑暗年代、飢餓遊戲、反抗與重建，把散落事件放回歷史脈絡。",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="archive-shell relative pb-16 pt-4">
        <div className="mb-5 flex flex-col justify-between gap-3 border-y border-orange-200/10 py-5 sm:flex-row sm:items-end">
          <div>
            <p className="archive-kicker">Primary Entrances</p>
            <h2 className="mt-2 text-2xl font-black text-stone-50">
              檔案館主索引
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-stone-400">
            每一張卡片都像一份戰後保存下來的檔案封面，指向角色、分區與歷史時間線。
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {entryCards.map((card) => (
            <ArchiveCard key={card.href} {...card} />
          ))}
        </div>

        <div className="archive-panel mt-6 grid gap-4 overflow-hidden p-5 md:grid-cols-[0.72fr_0.28fr] md:items-center">
          <div>
            <p className="archive-kicker">Memorial Ledger</p>
            <p className="mt-3 text-sm leading-7 text-stone-300/75">
              這個首頁現在更像一座地下紀念檔案室：火光從底部滲出，掃描線掠過紀念碑，
              而每份資料都被封存在低亮度的檔案卡中。
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs text-stone-400">
            <span className="border border-orange-200/10 bg-black/30 py-3">
              Fire
            </span>
            <span className="border border-orange-200/10 bg-black/30 py-3">
              Memory
            </span>
            <span className="border border-orange-200/10 bg-black/30 py-3">
              Archive
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
