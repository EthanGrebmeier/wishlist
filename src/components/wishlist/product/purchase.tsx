"use client";

import CommitNew from "./commit-new";
import { WishlistProductCommitmentsWithUser } from "~/types/wishlist";
import { WishlistProduct } from "~/types/wishlist";
import { InfoIcon, LockIcon } from "lucide-react";
import { Tooltip } from "~/components/ui/tooltip";
import { Session } from "next-auth";
import { useMemo } from "react";

type PurchaseProps = {
  url: string | null;
  username?: string | null;
  product: WishlistProduct;
  productCommitments?: WishlistProductCommitmentsWithUser[];
  isWishlistSecret: boolean;
  session: Session;
};

export default function PurchaseProduct({
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

  const Content = useMemo(() => {
    if (productCommitments?.length) {
      return (
        <>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-medium">
              This item has been purchased!
            </h2>
            <p className="max-w-[300px] text-pretty leading-tight">
              {productCommitments[0]?.user.name} has committed to this item.
            </p>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="absolute right-4 top-5">
          <Tooltip
            text={
              isWishlistSecret
                ? "This wishlist is secret, the owner will not see your commitment."
                : "The wishlist owner will be able to see your commitment."
            }
          >
            {isWishlistSecret ? <LockIcon size={20} /> : <InfoIcon size={20} />}
          </Tooltip>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-medium">Commit to this item</h2>
          <p className="max-w-[300px] text-pretty leading-tight">
            Selecting this will let other people on this wishlist know you are
            providing this item.
          </p>
        </div>
        <CommitNew
          product={product}
          productCommitments={productCommitments}
          hasUserCommitted={hasUserCommitted}
        />
      </>
    );
  }, [productCommitments, hasUserCommitted]);
  return (
    <div className="relative flex w-full flex-col justify-between gap-2 rounded-lg border-2 border-black p-4">
      {/* <div className="absolute right-4 top-4">
        <div className="flex text-xl ">
          <span className="-translate-x-0.5 -translate-y-1 font-medium">
            {productCommitments?.length || 0}
          </span>{" "}
          /{" "}
          <span className="translate-x-0.5 translate-y-1 font-medium">
            {product.quantity}
          </span>
        </div>
      </div> */}
      {Content}
    </div>
  );
}
