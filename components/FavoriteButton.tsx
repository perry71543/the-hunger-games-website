"use client";

import { useEffect, useState } from "react";

export type FavoriteItem = {
  id: string;
  type: string;
  title: string;
  href: string;
  subtitle?: string;
};

const STORAGE_KEY = "mockingjay-memorial:favorites";

function readFavorites() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as FavoriteItem[]) : [];
  } catch {
    return [];
  }
}

function writeFavorites(items: FavoriteItem[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("mockingjay-favorites-updated"));
}

export function FavoriteButton({
  item,
  compact = false,
}: {
  item: FavoriteItem;
  compact?: boolean;
}) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(readFavorites().some((favorite) => favorite.id === item.id));
  }, [item.id]);

  function toggleFavorite() {
    const favorites = readFavorites();
    const exists = favorites.some((favorite) => favorite.id === item.id);
    const nextFavorites = exists
      ? favorites.filter((favorite) => favorite.id !== item.id)
      : [item, ...favorites];

    writeFavorites(nextFavorites);
    setIsSaved(!exists);
  }

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      className={`border text-xs font-semibold uppercase tracking-[0.16em] transition ${
        compact ? "px-3 py-2" : "px-4 py-3"
      } ${
        isSaved
          ? "border-orange-300/45 bg-orange-300/15 text-orange-100"
          : "border-stone-200/10 bg-black/25 text-stone-400 hover:border-orange-200/30 hover:text-orange-100"
      }`}
      aria-pressed={isSaved}
    >
      {isSaved ? "Saved" : "Save"}
    </button>
  );
}

export { STORAGE_KEY as FAVORITES_STORAGE_KEY };
