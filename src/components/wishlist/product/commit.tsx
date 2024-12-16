"use client";

import CommitNew from "./commit-input";
import type { WishlistProductCommitmentsWithUser } from "~/types/wishlist";
import type { WishlistProduct } from "~/types/wishlist";
import { BookUserIcon, InfoIcon, LockIcon, TelescopeIcon } from "lucide-react";
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

          await animate(
            scope.current,
            {
              scale: 1.05,
              backgroundColor: "#E7DBFA",
            },
            {
              repeatType: "reverse",
              repeat: 1,
              duration: 0.2,
              bounce: 0.3,
              delay: 0.2,
            },
          );
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
          <div>
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
        <div className="flex flex-col ">
          <div className="absolute right-4 top-4">
            <ColoredIconWrapper className="bg-blue-300">
              <BookUserIcon size={20} />
            </ColoredIconWrapper>
          </div>
          <div>
            <h2 className="text-balance text-2xl font-medium sm:text-wrap">
              Commit to this item
            </h2>
            <p className="max-w-[300px] text-pretty leading-tight">
              Selecting this will let other people on this wishlist know you are
              providing this item
              {isWishlistSecret ? ", but not the wishlist owner." : "."}
            </p>
          </div>
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
      className="relative flex w-full flex-col justify-between gap-4 rounded-lg border-2 border-black  p-4"
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
