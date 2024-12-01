"use client";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { useSetAtom } from "jotai";
import {
  isWishlistDeleteOpenAtom,
  wishlistToDeleteAtom,
} from "~/store/wishlist-settings";
import { useWishlistMenu } from "./menuProvider";

const Delete = () => {
  const { wishlist } = useWishlistMenu();
  const setWishlistToDelete = useSetAtom(wishlistToDeleteAtom);
  const setIsWishlistDeleteOpen = useSetAtom(isWishlistDeleteOpenAtom);

  return (
    <DropdownMenuItem
      onSelect={() => {
        setWishlistToDelete(wishlist ?? null);
        setIsWishlistDeleteOpen(true);
      }}
      className="text-left text-red-500"
    >
      Delete Wishlist
    </DropdownMenuItem>
  );
};

export default Delete;
