import React from "react";
import Modal from "./modal";
import type { Wishlist, WishlistProduct } from "~/types/wishlist";
import { getSharedUsers } from "~/lib/wishlist/getSharedUsers";
import AnimatedPackage from "./animated-package";

type ConfirmReceiptProps = {
  wishlist: Wishlist;
  product: WishlistProduct;
};

const ConfirmReceipt = async ({ wishlist, product }: ConfirmReceiptProps) => {
  const sharedUsers = await getSharedUsers({ wishlistId: wishlist.id });

  return (
    <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-md border-2 border-black p-4 md:w-1/2 lg:w-full">
      <p className="mb-4 font-serif text-2xl font-medium leading-tight">
        Have you received this item?
      </p>
      <Modal product={product} sharedUsers={sharedUsers} wishlist={wishlist} />
      <AnimatedPackage />
    </div>
  );
};

export default ConfirmReceipt;
