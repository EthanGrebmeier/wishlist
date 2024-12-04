"use client";

import { Button } from "~/components/ui/button";
import { useSetAtom } from "jotai";
import { isWishlistSettingsOpenAtom } from "~/store/wishlist-settings";

export const CreateWishlistButton = () => {
  const setIsOpen = useSetAtom(isWishlistSettingsOpenAtom);
  return <Button onClick={() => setIsOpen(true)}>Create Wishlist</Button>;
};
