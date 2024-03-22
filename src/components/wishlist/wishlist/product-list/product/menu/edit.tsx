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

export const EditProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { product, wishlistId } = useProductMenu();
  const router = useRouter();

  if (!product || !wishlistId) return;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
        <DialogTrigger className="w-full text-left">Edit Product</DialogTrigger>
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
};

export default EditProduct;
