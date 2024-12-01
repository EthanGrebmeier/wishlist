"use client";

import { Button } from "~/components/ui/button";
import {
  isWishlistSettingsOpenAtom,
  wishlistToEditAtom,
} from "~/store/wishlist-settings";
import { useSetAtom } from "jotai";
import { Settings } from "lucide-react";
import type { Wishlist } from "~/types/wishlist";

type CreateWishlistProps = {
  triggerClassName?: string;
};

export const CreateWishlist = ({ triggerClassName }: CreateWishlistProps) => {
  const setIsWishlistSettingsOpen = useSetAtom(isWishlistSettingsOpenAtom);

  return (
    <>
      <Button
        className={triggerClassName}
        onClick={() => setIsWishlistSettingsOpen(true)}
      >
        Create Wishlist
      </Button>
    </>
  );
};

type EditWishlistProps = {
  wishlist: Wishlist;
};
export const EditWishlist = ({ wishlist }: EditWishlistProps) => {
  const setIsWishlistSettingsOpen = useSetAtom(isWishlistSettingsOpenAtom);
  const setWishlistToEdit = useSetAtom(wishlistToEditAtom);
  return (
    <>
      <Button
        icon={<Settings size={15} />}
        variant="outline"
        onClick={() => {
          setWishlistToEdit({
            wishlistName: wishlist.name,
            isSecret: wishlist.isSecret,
            color: wishlist.color,
            createdById: wishlist.createdById,
            date: wishlist.dueDate ? new Date(wishlist.dueDate) : undefined,
            id: wishlist.id,
            imageUrl: wishlist.imageUrl ?? undefined,
          });
          setIsWishlistSettingsOpen(true);
        }}
      >
        Edit Wishlist
      </Button>
    </>
  );
};

export default CreateWishlist;
