import Image from "next/image";
import { SectionTitle } from "@/components/SectionTitle";
import { getGalleryImages } from "@/lib/data";

export const metadata = {
  title: "視覺檔案牆",
};

export default function GalleryPage() {
  const images = getGalleryImages();

  return (
    <>
      <SectionTitle
        eyebrow="Visual Archive / Underground Press"
        title="視覺檔案牆"
        description="收錄本站使用的原創檔案館風格視覺素材，用火光、紙本、地圖、地下印刷與反抗通訊建立私人 Panem Archive 氛圍。"
      />
      <section className="archive-shell pb-16 pt-8">
        <div className="grid gap-5 md:grid-cols-2">
          {images.map((image) => (
            <article
              key={image.id}
              className="archive-card-enhanced archive-panel overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-orange-200/30 hover:shadow-ember"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-orange-200/10 bg-black/35">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover opacity-85 transition duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-black/20" />
                <p className="archive-kicker absolute bottom-4 left-4">
                  {image.category}
                </p>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-stone-50">
                  {image.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-stone-300/75">
                  {image.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
