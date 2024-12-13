"use client";

import type { CommitmentWithProduct } from "~/types/commitments";
import { WishlistCommitments } from "./wishlist-commitments";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

type CommitmentsProps = {
  commitments: Record<string, CommitmentWithProduct[]>;
};

export const Commitments = ({ commitments }: CommitmentsProps) => {
  console.log(commitments);
  console.log(Object.entries(commitments));
  return (
    <motion.div className="flex flex-col gap-2 ">
      <LayoutGroup>
        <AnimatePresence mode="popLayout" initial={false}>
          {Object.entries(commitments).length ? (
            Object.entries(commitments).map(
              ([wishlistId, commitments], index) => {
                return (
                  <WishlistCommitments
                    index={index}
                    key={wishlistId}
                    wishlistId={wishlistId}
                    commitments={commitments}
                  />
                );
              },
            )
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-center text-muted-foreground">
                No commitments found
              </p>
            </div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </motion.div>
  );
};
