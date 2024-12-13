"use client";

import { WishlistSelect } from "./wishlist-select";
import { useProductForm } from "./form";

export const AddProductWishlistSelect = () => {
  const { form } = useProductForm();
  const wishlistId = form.watch("wishlistId");

  return (
    <WishlistSelect
      wishlistId={wishlistId}
      setWishlistId={(wishlistId) => form.setValue("wishlistId", wishlistId)}
    />
  );
};
