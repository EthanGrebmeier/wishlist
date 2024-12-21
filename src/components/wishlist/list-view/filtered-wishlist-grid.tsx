"use client";

import { useAtomValue } from "jotai";
import { wishlistTypeAtom } from "~/store/wishlist-type";
import WishlistGrid from "./wishlist-grid";
import { WishlistFilter } from "./wishlist-filter";
import type { WishlistWithProducts } from "~/types/wishlist";
import { SearchBar } from "~/components/ui/search-bar";
import { useState } from "react";

type FilteredWishlistGridProps = {
  wishlists: WishlistWithProducts[];
};

export const FilteredWishlistGrid = ({
  wishlists,
}: FilteredWishlistGridProps) => {
  const wishlistType = useAtomValue(wishlistTypeAtom);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWishlists = wishlists.filter((wishlist) => {
    const matchesType =
      wishlistType === "all"
        ? true
        : wishlistType === "mine"
          ? wishlist.isOwner
          : !wishlist.isOwner;

    const matchesSearch =
      searchQuery === ""
        ? true
        : wishlist.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <SearchBar
          onChange={setSearchQuery}
          shouldDebounce={true}
          className="w-full md:max-w-md"
        />
        <WishlistFilter />
      </div>
      <WishlistGrid wishlists={filteredWishlists} />
    </div>
  );
};
