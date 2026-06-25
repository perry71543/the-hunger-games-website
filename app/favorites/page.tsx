import { FavoritesPanel } from "@/components/FavoritesPanel";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata = {
  title: "本機收藏",
};

export default function FavoritesPage() {
  return (
    <>
      <SectionTitle
        eyebrow="Local Favorites"
        title="本機收藏"
        description="收藏內容只保存在這台瀏覽器的 localStorage，不需要帳號，也不會傳到外部服務。"
      />
      <section className="archive-shell pb-16 pt-8">
        <FavoritesPanel />
      </section>
    </>
  );
}
