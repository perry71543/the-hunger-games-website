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
    <header className="site-header sticky top-0 z-50 border-b border-orange-200/10 backdrop-blur-xl">
      <div className="archive-shell grid gap-2 py-2 md:min-h-16 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-5 lg:py-3">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="brand-mark grid h-10 w-10 shrink-0 place-items-center border border-orange-200/20 text-sm font-black text-orange-200 shadow-ember transition group-hover:border-orange-200/40">
            MMA
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold uppercase tracking-[0.14em] text-stone-100">
              Mockingjay Memorial
            </span>
            <span className="hidden text-xs text-stone-400 sm:block">
              Private Panem Counter-Archive
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="site-nav-scroll -mx-5 flex gap-1.5 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0 md:pb-0 lg:justify-end"
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
                className={`nav-link shrink-0 px-2.5 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] ${
                  isActive ? "nav-link-active" : ""
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
