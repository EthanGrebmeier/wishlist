"use client";

import { cn, getBackgroundColor } from "~/lib/utils";
import {
  Wishlist,
  WishlistProduct,
  WishlistProductCommitmentsWithUser,
  WishlistWithProducts,
} from "~/types/wishlist";
import {
  WishlistProductCommitments,
  WishlistShares,
  WishlistSharesWithUser,
} from "~/types/wishlist";
import Priority from "../wishlist/product-list/product/priority";
import Image from "next/image";
import PlaceholderImage from "./placeholder-image";
import Link from "next/link";
import CommitNew from "./commit-new";
import ReceiptNew from "./receipt-new";
import { motion } from "framer-motion";
import ConfirmReceipt from "./confirm";
import { Session } from "next-auth";
import PurchaseProduct from "./purchase";
import { useState } from "react";

type ProductPageProps = {
  wishlist: WishlistWithProducts;
  product: WishlistProduct;
  productCommitments?: WishlistProductCommitmentsWithUser[];
  sharedUsers: WishlistSharesWithUser[];
  session: Session;
  canUserEdit: boolean;
};

export default function ProductNew({
  wishlist,
  product,
  productCommitments,
  sharedUsers,
  session,
  canUserEdit,
}: ProductPageProps) {
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const hasUserCommitted = Boolean(
    productCommitments?.find(
      (commitment) => commitment.createdById === session.user.id,
    ),
  );

  return (
    <div className="grid h-fit w-fit max-w-[600px] gap-4 p-4 lg:max-w-none lg:grid-cols-[1fr_380px] ">
      <div className="col-span-full flex items-center gap-1 text-base font-medium leading-none">
        <Link className="hover:underline" href="/wishlist">
          My Wishlists
        </Link>{" "}
        <p className="text-gray-400" aria-hidden="true">
          /
        </p>{" "}
        <Link
          href={`/wishlist/${wishlist.id}`}
          className="flex items-center justify-center gap-1"
        >
          <p className="hover:underline">{wishlist.name}</p>{" "}
          <div
            className={cn(
              "size-4 rounded-full border border-black",
              getBackgroundColor(wishlist.color),
            )}
          ></div>
        </Link>
      </div>

      <div className="col-span-full flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl leading-8">{product.name}</h1>
          {product.price && (
            <p className="font-serif text-xl">${product.price}</p>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Priority priorityLevel={product.priority} />
        </motion.div>
      </div>

      <div className="flex max-w-[600px] flex-col gap-4">
        <div className="relative flex w-full items-center justify-center overflow-hidden rounded-md border-2 border-black">
          <div
            className="relative hidden xl:flex"
            style={{
              width: imageDimensions?.width,
              height: imageDimensions?.height,
            }}
          >
            {product.imageUrl ? (
              <Image
                onLoad={(event) => {
                  const image = event.target as HTMLImageElement;
                  const aspectRatio = image.naturalWidth / image.naturalHeight;
                  const height = Math.min(image.naturalHeight, 600);
                  const width = height * aspectRatio;
                  setImageDimensions({
                    width,
                    height,
                  });
                }}
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 600px) 100vw, 600px"
                className="absolute inset-0 h-full w-full object-contain"
              />
            ) : (
              <PlaceholderImage />
            )}
          </div>
          <div className="flex aspect-square h-full w-full xl:hidden">
            {product.imageUrl ? (
              <Image src={product.imageUrl} alt={product.name} fill />
            ) : (
              <PlaceholderImage />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {product.url && (
            <PurchaseProduct
              product={product}
              productCommitments={productCommitments}
              hasUserCommitted={hasUserCommitted}
              url={product.url}
            />
          )}
        </div>
      </div>

      {canUserEdit && (
        <div className="flex flex-col gap-2">
          {product.description && (
            <div className="flex flex-col">
              <p className="text-lg font-medium">About</p>
              <p className="text-lg tracking-normal">{product.description}</p>
            </div>
          )}
          <ConfirmReceipt
            wishlistShares={sharedUsers}
            session={session}
            wishlist={wishlist}
            product={product}
          />
        </div>
      )}
    </div>
  );
}
