import { atom } from "jotai";
import type { wishlistSettingsSchema } from "~/schema/wishlist/wishlist";
import type { z } from "zod";
import type { Wishlist } from "~/types/wishlist";
export const isWishlistSettingsOpenAtom = atom(false);
export const wishlistToEditAtom = atom<z.infer<
  typeof wishlistSettingsSchema
> | null>(null);
export const wishlistToDeleteAtom = atom<Wishlist | null>(null);
export const isWishlistDeleteOpenAtom = atom(false);
export const canUserEditAtom = atom(false);
export const viewedWishlistAtom = atom<z.infer<
  typeof wishlistSettingsSchema
> | null>(null);

export const isWishlistShareOpenAtom = atom(false);
