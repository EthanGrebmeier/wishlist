"use client";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
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

  console.log(product);

  if (!product || !wishlistId) return;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <p className="w-full"> Edit Product </p>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h1 className="text-4xl font-medium">Edit Product </h1>
          <AddProductForm
            method="update"
            wishlistId={wishlistId}
            product={product}
            onSuccess={() => {
              router.refresh();
              setIsOpen(false);
            }}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditProduct;
