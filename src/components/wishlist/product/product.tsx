"use client";

import type {
  WishlistProduct,
  WishlistProductCommitmentsWithUser,
  WishlistProductReceipts,
  WishlistWithProducts,
} from "~/types/wishlist";
import type { WishlistSharesWithUser } from "~/types/wishlist";
import Priority from "../wishlist/product-list/product/priority";
import Link from "next/link";
import { motion } from "framer-motion";
import ConfirmReceipt from "./confirm";
import type { Session } from "next-auth";
import CommitProduct from "./commit";
import ProductImage from "./product-image";
import ButtonLink from "~/components/ui/button-link";
import { ChevronsRight, PencilIcon, ShoppingBasketIcon } from "lucide-react";
import { useSetAtom } from "jotai";
import {
  isProductCopyOpenAtom,
  isProductFormOpenAtom,
  productToEditAtom,
  viewedProductAtom,
} from "~/store/product-settings";
import { canUserEditAtom, viewedWishlistAtom } from "~/store/wishlist-settings";
import ProductCard from "../wishlist/product-list/product";
import { useEffect } from "react";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";
import { Button } from "~/components/ui/button";
import { CopyProductTrigger } from "./copy-product-trigger";

type ProductPageProps = {
  wishlist: WishlistWithProducts;
  product: WishlistProduct;
  productCommitments?: WishlistProductCommitmentsWithUser[];
  sharedUsers: WishlistSharesWithUser[];
  session: Session;
  canUserEdit: boolean;
  productReceipts?: WishlistProductReceipts[];
};

export default function Product({
  wishlist,
  product,
  productCommitments,
  sharedUsers,
  session,
  canUserEdit,
  productReceipts,
}: ProductPageProps) {
  const setViewedProduct = useSetAtom(viewedProductAtom);
  const setViewedWishlist = useSetAtom(viewedWishlistAtom);
  const setCanUserEdit = useSetAtom(canUserEditAtom);

  useEffect(() => {
    setCanUserEdit(canUserEdit);
  }, [canUserEdit, setCanUserEdit]);

  useEffect(() => {
    setViewedProduct(product);
    setViewedWishlist(wishlist);
    return () => {
      setViewedProduct(null);
    };
  }, [product, setViewedProduct, wishlist, setViewedWishlist]);

  return (
    <div className="isolate flex w-full flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="grid gap-4 md:grid-cols-[1fr_320px] xl:grid-cols-[1fr_440px]">
          <div className="hidden h-full max-h-[80svh] w-full md:flex">
            <ProductImage product={product} />
          </div>
          <div className="flex flex-col gap-4  lg:p-4">
            <div className="flex flex-1 flex-col gap-4">
              <div className="flex flex-col gap-2 ">
                {product.priority !== "normal" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="hidden font-sans md:inline-block "
                  >
                    <Priority
                      showText={true}
                      priorityLevel={product.priority}
                    />
                  </motion.div>
                )}

                <div className="col-span-full flex items-center justify-between">
                  <div className="hidden md:block">
                    <h1 className="max-w-[380px] font-serif text-3xl leading-8">
                      {product.name}{" "}
                    </h1>
                    {product.brand && (
                      <p className="text-pretty font-serif text-xl">
                        {product.brand}
                      </p>
                    )}
                    {product.price && (
                      <p className="font-serif text-2xl">${product.price}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex h-full w-full md:hidden">
                <ProductImage product={product} />
              </div>

              {product.description && (
                <div className="flex w-full flex-col">
                  <p className="w-full  text-lg font-medium">About</p>
                  <p className="flex-1 break-words text-lg leading-tight md:max-w-[320px] lg:max-w-[480px]">
                    {product.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {((!wishlist.isSecret && canUserEdit) || !canUserEdit) && (
          <CommitProduct
            session={session}
            isWishlistSecret={wishlist.isSecret}
            product={product}
            productCommitments={productCommitments}
            url={product.url}
          />
        )}
        {product.url && (
          <div className="relative flex h-full w-full flex-col justify-between gap-2 rounded-lg border-2 border-black bg-background p-4">
            <div className="absolute right-4 top-4">
              <ColoredIconWrapper className="bg-orange-300">
                <ShoppingBasketIcon size={20} />
              </ColoredIconWrapper>
            </div>
            <div>
              <h2 className="text-2xl font-medium ">Interested?</h2>
              <p>View item on {product.url.split("//")[1]?.split("/")[0]}</p>
            </div>
            <ButtonLink
              href={product.url}
              target="_blank"
              className="mt-2 w-fit gap-0"
            >
              Purchase item
            </ButtonLink>
          </div>
        )}
        <CopyProductTrigger product={product} />
        {canUserEdit && (
          <>
            <ConfirmReceipt
              productReceipts={productReceipts}
              wishlistShares={sharedUsers}
              session={session}
              wishlist={wishlist}
              product={product}
            />
          </>
        )}
      </div>
      {wishlist.products.length > 1 && (
        <div className="flex w-full flex-col gap-4 overflow-visible">
          <div className="flex justify-between gap-2">
            <div>
              <h2 className="text-xl font-medium sm:text-3xl">
                Other items in this wishlist{" "}
              </h2>
              <span>({wishlist.products.length} items) </span>
            </div>
            <div className="shrink-0 text-end">
              <Link
                className="group flex items-center gap-2 text-xl font-medium underline"
                href={`/wishlist/${wishlist.id}`}
              >
                View all{" "}
                <ChevronsRight
                  className="transition-transform group-hover:translate-x-1"
                  size={25}
                />
              </Link>
            </div>
          </div>
          <ul className="grid gap-4 xs:grid-cols-2 sm:grid-cols-3">
            {wishlist.products
              .filter((p) => p.id !== product.id)
              .slice(0, 3)
              .map((product, index) => (
                <ProductCard
                  product={product}
                  canUserEdit={canUserEdit}
                  wishlistColor={wishlist.color}
                  hideStatus={true}
                  key={product.id}
                  animationDelay={0.1 * index}
                />
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
