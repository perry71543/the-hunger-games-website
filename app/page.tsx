import Image from "next/image";
import Link from "next/link";
import { ArchiveCard } from "@/components/ArchiveCard";
import { Hero } from "@/components/Hero";
import { RebelDispatch } from "@/components/RebelDispatch";
import {
  getCharacters,
  getDistricts,
  getGalleryImages,
  getQuotes,
  getRelationships,
  getTimeline,
} from "@/lib/data";
import { getNotes } from "@/lib/notes";

const entryCards = [
  {
    href: "/characters",
    title: "角色檔案",
    marker: "Character Files",
    code: "CF",
    signal: "Witness Cell",
    image: {
      src: "/images/character-dossiers.jpg",
      alt: "暗色角色檔案牆，排列著匿名人物剪影與資料夾",
    },
    description:
      "整理主要角色的身份、分區、首次登場與私人閱讀筆記，像翻閱一份戰後保存的證詞冊。",
  },
  {
    href: "/districts",
    title: "分區資料",
    marker: "District Records",
    code: "DR",
    signal: "Supply Front",
    image: {
      src: "/images/district-records-map.jpg",
      alt: "暗色金屬桌上的分區地圖、工業材料與標記針",
    },
    description:
      "從 District 1 到 District 13，收錄產業、狀態與重要人物，作為 Panem 地圖的索引。",
  },
  {
    href: "/timeline",
    title: "時間線",
    marker: "Historical Timeline",
    code: "TL",
    signal: "Uprising Log",
    image: {
      src: "/images/timeline-archive.jpg",
      alt: "地下歷史檔案長廊，牆上排列焦痕文件與時間線標記",
    },
    description:
      "以垂直時間線回顧黑暗年代、飢餓遊戲、反抗與重建，把散落事件放回歷史脈絡。",
  },
];

export default function HomePage() {
  const stats = {
    characters: getCharacters().length,
    districts: getDistricts().length,
    timeline: getTimeline().length,
  };
  const featuredImages = getGalleryImages().slice(3, 6);
  const featuredQuote = getQuotes()[0];
  const relationshipCount = getRelationships().length;
  const noteCount = getNotes().length;

  return (
    <>
      <Hero stats={stats} />
      <section className="archive-shell relative pb-16 pt-4">
        <RebelDispatch />
        <div className="mb-5 flex flex-col justify-between gap-3 border-y border-orange-200/10 py-5 sm:flex-row sm:items-end">
          <div>
            <p className="archive-kicker">Primary Entrances / Rebel Index</p>
            <h2 className="mt-2 text-2xl font-black text-stone-50">
              地下檔案主索引
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-stone-400">
            每一張卡片都像一份從 Capitol 廣播底下救出的資料封面，指向角色證詞、分區細胞與反抗時間線。
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {entryCards.map((card) => (
            <ArchiveCard key={card.href} {...card} />
          ))}
        </div>

        <div className="archive-panel mt-6 grid gap-4 overflow-hidden p-5 md:grid-cols-[0.72fr_0.28fr] md:items-center">
          <div>
            <p className="archive-kicker">Memorial Ledger / Counter-Record</p>
            <p className="mt-3 text-sm leading-7 text-stone-300/75">
              這個首頁現在更像一座地下紀念檔案室：火光從底部滲出，掃描線掠過紀念碑，
              而每份資料都被封存在低亮度的檔案卡中，作為拒絕被官方歷史吞沒的反抗證詞。
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs text-stone-400">
            <span className="border border-orange-200/10 bg-black/30 py-3">
              Fire
            </span>
            <span className="border border-orange-200/10 bg-black/30 py-3">
              Resist
            </span>
            <span className="border border-orange-200/10 bg-black/30 py-3">
              Rebuild
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <article className="archive-card-enhanced archive-panel overflow-hidden">
            <div className="relative min-h-[320px]">
              <Image
                src="/images/private-archive-desk.jpg"
                alt="私人檔案桌面，燭光照亮筆記本、索引卡與檔案章"
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
              <div className="relative flex min-h-[320px] max-w-xl flex-col justify-end p-6 sm:p-8">
                <p className="archive-kicker">Featured Archive / Rebel Desk</p>
                <h2 className="mt-4 text-3xl font-black leading-tight text-stone-50">
                  私人筆記、圖片牆與反抗網絡已上架
                </h2>
                <p className="mt-4 text-sm leading-7 text-stone-300/80">
                  除了角色與分區，現在可以從 Gallery 進入視覺檔案，從 Notes 閱讀私人整理，
                  或從 Relations 追蹤人物之間的同盟、裂痕、象徵傳遞與革命代價。
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/gallery"
                    className="border border-orange-300/35 bg-orange-300/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-orange-100 transition hover:border-orange-200/65 hover:bg-orange-300/20"
                  >
                    Open gallery
                  </Link>
                  <Link
                    href="/notes"
                    className="border border-stone-200/10 bg-black/35 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-stone-200 transition hover:border-orange-200/30 hover:bg-white/[0.04]"
                  >
                    Read notes
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <aside className="grid gap-5">
            <div className="archive-card-enhanced archive-panel p-6">
              <p className="archive-kicker">Recovered Fragment</p>
              <p className="mt-4 text-2xl font-semibold leading-9 text-orange-50">
                “{featuredQuote.text}”
              </p>
              <p className="mt-4 text-sm leading-7 text-stone-300/75">
                {featuredQuote.note}
              </p>
            </div>
            <div className="archive-panel grid grid-cols-3 text-center">
              <div className="border-r border-orange-200/10 p-4">
                <p className="text-2xl font-black text-orange-100">
                  {relationshipCount}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-stone-500">
                  Relations
                </p>
              </div>
              <div className="border-r border-orange-200/10 p-4">
                <p className="text-2xl font-black text-orange-100">
                  {featuredImages.length}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-stone-500">
                  Visuals
                </p>
              </div>
              <div className="p-4">
                <p className="text-2xl font-black text-orange-100">
                  {noteCount.toString().padStart(2, "0")}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-stone-500">
                  Notes
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
