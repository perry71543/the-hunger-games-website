import type { MetadataRoute } from "next";
import { getCharacters, getDistricts } from "@/lib/data";
import { getNotes } from "@/lib/notes";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://mockingjay-memorial-archive.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/characters",
    "/districts",
    "/timeline",
    "/quotes",
    "/gallery",
    "/notes",
    "/relationships",
    "/about",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })),
    ...getCharacters().map((character) => ({
      url: `${baseUrl}/characters/${character.slug}`,
      lastModified: new Date(),
    })),
    ...getDistricts().map((district) => ({
      url: `${baseUrl}/districts/${district.id}`,
      lastModified: new Date(),
    })),
    ...getNotes().map((note) => ({
      url: `${baseUrl}/notes/${note.slug}`,
      lastModified: new Date(note.date),
    })),
  ];
}
