"use client";
import { useFormState } from "react-dom";
import { deleteProduct } from "~/app/wishlist/[wishlistId]/actions";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { useProductMenu } from "./menuProvider";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { SubmitButton } from "~/components/ui/submit-button";
import { useEffect, useState } from "react";

const Delete = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, action] = useFormState(deleteProduct, null);
  const { product, wishlistId } = useProductMenu();

  useEffect(() => {
    setIsOpen(false);
  }, [product]);

  if (!product || !wishlistId) return;

  const actionWithProductId = action.bind(null, {
    productId: product.id,
    wishlistId,
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
        <DialogTrigger className="w-full text-left text-red-500">
          Delete {product.name}
        </DialogTrigger>
      </DropdownMenuItem>
      <DialogContent>
        <DialogHeader className="inline-block font-serif text-4xl font-medium">
          Delete Product
        </DialogHeader>
        <p>
          Are you sure you would like to delete{" "}
          <span className="font-bold"> {product.name}</span>?
        </p>{" "}
        <DialogDescription>This action cannot be undone</DialogDescription>
        <div className="flex justify-between">
          <DialogClose asChild>
            <Button>Cancel</Button>
          </DialogClose>
          <form action={actionWithProductId}>
            <SubmitButton variant="destructive">Delete</SubmitButton>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Delete;
