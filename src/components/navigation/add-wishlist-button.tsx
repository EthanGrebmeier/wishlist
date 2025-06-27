"use client";

import { PlusIcon } from "lucide-react";
import { useSetAtom } from "jotai";
import { isWishlistSettingsOpenAtom } from "~/store/wishlist-settings";

export const AddWishlistButton = () => {
  const setIsAddWishlistModalOpen = useSetAtom(isWishlistSettingsOpenAtom);
  return (
    <button
      className="flex h-6 w-8 items-center justify-center gap-2 rounded-md border border-black transition-colors duration-300 hover:bg-green-200"
      onClick={() => setIsAddWishlistModalOpen(true)}
    >
      <PlusIcon size={16} />
    </button>
  );
};
