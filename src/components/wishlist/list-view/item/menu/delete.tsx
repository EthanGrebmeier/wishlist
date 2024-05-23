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
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

const Delete = () => {
  const { execute } = useAction(deleteWishlist);
  const { wishlist } = useWishlistMenu();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!wishlist) return;

  if (isDesktop) {
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
            <p className="text-lg font-medium">
              Are you sure you would like to delete
              <span className="text-sm font-bold"> {wishlist.name}</span>?
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
  }

  return (
    <Drawer>
      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
        <DrawerTrigger className="w-full text-left text-red-500">
          Delete Wishlist
        </DrawerTrigger>
      </DropdownMenuItem>
      <DrawerContent>
        <DrawerHeader className="text-start">
          <DrawerTitle className="font-serif text-4xl font-medium">
            Delete Wishlist
          </DrawerTitle>
          <p className="text-lg font-medium">
            Are you sure you would like to delete
            <span className="text-sm font-bold"> {wishlist.name}</span>?
          </p>
        </DrawerHeader>
        <DrawerDescription className="px-4">
          This action cannot be undone
        </DrawerDescription>
        <div className="max-h-[80svh] overflow-y-auto p-4">
          <form action={() => execute({ wishlistId: wishlist.id })}>
            <SubmitButton variant="destructive">Delete</SubmitButton>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Delete;
