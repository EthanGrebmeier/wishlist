import { atom } from "jotai";
import type { WishlistProduct } from "~/types/wishlist";

export const productToEditAtom = atom<WishlistProduct>();
export const isProductFormOpenAtom = atom(false);
