"use client";

import CommitNew from "./commit-input";
import type { WishlistProductCommitmentsWithUser } from "~/types/wishlist";
import type { WishlistProduct } from "~/types/wishlist";
import { BookUserIcon, InfoIcon, LockIcon } from "lucide-react";
import { Tooltip } from "~/components/ui/tooltip";
import type { Session } from "next-auth";
import { useEffect, useMemo } from "react";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";
import { useContextBar } from "~/context/context-bar-context";
import { motion, useAnimate } from "framer-motion";

type PurchaseProps = {
  url: string | null;
  username?: string | null;
  product: WishlistProduct;
  productCommitments?: WishlistProductCommitmentsWithUser[];
  isWishlistSecret: boolean;
  session: Session;
};

export default function CommitProduct({
  product,
  productCommitments,
  isWishlistSecret,
  session,
}: PurchaseProps) {
  const { setButtons } = useContextBar();
  const hasUserCommitted = Boolean(
    productCommitments?.find(
      (commitment) => commitment.createdById === session.user.id,
    ),
  );
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (productCommitments?.length && !hasUserCommitted) return;

    setButtons([
      {
        shouldShow: true,
        backgroundColor: "#E7DBFA",
        icon: <BookUserIcon size={25} />,
        text: "Commit",
        onClick: async () => {
          const commitProductContainer = document.getElementById(
            "commit-product-container",
          );

          commitProductContainer?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          await animate(scope.current, {
            scale: 1.05,
            backgroundColor: "#E7DBFA",
            transition: { duration: 0.2, type: "spring", delay: 0.35 },
          });
          await animate(scope.current, {
            scale: 1,
            backgroundColor: "#FFFBF5",
            transition: { duration: 0.2, type: "spring" },
          });
        },
      },
    ]);

    return () => {
      setButtons([]);
    };
  }, [setButtons, productCommitments, hasUserCommitted, scope, animate]);

  const Content = useMemo(() => {
    if (productCommitments?.length && !hasUserCommitted) {
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
        <div className="flex flex-col gap-2">
          <div className="absolute right-4 top-4">
            <ColoredIconWrapper className="bg-blue-200">
              <BookUserIcon size={20} />
            </ColoredIconWrapper>
          </div>
          <div>
            <h2 className="text-balance pr-6 text-2xl font-medium sm:text-wrap">
              Commit to this item
              <Tooltip
                text={
                  isWishlistSecret
                    ? "This wishlist is secret, the owner will not see your commitment."
                    : "The wishlist owner will be able to see your commitment."
                }
              >
                {isWishlistSecret ? (
                  <LockIcon className="ml-1 inline " size={15} />
                ) : (
                  <InfoIcon className="ml-1 inline" size={15} />
                )}
              </Tooltip>
            </h2>
          </div>
          <p className="max-w-[300px] text-pretty leading-tight">
            Selecting this will let other people on this wishlist know you are
            providing this item
            {isWishlistSecret ? ", but not the wishlist owner." : "."}
          </p>
        </div>
        <CommitNew
          product={product}
          productCommitments={productCommitments}
          hasUserCommitted={hasUserCommitted}
        />
      </>
    );
  }, [productCommitments, hasUserCommitted, product, isWishlistSecret]);
  return (
    <div
      ref={scope}
      id="commit-product-container"
      className="relative flex w-full flex-col justify-between gap-2 rounded-lg border-2 border-black  p-4"
    >
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
