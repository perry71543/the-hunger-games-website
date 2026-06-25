import charactersData from "@/data/characters.json";
import districtsData from "@/data/districts.json";
import galleryData from "@/data/gallery.json";
import quotesData from "@/data/quotes.json";
import relationshipsData from "@/data/relationships.json";
import timelineData from "@/data/timeline.json";

export type Character = {
  name: string;
  slug: string;
  district: string;
  role: string;
  firstAppearance: string;
  description: string;
  tags: string[];
  relatedQuotes: string[];
};

export type District = {
  id: string;
  name: string;
  industry: string;
  status: string;
  description: string;
  notableCharacters: string[];
};

export type TimelineEvent = {
  id: string;
  era: string;
  title: string;
  description: string;
  relatedCharacters: string[];
};

export type Quote = {
  id: string;
  text: string;
  speaker: string;
  source: string;
  note: string;
};

export type GalleryImage = {
  id: string;
  title: string;
  category: string;
  src: string;
  alt: string;
  description: string;
};

export type Relationship = {
  id: string;
  source: string;
  target: string;
  type: string;
  note: string;
};

const characters = charactersData as Character[];
const districts = districtsData as District[];
const timeline = timelineData as TimelineEvent[];
const quotes = quotesData as Quote[];
const gallery = galleryData as GalleryImage[];
const relationships = relationshipsData as Relationship[];

export function getCharacters() {
  return characters;
}

export function getCharacterBySlug(slug: string) {
  return characters.find((character) => character.slug === slug);
}

export function getDistricts() {
  return districts;
}

export function getDistrictById(id: string) {
  return districts.find((district) => district.id === id);
}

export function getTimeline() {
  return timeline;
}

export function getQuotes() {
  return quotes;
}

export function getGalleryImages() {
  return gallery;
}

export function getRelationships() {
  return relationships;
}
