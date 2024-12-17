"use client";

import type {
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
import { Label } from "~/components/ui/label";

type CommitProps = {
  product: WishlistProduct;
  productCommitments?: WishlistProductCommitmentsWithUser[];

  hasUserCommitted: boolean;
};

export default function CommitNew({
  product,
  hasUserCommitted,
  productCommitments,
}: CommitProps) {
  const [internalHasUserCommitted, setInternalHasUserCommitted] =
    useState(hasUserCommitted);
  const router = useRouter();

  const { execute: executeCommit, status: commitStatus } = useAction(
    commitToProduct,
    {
      onSuccess: () => {
        router.refresh();
        setInternalHasUserCommitted(true);
      },
    },
  );

  const { execute: executeUncommit, status: uncommitStatus } = useAction(
    uncommitToProduct,
    {
      onSuccess: () => {
        router.refresh();
        setInternalHasUserCommitted(false);
      },
    },
  );

  const isFullyPurchased =
    product.quantity &&
    parseInt(product.quantity) <= (productCommitments?.length ?? 0);

  if (isFullyPurchased && !hasUserCommitted) {
    return null;
  }

  return (
    <div className="flex h-9 items-center gap-2 text-sm">
      <AnimatePresence initial={false} mode="wait">
        {commitStatus === "executing" || uncommitStatus === "executing" ? (
          <motion.div
            className="flex h-fit w-fit items-center justify-center"
            key="loader"
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            transition={{ duration: 0.2, type: "spring", bounce: 0 }}
          >
            <Loader2Icon className="h-4 w-4 animate-spin" />
          </motion.div>
        ) : (
          <motion.div
            className="flex h-fit w-fit items-center justify-center"
            key="checkbox"
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            transition={{ duration: 0.2, type: "spring", bounce: 0 }}
          >
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
          </motion.div>
        )}
      </AnimatePresence>
      <Label htmlFor="commit-checkbox">
        I have purchased or plan to provide this product
      </Label>
    </div>
  );
}
