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
  const wishlistShares = await getSharedUsers({ wishlistId: wishlist.id });

  return (
    <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-md border-2 border-black p-4 md:w-1/2 lg:w-full">
      <h2 className=" font-serif text-2xl font-medium leading-tight">
        Have you received this item?
      </h2>
      <p className="mb-4 text-balance font-sans leading-tight tracking-tight">
        Mark this item as received to move it to{" "}
        <span className="font-serif"> My Gifts </span>
      </p>
      <Modal
        product={product}
        wishlistShares={wishlistShares}
        wishlist={wishlist}
      />
      <AnimatedPackage />
    </div>
  );
};

export default ConfirmReceipt;
