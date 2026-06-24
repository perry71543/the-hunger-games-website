import { CharacterCard } from "@/components/CharacterCard";
import { SectionTitle } from "@/components/SectionTitle";
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
      <section className="archive-shell pb-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {characters.map((character) => (
            <CharacterCard key={character.slug} character={character} />
          ))}
        </div>
      </section>
    </>
  );
}
