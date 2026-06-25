import Link from "next/link";

type Breadcrumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: Breadcrumb[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="archive-shell pt-6">
      <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.16em] text-stone-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition hover:text-orange-100"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-orange-100/80">{item.label}</span>
              )}
              {!isLast ? <span className="text-orange-200/30">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
