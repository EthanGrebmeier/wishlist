"use client";
import { Button } from "~/components/ui/button";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";

import { useWishlistMenu } from "./menuProvider";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useAction } from "next-safe-action/hooks";
import { SubmitButton } from "~/components/ui/submit-button";
import { deleteWishlist } from "~/server/actions/wishlist";

const Delete = () => {
  const { execute } = useAction(deleteWishlist);
  const { wishlist } = useWishlistMenu();

  if (!wishlist) return;

  return (
    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
      <Dialog>
        <DialogTrigger className="text-left text-red-500">
          Delete Wishlist
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="inline-block font-serif text-4xl font-medium">
            Delete Wishlist
          </DialogHeader>
          <p>
            {" "}
            Are you sure you would like to delete{" "}
            <span className="font-bold"> {wishlist.name}</span>?
          </p>
          <DialogDescription> This action cannot be undone</DialogDescription>
          <div className="flex justify-between">
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <form action={() => execute({ wishlistId: wishlist.id })}>
              <SubmitButton variant="destructive">Delete</SubmitButton>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </DropdownMenuItem>
  );
};

export default Delete;
