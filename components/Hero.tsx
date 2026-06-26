import Link from "next/link";
import Image from "next/image";

const emberCount = 27;

type HeroStats = {
  characters: number;
  districts: number;
  timeline: number;
};

type HeroProps = {
  stats: HeroStats;
};

export function Hero({ stats }: HeroProps) {
  return (
    <section className="hero-stage relative isolate overflow-hidden border-b border-orange-200/10">
      <div className="ember-field" aria-hidden="true">
        {Array.from({ length: emberCount }).map((_, index) => (
          <span key={index} className="ember" />
        ))}
      </div>

      <div className="archive-shell relative grid gap-8 py-10 md:grid-cols-[1.04fr_0.96fr] md:items-center md:py-20 lg:py-24">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-3 border border-red-300/25 bg-black/35 px-4 py-2 text-xs text-orange-100/85 shadow-ember backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-300 shadow-ember" />
            Rebel Memorial Archive / Panem Counter-Record
          </div>

          <h1
            aria-label="Mockingjay Memorial Archive"
            className="mt-5 max-w-4xl text-4xl font-black leading-[0.98] tracking-normal text-stone-50 sm:text-6xl lg:text-7xl"
          >
            <span aria-hidden="true">
              Mockingjay
              <span className="block bg-gradient-to-r from-orange-100 via-amber-300 to-red-300 bg-clip-text text-transparent">
                Memorial Archive
              </span>
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-orange-100/85">
            A private archive for Panem, rebellion, memory, and fire.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-stone-300/75">
            這是一座私人紀念檔案庫，用來整理角色、分區、時間線與閱讀後留下的
            記憶索引。它不是官方網站，而是一份把 Capitol 敘事重新拆開、
            交給分區記憶保存的地下反抗檔案。
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/characters"
              className="border border-orange-300/35 bg-orange-300/10 px-5 py-3 text-sm font-semibold uppercase text-orange-100 shadow-ember transition hover:border-orange-200/65 hover:bg-orange-300/20"
            >
              Characters
            </Link>
            <Link
              href="/districts"
              className="border border-stone-200/10 bg-black/20 px-5 py-3 text-sm font-semibold uppercase text-stone-200 transition hover:border-orange-200/30 hover:bg-white/[0.04]"
            >
              Districts
            </Link>
            <Link
              href="/timeline"
              className="border border-stone-200/10 bg-black/20 px-5 py-3 text-sm font-semibold uppercase text-stone-200 transition hover:border-orange-200/30 hover:bg-white/[0.04]"
            >
              Timeline
            </Link>
            <Link
              href="/#rebel-dispatch"
              className="border border-red-300/25 bg-red-950/25 px-5 py-3 text-sm font-semibold uppercase text-red-100 transition hover:border-red-200/45 hover:bg-red-900/30"
            >
              Rebel Signal
            </Link>
          </div>

          <div className="mt-5 flex max-w-2xl flex-wrap gap-2">
            {["Capitol Signal Jammed", "District Cells Online", "Witness Ledger Open"].map(
              (label) => (
                <span key={label} className="rebel-frequency">
                  {label}
                </span>
              ),
            )}
          </div>

          <div className="mt-6 grid max-w-xl grid-cols-3 border border-orange-200/10 bg-black/25 text-center backdrop-blur">
            <div className="border-r border-orange-200/10 px-2 py-3 sm:px-3 sm:py-4">
              <p className="text-xl font-black text-orange-100 sm:text-2xl">
                {stats.characters}
              </p>
              <p className="mt-1 text-[11px] uppercase text-stone-400">
                Rebel Witnesses
              </p>
            </div>
            <div className="border-r border-orange-200/10 px-2 py-3 sm:px-3 sm:py-4">
              <p className="text-xl font-black text-orange-100 sm:text-2xl">
                {stats.districts}
              </p>
              <p className="mt-1 text-[11px] uppercase text-stone-400">
                District Cells
              </p>
            </div>
            <div className="px-2 py-3 sm:px-3 sm:py-4">
              <p className="text-xl font-black text-orange-100 sm:text-2xl">
                {stats.timeline.toString().padStart(2, "0")}
              </p>
              <p className="mt-1 text-[11px] uppercase text-stone-400">
                Uprising Events
              </p>
            </div>
          </div>
        </div>

        <div className="monument-vault archive-panel relative min-h-[320px] overflow-hidden p-4 sm:min-h-[380px] sm:p-6 md:min-h-[440px] md:p-8">
          <Image
            src="/images/panem-archive-hero.jpg"
            alt="暗色地下紀念檔案館，火光照亮檔案櫃與紀念碑"
            fill
            priority
            sizes="(min-width: 768px) 42vw, 100vw"
            className="object-cover opacity-40 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="scanline" aria-hidden="true" />
          <div className="absolute inset-x-8 top-8 h-px bg-orange-200/20" />
          <div className="absolute inset-x-8 bottom-8 h-px bg-orange-200/20" />

          <div className="relative grid min-h-[286px] place-items-center border border-orange-100/10 bg-black/35 sm:min-h-[328px] md:min-h-[376px]">
            <div className="monument-arc" aria-hidden="true" />
            <div className="memorial-sigil" aria-label="Abstract memorial flame mark">
              <span className="sigil-wing sigil-wing-left" />
              <span className="sigil-wing sigil-wing-right" />
              <span className="sigil-flame" />
              <span className="sigil-core">M</span>
            </div>

            <div className="absolute bottom-5 left-1/2 w-[84%] -translate-x-1/2 sm:bottom-8 sm:w-[78%]">
              <div className="monument-plinth">
                <p className="text-center text-xs font-semibold uppercase text-orange-100/75">
                  Remember / Resist / Reclaim / Rebuild
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
