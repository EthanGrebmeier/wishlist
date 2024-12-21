import { atomWithStorage, createJSONStorage } from "jotai/utils";

const displayStorage = createJSONStorage<"grid" | "list">(() => localStorage);
const wishlistTypeStorage = createJSONStorage<"mine" | "shared">(
  () => localStorage,
);

export const gridDisplayAtom = atomWithStorage<"grid" | "list">(
  "gridDisplay",
  "grid",
  displayStorage,
);

export const wishlistTypeAtom = atomWithStorage<"mine" | "shared">(
  "wishlistType",
  "mine",
  wishlistTypeStorage,
);
