"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FAVORITES_STORAGE_KEY,
  type FavoriteItem,
} from "@/components/FavoriteButton";

function readFavorites() {
  try {
    const stored = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as FavoriteItem[]) : [];
  } catch {
    return [];
  }
}

export function FavoritesPanel() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    function syncFavorites() {
      setFavorites(readFavorites());
    }

    syncFavorites();
    window.addEventListener("storage", syncFavorites);
    window.addEventListener("mockingjay-favorites-updated", syncFavorites);

    return () => {
      window.removeEventListener("storage", syncFavorites);
      window.removeEventListener("mockingjay-favorites-updated", syncFavorites);
    };
  }, []);

  function removeFavorite(id: string) {
    const nextFavorites = favorites.filter((favorite) => favorite.id !== id);
    window.localStorage.setItem(
      FAVORITES_STORAGE_KEY,
      JSON.stringify(nextFavorites),
    );
    window.dispatchEvent(new Event("mockingjay-favorites-updated"));
    setFavorites(nextFavorites);
  }

  if (favorites.length === 0) {
    return (
      <div className="archive-card-enhanced archive-panel p-8 text-center">
        <p className="archive-kicker">Local Shelf</p>
        <h2 className="mt-4 text-2xl font-bold text-stone-50">
          尚未收藏任何檔案
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-300/75">
          在角色、分區、時間線或名言卡片上按下 Save，就會出現在這個本機收藏櫃。
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {favorites.map((favorite) => (
        <article
          key={favorite.id}
          className="archive-card-enhanced archive-panel p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="archive-kicker">{favorite.type}</p>
              <h2 className="mt-3 text-2xl font-bold text-stone-50">
                {favorite.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => removeFavorite(favorite.id)}
              className="rounded-[4px] border border-stone-200/10 bg-black/25 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-stone-400 transition hover:border-red-300/30 hover:bg-white/[0.035] hover:text-red-100"
            >
              Remove
            </button>
          </div>
          {favorite.subtitle ? (
            <p className="mt-4 text-sm leading-7 text-stone-300/75">
              {favorite.subtitle}
            </p>
          ) : null}
          <Link
            href={favorite.href}
            className="hero-action hero-action-primary mt-6 inline-flex px-4 py-3 text-xs font-semibold uppercase"
          >
            Open file
          </Link>
        </article>
      ))}
    </div>
  );
}
