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
import ProductImage from "./product-image";
import ButtonLink from "~/components/ui/button-link";
import { ExternalLinkIcon } from "lucide-react";

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
  return (
    <div className="grid w-full max-w-screen-sm gap-4 overflow-y-auto overflow-x-hidden  px-4 lg:py-4 lg:pt-10 xl:max-w-none xl:pr-8 xl:pt-4 ">
      <div className="flex flex-col gap-2">
        <div className="grid gap-8 xl:grid-cols-[1fr_440px]">
          <div className="hidden h-full w-full xl:flex">
            <ProductImage product={product} />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="col-span-full flex  items-center gap-1 text-base font-medium leading-none [&_p]:mt-[2px]">
                <Link className="hover:underline" href="/wishlist">
                  <p>My Wishlists</p>
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
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Priority priorityLevel={product.priority} />
              </motion.div>
            </div>

            <div className="col-span-full flex items-center justify-between">
              <div>
                <h1 className="max-w-[380px] font-serif text-3xl leading-8">
                  {product.name}
                </h1>
                {product.brand && (
                  <p className="text-pretty font-serif text-xl">
                    {product.brand}
                  </p>
                )}
                {product.price && (
                  <p className="font-serif text-xl">${product.price}</p>
                )}
              </div>
            </div>
            <div className="flex h-full w-full xl:hidden">
              <ProductImage product={product} />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                {product.description && (
                  <>
                    <p className="text-lg font-medium">About</p>
                    <p className="text-lg leading-tight xl:max-w-[480px]">
                      {product.description}
                    </p>
                  </>
                )}
                {product.url && (
                  <ButtonLink
                    icon={<ExternalLinkIcon size={15} />}
                    href={product.url}
                    target="_blank"
                    className="mt-2 w-fit gap-0"
                  >
                    <span>
                      View product
                      <span className="hidden sm:inline ">
                        {" "}
                        on {product.url.split("//")[1]?.split("/")[0]}
                      </span>
                    </span>
                  </ButtonLink>
                )}
              </div>
              <div className="mt-4 flex flex-col gap-4 rounded-md border-2 border-black p-2 pb-4">
                <PurchaseProduct
                  session={session}
                  isWishlistSecret={wishlist.isSecret}
                  product={product}
                  productCommitments={productCommitments}
                  url={product.url}
                />

                {canUserEdit && (
                  <>
                    <div className="h-px w-full bg-black" />
                    <ConfirmReceipt
                      wishlistShares={sharedUsers}
                      session={session}
                      wishlist={wishlist}
                      product={product}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
