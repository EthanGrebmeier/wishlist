"use client";
import { useFormState } from "react-dom";
import { deleteProduct } from "~/app/wishlist/[wishlistId]/actions";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { useProductMenu } from "./menuProvider";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";

const Delete = () => {
  const [state, action] = useFormState(deleteProduct, null);
  const { product, wishlistId } = useProductMenu();

  if (!product || !wishlistId) return;

  const actionWithProductId = action.bind(null, {
    productId: product.id,
    wishlistId,
  });

  return (
    <DropdownMenuItem onClick={(e) => e.preventDefault()}>
      <Dialog>
        <DialogTrigger className="w-full text-left text-red-500">
          Delete {product.name}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="inline-block">
            Are you sure you would like to delete{" "}
            <span className="font-bold"> {product.name}</span>?
          </DialogHeader>
          <DialogDescription> This action cannot be undone</DialogDescription>
          <div className="flex justify-between">
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <form action={actionWithProductId}>
              <Button variant="destructive">Delete</Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </DropdownMenuItem>
  );
};

export default Delete;
