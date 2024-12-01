"use client";
import { useProductMenu } from "./menuProvider";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";

import type { WishlistProduct } from "~/types/wishlist";
import { useSetAtom } from "jotai";
import {
  isProductFormOpenAtom,
  productToEditAtom,
} from "~/store/product-settings";

type EditProductProps = {
  wishlistId?: string;
  product?: WishlistProduct;
};

export const EditProduct = ({ wishlistId, product }: EditProductProps) => {
  const { product: menuProduct, wishlistId: menuWishlistId } = useProductMenu();
  const setProductToEdit = useSetAtom(productToEditAtom);
  const setIsProductFormOpen = useSetAtom(isProductFormOpenAtom);

  const editedProduct = menuProduct ?? product;
  const editedWishlistId = menuWishlistId ?? wishlistId;

  if (!(editedProduct && editedWishlistId)) return;

  return (
    <DropdownMenuItem
      onSelect={(e) => {
        e.preventDefault();
        setProductToEdit(menuProduct);
        setIsProductFormOpen(true);
      }}
    >
      Edit Product
    </DropdownMenuItem>
  );
};

export default EditProduct;
