"use client";
import { deleteWishlist } from "~/server/actions/wishlist";
import { useAction } from "next-safe-action/hooks";
import ResponsiveSheet from "../ui/responsive-sheet";
import { useAtom } from "jotai";
import {
  isWishlistDeleteOpenAtom,
  wishlistToDeleteAtom,
} from "~/store/wishlist-form";
import { Button } from "../ui/button";
import { SubmitButton } from "../ui/submit-button";
import { Trash2Icon } from "lucide-react";
import ColoredIconWrapper from "../ui/colored-icon-wrapper";

export const DeleteWishlistSheet = () => {
  const [isOpen, setIsOpen] = useAtom(isWishlistDeleteOpenAtom);
  const [wishlistToDelete, setWishlistToDelete] = useAtom(wishlistToDeleteAtom);
  const { execute } = useAction(deleteWishlist, {
    onSuccess: () => {
      setIsOpen(false);
      setWishlistToDelete(null);
    },
  });

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setWishlistToDelete(null);
    }
    setIsOpen(open);
  };

  return (
    <ResponsiveSheet
      isOpen={isOpen}
      setIsOpen={onOpenChange}
      title="Delete Wishlist"
      titleIcon={
        <ColoredIconWrapper className="bg-red-500">
          <Trash2Icon size={20} />
        </ColoredIconWrapper>
      }
    >
      <div className="flex flex-col gap-2 pt-4">
        <p className="text-lg font-medium">
          Are you sure you would like to delete
          <span className="font-bold"> {wishlistToDelete?.name}</span>?
        </p>
        <p className="text-sm text-muted-foreground">
          This action cannot be undone
        </p>
        <div className="mt-4 flex justify-between gap-4">
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          {wishlistToDelete && (
            <form action={() => execute({ wishlistId: wishlistToDelete.id })}>
              <SubmitButton variant="destructive">Delete</SubmitButton>
            </form>
          )}
        </div>
      </div>
    </ResponsiveSheet>
  );
};
