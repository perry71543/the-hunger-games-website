import { SectionTitle } from "@/components/SectionTitle";
import { VisualBanner } from "@/components/VisualBanner";
import { TimelineExplorer } from "@/components/explorer/TimelineExplorer";
import { getTimeline } from "@/lib/data";

export const metadata = {
  title: "時間線",
};

export default function TimelinePage() {
  const events = getTimeline();

  return (
    <>
      <SectionTitle
        eyebrow="Historical Timeline"
        title="Panem 時間線"
        description="從黑暗年代到戰後重建，將故事中的政治創傷、競技場與反抗脈絡整理成一條私人年表。"
      />
      <VisualBanner
        src="/images/timeline-archive.jpg"
        alt="地下歷史檔案長廊，牆上排列焦痕文件與時間線標記"
        label="Rebellion / Collapse / Reconstruction"
      />
      <section className="archive-shell pb-16">
        <TimelineExplorer events={events} />
      </section>
    </>
  );
}
