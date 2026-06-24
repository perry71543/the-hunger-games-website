import Link from "next/link";

export function Hero() {
  return (
    <section className="archive-shell grid gap-10 py-16 md:grid-cols-[1.12fr_0.88fr] md:items-center md:py-24">
      <div>
        <p className="archive-kicker">Memorial Archive / Panem Record</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.96] tracking-normal text-stone-50 sm:text-6xl lg:text-7xl">
          Mockingjay Memorial Archive
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-orange-100/85">
          A private archive for Panem, rebellion, memory, and fire.
        </p>
        <p className="mt-6 max-w-2xl text-base leading-8 text-stone-300/75">
          這是一座私人紀念檔案庫，用來整理角色、分區、時間線與閱讀後留下的
          記憶索引。它不是官方網站，而是一份安靜保存故事火種的個人收藏。
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/characters"
            className="border border-orange-300/35 bg-orange-300/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-orange-100 transition hover:border-orange-200/65 hover:bg-orange-300/20"
          >
            Open Archive
          </Link>
          <Link
            href="/timeline"
            className="border border-stone-200/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-200 transition hover:border-stone-200/30 hover:bg-white/[0.04]"
          >
            View Timeline
          </Link>
        </div>
      </div>

      <div className="archive-panel relative min-h-[360px] overflow-hidden p-7">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,rgba(249,115,22,0.28),transparent_28%),linear-gradient(160deg,rgba(127,29,29,0.34),transparent_58%)]" />
        <div className="absolute left-8 right-8 top-8 h-px bg-orange-200/20" />
        <div className="absolute bottom-8 left-8 right-8 h-px bg-orange-200/20" />
        <div className="relative grid h-full min-h-[306px] place-items-center border border-orange-100/10 bg-black/30">
          <div className="text-center">
            <div className="mx-auto grid h-36 w-36 place-items-center rounded-full border border-orange-200/30 bg-black/40 shadow-ember">
              <div className="grid h-24 w-24 place-items-center rounded-full border border-orange-200/20 text-5xl font-black text-orange-100">
                M
              </div>
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.38em] text-orange-200/70">
              Remember / Resist / Rebuild
            </p>
            <div className="mx-auto mt-6 grid max-w-xs grid-cols-3 gap-2 text-xs text-stone-400">
              <span className="border border-stone-200/10 py-2">Archive</span>
              <span className="border border-stone-200/10 py-2">Memory</span>
              <span className="border border-stone-200/10 py-2">Fire</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
