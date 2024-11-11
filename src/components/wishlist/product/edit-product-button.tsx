"use client";
import { useSetAtom } from "jotai";
import { PencilIcon } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import { isProductFormOpenAtom, productToEditAtom } from "~/store/product-form";
import { WishlistProduct } from "~/types/wishlist";

type EditProductButtonProps = {
  product: WishlistProduct;
};

const EditProductButton = ({ product }: EditProductButtonProps) => {
  const setIsProductFormOpen = useSetAtom(isProductFormOpenAtom);
  const setProductToEdit = useSetAtom(productToEditAtom);
  return (
    <Button
      size="circle"
      onClick={() => {
        setIsProductFormOpen(true);
        setProductToEdit(product);
      }}
    >
      <PencilIcon size={20} />
    </Button>
  );
};

export default EditProductButton;
