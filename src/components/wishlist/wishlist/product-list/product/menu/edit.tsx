"use client";
import { type ReactNode, useState } from "react";

import { AddProductForm } from "../../../add-product/form";
import { useProductMenu } from "./menuProvider";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

import type { WishlistProduct } from "~/types/wishlist";
import ResponsiveDialog from "~/components/ui/responsive-dialog";

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
  const { product: menuProduct, wishlistId: menuWishlistId } = useProductMenu();
  const router = useRouter();

  const editedProduct = menuProduct ?? product;
  const editedWishlistId = menuWishlistId ?? wishlistId;

  if (!(editedProduct && editedWishlistId)) return;

  return (
    <ResponsiveDialog
      title="Edit Product"
      trigger={
        trigger ?? (
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Edit Product
          </DropdownMenuItem>
        )
      }
    >
      <AddProductForm
        method="update"
        wishlistId={editedWishlistId}
        product={editedProduct}
        onSuccess={() => {
          router.refresh();
        }}
      />
    </ResponsiveDialog>
  );
};

export default EditProduct;
