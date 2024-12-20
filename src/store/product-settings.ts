import { atom } from "jotai";
import type { WishlistProduct } from "~/types/wishlist";

export const productToEditAtom = atom<WishlistProduct>();
export const isProductFormOpenAtom = atom(false);

export const productToDeleteAtom = atom<WishlistProduct | null>(null);
export const isProductDeleteOpenAtom = atom(false);

export const viewedProductAtom = atom<WishlistProduct | null>(null);

export const productToCopyAtom = atom<WishlistProduct | null>(null);

export const isProductCopyOpenAtom = atom(false);
