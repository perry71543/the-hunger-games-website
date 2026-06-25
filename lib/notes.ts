import fs from "node:fs";
import path from "node:path";

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

export type ArchiveNote = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  relatedCharacters: string[];
  body: string;
};

type ParsedFrontmatter = Omit<ArchiveNote, "slug" | "body">;

function parseList(value: string) {
  const trimmed = value.trim();

  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) {
    return [];
  }

  return trimmed
    .slice(1, -1)
    .split(",")
    .map((entry) => entry.trim().replace(/^"|"$/g, ""))
    .filter(Boolean);
}

function parseFrontmatter(raw: string): {
  frontmatter: ParsedFrontmatter;
  body: string;
} {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    throw new Error("Missing frontmatter block");
  }

  const [, frontmatterSource, body] = match;
  const frontmatter = frontmatterSource.split("\n").reduce<
    Partial<ParsedFrontmatter>
  >((result, line) => {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      return result;
    }

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^"|"$/g, "");

    if (key === "relatedCharacters") {
      result.relatedCharacters = parseList(rawValue);
      return result;
    }

    if (
      key === "title" ||
      key === "date" ||
      key === "category" ||
      key === "excerpt"
    ) {
      result[key] = value;
    }

    return result;
  }, {});

  const requiredFields: Array<keyof ParsedFrontmatter> = [
    "title",
    "date",
    "category",
    "excerpt",
    "relatedCharacters",
  ];

  for (const field of requiredFields) {
    if (!frontmatter[field]) {
      throw new Error(`Missing note frontmatter field: ${field}`);
    }
  }

  return {
    frontmatter: frontmatter as ParsedFrontmatter,
    body: body.trim(),
  };
}

function getNoteSlugs() {
  return fs
    .readdirSync(NOTES_DIR)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => filename.replace(/\.md$/, ""));
}

export function getNotes() {
  return getNoteSlugs()
    .map((slug) => getNoteBySlug(slug))
    .filter((note): note is ArchiveNote => Boolean(note))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNoteBySlug(slug: string) {
  const filename = `${slug}.md`;
  const filePath = path.join(NOTES_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { frontmatter, body } = parseFrontmatter(raw);

  return {
    slug,
    ...frontmatter,
    body,
  };
}
