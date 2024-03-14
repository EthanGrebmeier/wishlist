"use client";
import { useFormState } from "react-dom";
import { Button } from "~/components/ui/button";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";

import { deleteWishlist } from "~/app/wishlist/actions";
import { useWishlistMenu } from "./menuProvider";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";

const Delete = () => {
  const [state, action] = useFormState(deleteWishlist, null);
  const { wishlist } = useWishlistMenu();

  if (!wishlist) return;

  const actionWithWishlistId = action.bind(null, {
    wishlistId: wishlist.id,
  });

  return (
    <DropdownMenuItem onClick={(e) => e.preventDefault()}>
      <Dialog>
        <DialogTrigger className="text-left text-red-500">
          Delete Wishlist
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="inline-block">
            Are you sure you would like to delete{" "}
            <span className="font-bold"> {wishlist.name}</span>?
          </DialogHeader>
          <DialogDescription> This action cannot be undone</DialogDescription>
          <div className="flex justify-between">
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <form action={actionWithWishlistId}>
              <Button variant="destructive">Delete</Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </DropdownMenuItem>
  );
};

export default Delete;
