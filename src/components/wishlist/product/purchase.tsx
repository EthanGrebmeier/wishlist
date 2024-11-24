"use client";

import Link from "next/link";
import CommitNew from "./commit-new";
import { WishlistProductCommitmentsWithUser } from "~/types/wishlist";
import { WishlistProduct } from "~/types/wishlist";
import ButtonLink from "~/components/ui/button-link";
import { ExternalLinkIcon, InfoIcon, LockIcon } from "lucide-react";
import { Tooltip } from "~/components/ui/tooltip";
import { Session } from "next-auth";

type PurchaseProps = {
  url: string | null;
  username?: string | null;
  product: WishlistProduct;
  productCommitments?: WishlistProductCommitmentsWithUser[];
  isWishlistSecret: boolean;
  session: Session;
};

export default function PurchaseProduct({
  url,
  username,
  product,
  productCommitments,
  isWishlistSecret,
  session,
}: PurchaseProps) {
  const hasUserCommitted = Boolean(
    productCommitments?.find(
      (commitment) => commitment.createdById === session.user.id,
    ),
  );
  return (
    <div className="relative flex flex-col gap-2">
      <div className="absolute right-0.5 top-0">
        <div className="flex text-xl ">
          <span className="-translate-x-0.5 -translate-y-1 font-medium">
            {productCommitments?.length || 0}
          </span>{" "}
          /{" "}
          <span className="translate-x-0.5 translate-y-1 font-medium">
            {product.quantity}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-lg font-medium">Commit to this item</p>
        <Tooltip
          text={
            isWishlistSecret
              ? "This wishlist is secret, the owner will not see your commitment."
              : "The wishlist owner will be able to see your commitment."
          }
        >
          {isWishlistSecret ? (
            <div className="rounded-sm border border-black bg-yellow-400 p-1">
              <LockIcon size={12} />
            </div>
          ) : (
            <div className="rounded-sm border border-black bg-blue-300 p-1">
              <InfoIcon size={12} />
            </div>
          )}
        </Tooltip>
      </div>
      <p className="max-w-[300px] text-pretty">
        Selecting this will let other people on this wishlist know you are
        providing this item.
      </p>
      <CommitNew
        product={product}
        productCommitments={productCommitments}
        hasUserCommitted={hasUserCommitted}
      />
    </div>
  );
}
