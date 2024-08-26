import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage<"grid" | "list">(() => localStorage);

export const gridDisplayAtom = atomWithStorage<"grid" | "list">(
  "gridDisplay",
  "grid",
  storage,
  {
    getOnInit: true,
  },
);
