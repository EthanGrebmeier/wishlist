import { atom } from "jotai";

import { Wishlist } from "~/types/wishlist";

export const wishlistToDeleteAtom = atom<Wishlist | null>(null);
export const isWishlistDeleteOpenAtom = atom(false);
