import { ArchiveCard } from "@/components/ArchiveCard";
import { Hero } from "@/components/Hero";

const entryCards = [
  {
    href: "/characters",
    title: "角色檔案",
    marker: "Character Files",
    description:
      "整理主要角色的身份、分區、首次登場與私人閱讀筆記，像翻閱一份戰後保存的證詞冊。",
  },
  {
    href: "/districts",
    title: "分區資料",
    marker: "District Records",
    description:
      "從 District 1 到 District 13，收錄產業、狀態與重要人物，作為 Panem 地圖的索引。",
  },
  {
    href: "/timeline",
    title: "時間線",
    marker: "Historical Timeline",
    description:
      "以垂直時間線回顧黑暗年代、飢餓遊戲、反抗與重建，把散落事件放回歷史脈絡。",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="archive-shell pb-16">
        <div className="grid gap-5 md:grid-cols-3">
          {entryCards.map((card) => (
            <ArchiveCard key={card.href} {...card} />
          ))}
        </div>
      </section>
    </>
  );
}
