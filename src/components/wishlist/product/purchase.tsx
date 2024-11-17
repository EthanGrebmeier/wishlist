"use client";

import Link from "next/link";
import CommitNew from "./commit-new";
import { WishlistProductCommitmentsWithUser } from "~/types/wishlist";
import { WishlistProduct } from "~/types/wishlist";
import ButtonLink from "~/components/ui/button-link";

type PurchaseProps = {
  url: string;
  username?: string | null;
  product: WishlistProduct;
  productCommitments?: WishlistProductCommitmentsWithUser[];
  hasUserCommitted: boolean;
};

export default function PurchaseProduct({
  url,
  username,
  product,
  productCommitments,
  hasUserCommitted,
}: PurchaseProps) {
  return (
    <div className="relative flex flex-col gap-2 rounded-md border-2 border-black p-4">
      <p className="text-lg font-medium">
        Wanting to purchase this item{username && ` for ${username}`}?
      </p>
      <CommitNew
        product={product}
        productCommitments={productCommitments}
        hasUserCommitted={hasUserCommitted}
      />
      <ButtonLink href={url} target="_blank" className=" mt-4 underline">
        Purchase Product
      </ButtonLink>
    </div>
  );
}
