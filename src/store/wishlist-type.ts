import { atomWithStorage, createJSONStorage } from "jotai/utils";

const wishlistTypeStorage = createJSONStorage<"all" | "mine" | "shared">(
  () => localStorage,
);

export const wishlistTypeAtom = atomWithStorage<"all" | "mine" | "shared">(
  "wishlist-type",
  "all",
  wishlistTypeStorage,
);
