"use client";

import { useQuery } from "@tanstack/react-query";
import { ScrollIcon } from "lucide-react";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { fetchWishlists } from "~/lib/wishlist/client/fetchWishlists";
import { useProductForm } from "./form";
import { cn, getBackgroundColor } from "~/lib/utils";
import { useAtomValue } from "jotai";
import { productToEditAtom } from "~/store/product-settings";

export const WishlistSelect = () => {
  const { data: wishlists, isLoading } = useQuery({
    queryKey: ["wishlists"],
    queryFn: fetchWishlists,
    throwOnError: true,
  });

  const { form } = useProductForm();
  const productToEdit = useAtomValue(productToEditAtom);

  const wishlistId = form.watch("wishlistId");

  if (isLoading)
    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-lg font-medium">
          <ScrollIcon size={16} />
          Wishlist
        </div>
        <div className="h-10 w-full animate-pulse rounded-md border border-black bg-gray-200" />
      </div>
    );

  if (!wishlists) return null;

  const selectedWishlist = wishlists.find(
    (wishlist) => wishlist.id === wishlistId,
  );

  const isDifferentWishlist =
    productToEdit && wishlistId !== productToEdit.wishlistId;

  console.log(productToEdit, wishlistId);

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-lg" htmlFor="wishlist-select">
        <div className="flex items-center gap-2">
          <ScrollIcon size={16} />
          Wishlist
        </div>
      </Label>

      <Select
        value={wishlistId}
        onValueChange={(value) => form.setValue("wishlistId", value)}
      >
        <SelectTrigger id="wishlist-select">
          <SelectValue placeholder="Select a wishlist">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "h-4 w-4 rounded-full border border-black",
                  getBackgroundColor(selectedWishlist?.color ?? "white"),
                )}
              />
              <div>{selectedWishlist?.name}</div>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {wishlists.map((wishlist) => {
            return (
              <SelectItem key={wishlist.id} value={wishlist.id}>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "h-4 w-4 rounded-full border border-black",
                      getBackgroundColor(wishlist.color ?? "white"),
                    )}
                  />
                  <div>{wishlist.name}</div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {isDifferentWishlist && (
        <p className="text-sm text-red-500">
          Warning: Moving this product to another wishlist will delete all
          product commitments.
        </p>
      )}
    </div>
  );
};
