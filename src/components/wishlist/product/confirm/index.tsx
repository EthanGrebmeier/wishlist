import React from "react";
import Modal from "./modal";
import type { Wishlist, WishlistProduct } from "~/types/wishlist";
import { getSharedUsers } from "~/lib/wishlist/getSharedUsers";
import AnimatedPackage from "./animated-package";
import { cn } from "~/lib/utils";
import { getServerAuthSession } from "~/server/auth";

type ConfirmReceiptProps = {
  wishlist: Wishlist;
  product: WishlistProduct;
  className?: string;
};

const ConfirmReceipt = async ({
  wishlist,
  product,
  className,
}: ConfirmReceiptProps) => {
  const session = await getServerAuthSession();
  const wishlistShares = await getSharedUsers({ wishlistId: wishlist.id });

  if (!session) {
    throw new Error("this should not happen");
  }

  return (
    <div
      className={cn(
        "relative grid w-full grid-cols-[1fr_auto] justify-between overflow-hidden rounded-md border-2 border-black p-4 md:w-1/2 lg:w-full",
        className,
      )}
    >
      <div>
        <h2 className=" font-serif text-2xl font-medium leading-tight">
          Received this item?
        </h2>
        <p className=" text-balance font-sans text-sm leading-tight tracking-tight">
          Mark this item as received to move it to{" "}
          <span className="font-serif"> My Gifts </span>
        </p>
      </div>
      <div className="flex items-center">
        <Modal
          session={session}
          product={product}
          wishlistShares={wishlistShares}
          wishlist={wishlist}
        />
      </div>
    </div>
  );
};

export default ConfirmReceipt;
