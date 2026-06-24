import Link from "next/link";

const emberCount = 18;

export function Hero() {
  return (
    <section className="hero-stage relative isolate overflow-hidden border-b border-orange-200/10">
      <div className="ember-field" aria-hidden="true">
        {Array.from({ length: emberCount }).map((_, index) => (
          <span key={index} className="ember" />
        ))}
      </div>

      <div className="archive-shell relative grid gap-10 py-16 md:grid-cols-[1.04fr_0.96fr] md:items-center md:py-24 lg:py-28">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-3 border border-orange-200/15 bg-black/35 px-4 py-2 text-xs text-orange-100/80 shadow-ember backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-300 shadow-ember" />
            Memorial Archive / Panem Record
          </div>

          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.96] tracking-normal text-stone-50 sm:text-6xl lg:text-7xl">
            Mockingjay
            <span className="block bg-gradient-to-r from-orange-100 via-amber-300 to-red-300 bg-clip-text text-transparent">
              Memorial Archive
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-orange-100/85">
            A private archive for Panem, rebellion, memory, and fire.
          </p>
          <p className="mt-6 max-w-2xl text-base leading-8 text-stone-300/75">
            這是一座私人紀念檔案庫，用來整理角色、分區、時間線與閱讀後留下的
            記憶索引。它不是官方網站，而是一份安靜保存故事火種的個人收藏。
          </p>

          <div className="mt-8 grid max-w-xl grid-cols-3 border border-orange-200/10 bg-black/25 text-center backdrop-blur">
            <div className="border-r border-orange-200/10 px-3 py-4">
              <p className="text-2xl font-black text-orange-100">12</p>
              <p className="mt-1 text-[11px] uppercase text-stone-400">
                Character Files
              </p>
            </div>
            <div className="border-r border-orange-200/10 px-3 py-4">
              <p className="text-2xl font-black text-orange-100">13</p>
              <p className="mt-1 text-[11px] uppercase text-stone-400">
                District Records
              </p>
            </div>
            <div className="px-3 py-4">
              <p className="text-2xl font-black text-orange-100">09</p>
              <p className="mt-1 text-[11px] uppercase text-stone-400">
                Timeline Events
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/characters"
              className="border border-orange-300/35 bg-orange-300/10 px-5 py-3 text-sm font-semibold uppercase text-orange-100 shadow-ember transition hover:border-orange-200/65 hover:bg-orange-300/20"
            >
              Open Archive
            </Link>
            <Link
              href="/timeline"
              className="border border-stone-200/10 bg-black/20 px-5 py-3 text-sm font-semibold uppercase text-stone-200 transition hover:border-stone-200/30 hover:bg-white/[0.04]"
            >
              View Timeline
            </Link>
          </div>
        </div>

        <div className="monument-vault archive-panel relative min-h-[440px] overflow-hidden p-6 sm:p-8">
          <div className="scanline" aria-hidden="true" />
          <div className="absolute inset-x-8 top-8 h-px bg-orange-200/20" />
          <div className="absolute inset-x-8 bottom-8 h-px bg-orange-200/20" />

          <div className="relative grid min-h-[376px] place-items-center border border-orange-100/10 bg-black/35">
            <div className="monument-arc" aria-hidden="true" />
            <div className="memorial-sigil" aria-label="Abstract memorial flame mark">
              <span className="sigil-wing sigil-wing-left" />
              <span className="sigil-wing sigil-wing-right" />
              <span className="sigil-flame" />
              <span className="sigil-core">M</span>
            </div>

            <div className="absolute bottom-8 left-1/2 w-[78%] -translate-x-1/2">
              <div className="monument-plinth">
                <p className="text-center text-xs font-semibold uppercase text-orange-100/75">
                  Remember / Resist / Rebuild
                </p>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-stone-400">
                <span className="border border-stone-200/10 bg-black/35 py-2">
                  Archive
                </span>
                <span className="border border-stone-200/10 bg-black/35 py-2">
                  Memory
                </span>
                <span className="border border-stone-200/10 bg-black/35 py-2">
                  Fire
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
