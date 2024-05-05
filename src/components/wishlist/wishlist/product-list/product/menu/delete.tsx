"use client";
import { deleteProduct } from "~/app/wishlist/[wishlistId]/actions";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { useProductMenu } from "./menuProvider";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { SubmitButton } from "~/components/ui/submit-button";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { useAction } from "next-safe-action/hooks";

const Delete = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { execute } = useAction(deleteProduct);
  const { product, wishlistId } = useProductMenu();

  useEffect(() => {
    setIsOpen(false);
  }, [product]);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!product || !wishlistId) return;

  const actionWithProductId = () => {
    execute({
      productId: product.id,
      wishlistId: product.wishlistId,
    });
  };

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <DialogTrigger className="w-full text-left text-red-500">
            <span className="line-clamp-1 w-full">Delete {product.name} </span>
          </DialogTrigger>
        </DropdownMenuItem>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="inline-block font-serif text-4xl font-medium">
              Delete Product
            </DialogTitle>
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
  }

  return (
    <Drawer>
      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
        <DrawerTrigger className="w-full text-left text-red-500">
          Delete Product
        </DrawerTrigger>
      </DropdownMenuItem>
      <DrawerContent>
        <DrawerHeader className="text-start">
          <DrawerTitle className="font-serif text-4xl font-medium">
            Delete Product
          </DrawerTitle>
          <p>
            Are you sure you would like to delete{" "}
            <span className="font-bold"> {product.name}</span>?
          </p>{" "}
        </DrawerHeader>
        <DrawerDescription className="px-4">
          This action cannot be undone
        </DrawerDescription>
        <div className="p-4">
          <form action={actionWithProductId}>
            <SubmitButton variant="destructive">Delete</SubmitButton>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Delete;
