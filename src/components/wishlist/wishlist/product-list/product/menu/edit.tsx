"use client";
import { type ReactNode, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { AddProductForm } from "../../../add-product/form";
import { useProductMenu } from "./menuProvider";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import type { WishlistProduct } from "~/types/wishlist";

type EditProductProps = {
  trigger?: ReactNode;
  wishlistId?: string;
  product?: WishlistProduct;
};

export const EditProduct = ({
  trigger,
  wishlistId,
  product,
}: EditProductProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { product: menuProduct, wishlistId: menuWishlistId } = useProductMenu();
  const router = useRouter();

  const editedProduct = menuProduct ?? product;
  const editedWishlistId = menuWishlistId ?? wishlistId;

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!(editedProduct && editedWishlistId)) return;

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {trigger ? (
          <DialogTrigger asChild>{trigger}</DialogTrigger>
        ) : (
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <DialogTrigger className="w-full text-left">
              Edit Product
            </DialogTrigger>
          </DropdownMenuItem>
        )}
        <DialogContent className="flex flex-col">
          <DialogHeader>
            <DialogTitle className="font-serif text-4xl font-medium">
              Edit Product{" "}
            </DialogTitle>
          </DialogHeader>
          <AddProductForm
            method="update"
            wishlistId={editedWishlistId}
            product={editedProduct}
            onSuccess={() => {
              router.refresh();
              setIsOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      {trigger ? (
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      ) : (
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <DrawerTrigger className="w-full text-left">
            Edit Product
          </DrawerTrigger>
        </DropdownMenuItem>
      )}

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="font-serif text-4xl font-medium">
            Edit Product
          </DrawerTitle>
        </DrawerHeader>
        <div className="max-h-[80svh] overflow-y-auto p-4">
          <AddProductForm
            method="update"
            wishlistId={editedWishlistId}
            product={editedProduct}
            onSuccess={() => {
              router.refresh();
              setIsOpen(false);
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EditProduct;
