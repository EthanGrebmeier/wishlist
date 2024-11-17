"use client";

import {
  WishlistProduct,
  WishlistProductCommitmentsWithUser,
} from "~/types/wishlist";
import { Checkbox } from "~/components/ui/checkbox";
import { useAction } from "next-safe-action/hooks";
import { commitToProduct, uncommitToProduct } from "~/server/actions/product";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";

type CommitProps = {
  product: WishlistProduct;
  productCommitments?: WishlistProductCommitmentsWithUser[];
  hasUserCommitted: boolean;
};

export default function CommitNew({ product, hasUserCommitted }: CommitProps) {
  const [internalHasUserCommitted, setInternalHasUserCommitted] =
    useState(hasUserCommitted);

  const router = useRouter();

  const { execute: executeCommit, status: commitStatus } = useAction(
    commitToProduct,
    {
      onSuccess: () => {
        setInternalHasUserCommitted(true);
      },
    },
  );

  const { execute: executeUncommit, status: uncommitStatus } = useAction(
    uncommitToProduct,
    {
      onSuccess: () => {
        setInternalHasUserCommitted(false);
      },
    },
  );

  return (
    <>
      <div className="flex items-center gap-2 text-sm">
        <Checkbox
          id="commit-checkbox"
          checked={internalHasUserCommitted}
          onCheckedChange={(checked) => {
            if (checked) {
              executeCommit({ productId: product.id });
            } else {
              executeUncommit({ productId: product.id });
            }
          }}
        />
        <label htmlFor="commit-checkbox">
          I have purchased or plan to purchase this item
        </label>
      </div>
      <AnimatePresence>
        {(commitStatus === "executing" || uncommitStatus === "executing") && (
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2Icon className="size-6 animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
