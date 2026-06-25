import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function readJson(relativePath) {
  const absolutePath = path.join(root, relativePath);
  return JSON.parse(fs.readFileSync(absolutePath, "utf-8"));
}

const requiredFiles = [
  "app/page.tsx",
  "app/characters/page.tsx",
  "app/districts/page.tsx",
  "app/timeline/page.tsx",
  "app/quotes/page.tsx",
  "app/gallery/page.tsx",
  "app/notes/page.tsx",
  "app/relationships/page.tsx",
  "app/favorites/page.tsx",
  "app/about/page.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
];

for (const relativePath of requiredFiles) {
  assert(fs.existsSync(path.join(root, relativePath)), `missing ${relativePath}`);
}

const gallery = readJson("data/gallery.json");
for (const item of gallery) {
  const imagePath = path.join(root, "public", item.src.replace(/^\//, ""));
  assert(fs.existsSync(imagePath), `missing image ${item.src}`);
}

const characters = readJson("data/characters.json");
const relationships = readJson("data/relationships.json");
const characterNames = new Set(characters.map((character) => character.name));

for (const relationship of relationships) {
  assert(
    characterNames.has(relationship.source),
    `unknown relationship source ${relationship.source}`,
  );
  assert(
    characterNames.has(relationship.target),
    `unknown relationship target ${relationship.target}`,
  );
}

const notesDir = path.join(root, "content", "notes");
const notes = fs.readdirSync(notesDir).filter((filename) => filename.endsWith(".md"));
assert(notes.length > 0, "missing Markdown notes");

for (const filename of notes) {
  const content = fs.readFileSync(path.join(notesDir, filename), "utf-8");
  assert(content.startsWith("---\n"), `${filename} missing frontmatter`);
  assert(content.includes("\n---\n"), `${filename} has invalid frontmatter`);
}

console.log("smoke test passed");
