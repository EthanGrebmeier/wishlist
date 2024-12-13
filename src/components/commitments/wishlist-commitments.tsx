"use client";

import Link from "next/link";
import { cn, getBackgroundColor } from "~/lib/utils";
import type { CommitmentWithProduct } from "~/types/commitments";
import DueDate from "../wishlist/due-date";
import Product from "../wishlist/wishlist/product-list/product";
import { useState, forwardRef } from "react";
import { ChevronDownIcon } from "lucide-react";
import useMeasure from "react-use-measure";
import { motion } from "framer-motion";

type WishlistCommitmentsProps = {
  commitments: CommitmentWithProduct[];
  wishlistId: string;
  index: number;
};

export const WishlistCommitments = forwardRef<
  HTMLDivElement,
  WishlistCommitmentsProps
>(({ index, commitments, wishlistId }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [measureRef, { height: itemsHeight }] = useMeasure();
  const wishlist = commitments[0]?.wishlist;
  if (!wishlist) {
    return null;
  }
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: -10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -10,
      }}
      transition={{ duration: 0.2, ease: "easeOut", delay: index * 0.05 }}
      layoutId={wishlistId}
      className="flex flex-col gap-4"
    >
      <motion.div
        whileHover={{
          y: -2,
        }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex w-full cursor-pointer  justify-between gap-2 rounded-md border-2 border-black bg-background p-2 text-left sm:p-4"
        aria-expanded={isOpen}
        aria-controls="commitments-content"
      >
        <div className="flex flex-col gap-2">
          <Link
            className="underline"
            href={`/wishlist/${wishlistId}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "h-4 w-4 shrink-0 rounded-full border border-black",
                  getBackgroundColor(wishlist.color ?? "white"),
                )}
              />
              <h2 className="line-clamp-1 overflow-ellipsis font-serif text-xl sm:text-2xl">
                {wishlist.name}
              </h2>
            </div>
          </Link>
          <span className="text-sm ">
            {commitments.length} Commitment
            {commitments.length > 1 ? "s" : ""}
          </span>
        </div>
        {wishlist.dueDate && (
          <DueDate date={wishlist.dueDate} color={wishlist.color} />
        )}
        <div className="absolute bottom-2 right-2 sm:right-4">
          <ChevronDownIcon
            size={24}
            className={cn(
              "transition-transform duration-200",
              isOpen ? "rotate-180" : "",
            )}
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? itemsHeight : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="overflow-hidden"
        id="commitments-content"
      >
        <ul
          ref={measureRef}
          className={cn(
            "grid gap-4 py-2 transition-all duration-200 xs:grid-cols-2 md:grid-cols-4",
          )}
        >
          {commitments.map((commitment) => (
            <Product
              key={commitment.id}
              wishlistColor={commitment.wishlist.color}
              product={commitment.product}
              canUserEdit={false}
              hideStatus={true}
              animationDelay={0}
            />
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
});

WishlistCommitments.displayName = "WishlistCommitments";
