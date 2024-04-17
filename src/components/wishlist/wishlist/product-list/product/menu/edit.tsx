"use client";
import { useState } from "react";

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

export const EditProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { product, wishlistId } = useProductMenu();
  const router = useRouter();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!product || !wishlistId) return;

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <DialogTrigger className="w-full text-left">
            Edit Product
          </DialogTrigger>
        </DropdownMenuItem>
        <DialogContent className="flex flex-col">
          <DialogHeader>
            <DialogTitle className="font-serif text-4xl font-medium">
              Edit Product{" "}
            </DialogTitle>
          </DialogHeader>
          <AddProductForm
            method="update"
            wishlistId={wishlistId}
            product={product}
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
      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
        <DrawerTrigger className="w-full text-left">Edit Product</DrawerTrigger>
      </DropdownMenuItem>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="font-serif text-4xl font-medium">
            Edit Product
          </DrawerTitle>
        </DrawerHeader>
        <div className="max-h-[clamp(400px,80vh,800px)] overflow-y-scroll p-4">
          <AddProductForm
            method="update"
            wishlistId={wishlistId}
            product={product}
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
