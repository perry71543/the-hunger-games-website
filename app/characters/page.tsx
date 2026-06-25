import { SectionTitle } from "@/components/SectionTitle";
import { VisualBanner } from "@/components/VisualBanner";
import { CharacterExplorer } from "@/components/explorer/CharacterExplorer";
import { getCharacters } from "@/lib/data";

export const metadata = {
  title: "角色檔案",
};

export default function CharactersPage() {
  const characters = getCharacters();

  return (
    <>
      <SectionTitle
        eyebrow="Character Files"
        title="角色檔案"
        description="以私人檔案庫形式整理 Panem 相關人物，包含分區、身份、標籤與簡短註記。"
      />
      <VisualBanner
        src="/images/character-dossiers.jpg"
        alt="暗色角色檔案牆，排列著匿名人物剪影與資料夾"
        label="Tribute / Victor / Rebel Records"
      />
      <section className="archive-shell pb-16">
        <CharacterExplorer characters={characters} />
      </section>
    </>
  );
}
