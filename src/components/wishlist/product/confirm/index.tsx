"use client";

import React, { useEffect, useState } from "react";
import Modal from "./modal";
import type {
  Wishlist,
  WishlistProduct,
  WishlistSharesWithUser,
} from "~/types/wishlist";
import { getSharedUsers } from "~/lib/wishlist/getSharedUsers";
import AnimatedPackage from "./animated-package";
import { cn } from "~/lib/utils";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

type ConfirmReceiptProps = {
  wishlist: Wishlist;
  product: WishlistProduct;
  className?: string;
  wishlistShares: WishlistSharesWithUser[];
  session: Session;
};

const ConfirmReceipt = ({
  wishlist,
  product,
  className,
  wishlistShares,
  session,
}: ConfirmReceiptProps) => {
  return (
    <div
      className={cn(
        "relative grid w-full  grid-cols-[1fr_auto] justify-between gap-4 overflow-hidden text-balance ",
        className,
      )}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium">Received this item?</h2>
        <p className=" text-pretty leading-tight">
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
