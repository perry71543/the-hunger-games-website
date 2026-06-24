import { SectionTitle } from "@/components/SectionTitle";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <>
      <SectionTitle
        eyebrow="About This Archive"
        title="關於 Mockingjay Memorial Archive"
        description="這是一個私人使用的《飢餓遊戲 / The Hunger Games》紀念網站，目標是保存個人閱讀記憶、整理資料索引，並以安靜的檔案館形式回望 Panem 的故事。"
      />
      <section className="archive-shell pb-16">
        <div className="grid gap-5 md:grid-cols-3">
          <article className="archive-panel p-6">
            <p className="archive-kicker">Private Use</p>
            <h2 className="mt-4 text-2xl font-bold text-stone-50">
              私人紀念用途
            </h2>
            <p className="mt-5 text-sm leading-7 text-stone-300/75">
              網站內容以個人整理、心得、角色索引與世界觀筆記為主，不提供商業用途，也不需要登入系統。
            </p>
          </article>
          <article className="archive-panel p-6">
            <p className="archive-kicker">Unofficial</p>
            <h2 className="mt-4 text-2xl font-bold text-stone-50">
              非官方網站
            </h2>
            <p className="mt-5 text-sm leading-7 text-stone-300/75">
              本站不是官方網站，亦未與 The Hunger Games 相關權利方、出版社或影視作品官方單位建立關聯。
            </p>
          </article>
          <article className="archive-panel p-6">
            <p className="archive-kicker">Archive First</p>
            <h2 className="mt-4 text-2xl font-bold text-stone-50">
              資料索引與心得
            </h2>
            <p className="mt-5 text-sm leading-7 text-stone-300/75">
              第一版使用本地 JSON 資料，方便上傳 GitHub、部署 Vercel，也方便日後以 Markdown 或更多資料檔擴充。
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
