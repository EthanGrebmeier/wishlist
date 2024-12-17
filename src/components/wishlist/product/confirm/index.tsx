"use client";

import React from "react";
import Modal from "./modal";
import type {
  Wishlist,
  WishlistProduct,
  WishlistProductReceipts,
  WishlistSharesWithUser,
} from "~/types/wishlist";

import { cn } from "~/lib/utils";

import type { Session } from "next-auth";
import { PackageCheck } from "lucide-react";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";
import { useAction } from "next-safe-action/hooks";
import { removeProductReceipt } from "~/server/actions/product";
import { useRouter } from "next/navigation";

type ConfirmReceiptProps = {
  wishlist: Wishlist;
  product: WishlistProduct;
  className?: string;
  wishlistShares: WishlistSharesWithUser[];
  session: Session;
  productReceipts?: WishlistProductReceipts[];
};

const ConfirmReceipt = ({
  wishlist,
  product,
  className,
  wishlistShares,
  session,
  productReceipts,
}: ConfirmReceiptProps) => {
  const hasReceipt = Boolean(productReceipts?.length);
  const router = useRouter();

  const { execute, isPending } = useAction(removeProductReceipt, {
    onSuccess: () => {
      router.refresh();
    },
  });

  if (hasReceipt)
    return (
      <div
        className={cn(
          "relative flex w-full flex-col justify-between gap-4 overflow-hidden text-balance rounded-lg border-2 border-black p-4 ",
          className,
        )}
      >
        <div className="absolute right-4 top-4">
          <ColoredIconWrapper className="bg-green-300">
            <PackageCheck size={20} />
          </ColoredIconWrapper>
        </div>
        <div>
          <h2 className="text-2xl font-medium">Item Received</h2>
          <p className=" text-pretty leading-tight">
            You have already received this product.
          </p>
        </div>
        <button
          onClick={() => execute({ productId: product.id })}
          disabled={isPending}
          className="w-fit -translate-x-2 translate-y-1.5 rounded-md px-2 py-1 font-bold transition-colors hover:bg-red-600/20"
        >
          {isPending ? "Removing..." : "Cancel Receipt"}
        </button>
      </div>
    );

  return (
    <div
      className={cn(
        "relative flex w-full flex-col justify-between gap-4 overflow-hidden text-balance rounded-lg border-2 border-black p-4 ",
        className,
      )}
    >
      <div className="absolute right-4 top-4">
        <ColoredIconWrapper className="bg-green-300">
          <PackageCheck size={20} />
        </ColoredIconWrapper>
      </div>
      <div>
        <h2 className="pr-8 text-2xl font-medium">Mark Product Received</h2>
        <p className=" mb-0.5 text-pretty leading-tight">
          Received this product?
        </p>
        <p className=" text-pretty leading-tight">
          Mark it as received to move it to{" "}
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
