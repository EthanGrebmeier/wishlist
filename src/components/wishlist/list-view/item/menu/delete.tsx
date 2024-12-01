"use client";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { useSetAtom } from "jotai";
import {
  isWishlistDeleteOpenAtom,
  wishlistToDeleteAtom,
} from "~/store/wishlist-form";
import { useWishlistMenu } from "./menuProvider";

const Delete = () => {
  const { wishlist } = useWishlistMenu();
  const setWishlistToDelete = useSetAtom(wishlistToDeleteAtom);
  const setIsWishlistDeleteOpen = useSetAtom(isWishlistDeleteOpenAtom);

  return (
    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
      <button
        onClick={() => {
          setWishlistToDelete(wishlist ?? null);
          setIsWishlistDeleteOpen(true);
        }}
        className="w-full text-left text-red-500"
      >
        Delete Wishlist
      </button>
    </DropdownMenuItem>
  );
};

export default Delete;
