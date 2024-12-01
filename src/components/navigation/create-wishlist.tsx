"use client";

import { Plus } from "lucide-react";
import { useSetAtom } from "jotai";
import { isWishlistSettingsOpenAtom } from "~/store/wishlist-settings";

export default function CreateWishlist() {
  const setIsWishlistSettingsOpen = useSetAtom(isWishlistSettingsOpenAtom);

  return (
    <button
      onClick={() => {
        setIsWishlistSettingsOpen(true);
      }}
      className="group flex w-full items-center gap-1 rounded-md px-1 text-lg font-medium transition-all hover:bg-green-300"
    >
      <Plus className="group-hover:animate-shake " size={20} />
      Create Wishlist{" "}
    </button>
  );
}
