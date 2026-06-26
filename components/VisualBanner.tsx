import Image from "next/image";

type VisualBannerProps = {
  src: string;
  alt: string;
  label: string;
  signal?: string;
};

export function VisualBanner({ src, alt, label, signal }: VisualBannerProps) {
  return (
    <section className="archive-shell pb-8">
      <div className="archive-card-enhanced archive-panel relative overflow-hidden p-3">
        <div className="relative aspect-[16/7] min-h-[190px] overflow-hidden border border-orange-100/10 bg-black/35">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-black/55" />
          {signal ? (
            <span className="rebel-stamp absolute right-5 top-5">{signal}</span>
          ) : null}
          <div className="absolute inset-x-0 bottom-0 border-t border-orange-200/10 bg-black/45 px-5 py-4 backdrop-blur">
            <p className="archive-kicker">{label}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
