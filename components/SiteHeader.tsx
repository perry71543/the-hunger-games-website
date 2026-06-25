"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/characters", label: "Characters" },
  { href: "/districts", label: "Districts" },
  { href: "/timeline", label: "Timeline" },
  { href: "/quotes", label: "Quotes" },
  { href: "/gallery", label: "Gallery" },
  { href: "/notes", label: "Notes" },
  { href: "/relationships", label: "Relations" },
  { href: "/favorites", label: "Favorites" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-orange-200/10 bg-black/70 backdrop-blur-xl">
      <div className="archive-shell flex flex-col justify-center gap-2 py-2 md:min-h-16 md:flex-row md:items-center md:justify-between md:gap-3 md:py-3">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 place-items-center border border-orange-200/20 bg-zinc-950 text-sm font-black text-orange-200 shadow-ember transition group-hover:border-orange-200/40">
            MMA
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold uppercase tracking-[0.22em] text-stone-100">
              Mockingjay Memorial
            </span>
            <span className="hidden text-xs text-stone-400 sm:block">
              Private Panem Archive
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="site-nav-scroll -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0"
        >
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 border px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition duration-200 ${
                  isActive
                    ? "border-orange-300/45 bg-orange-300/10 text-orange-100"
                    : "border-transparent text-stone-400 hover:border-orange-200/20 hover:bg-white/[0.035] hover:text-stone-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
