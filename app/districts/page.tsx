import { DistrictCard } from "@/components/DistrictCard";
import { SectionTitle } from "@/components/SectionTitle";
import { VisualBanner } from "@/components/VisualBanner";
import { getDistricts } from "@/lib/data";

export const metadata = {
  title: "分區資料",
};

export default function DistrictsPage() {
  const districts = getDistricts();

  return (
    <>
      <SectionTitle
        eyebrow="District Records"
        title="分區資料"
        description="一份私人整理的 Panem 分區索引，記錄產業、狀態與相關人物。"
      />
      <VisualBanner
        src="/images/district-records-map.png"
        alt="暗色金屬桌上的分區地圖、工業材料與標記針"
        label="Industrial District Ledger"
      />
      <section className="archive-shell pb-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {districts.map((district) => (
            <DistrictCard key={district.id} district={district} />
          ))}
        </div>
      </section>
    </>
  );
}
