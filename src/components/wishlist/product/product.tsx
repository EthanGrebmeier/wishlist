"use client";

import { cn, getBackgroundColor } from "~/lib/utils";
import {
  WishlistProduct,
  WishlistProductCommitmentsWithUser,
  WishlistWithProducts,
} from "~/types/wishlist";
import { WishlistSharesWithUser } from "~/types/wishlist";
import Priority from "../wishlist/product-list/product/priority";
import Link from "next/link";
import { motion } from "framer-motion";
import ConfirmReceipt from "./confirm";
import { Session } from "next-auth";
import PurchaseProduct from "./purchase";
import ProductImage from "./product-image";
import ButtonLink from "~/components/ui/button-link";
import {
  ChevronsRight,
  EditIcon,
  ExternalLinkIcon,
  PencilIcon,
} from "lucide-react";
import { useSetAtom } from "jotai";
import { isProductFormOpenAtom, productToEditAtom } from "~/store/product-form";
import ProductCard from "../wishlist/product-list/product";
import Breadcrumbs from "./breadcrumbs";

type ProductPageProps = {
  wishlist: WishlistWithProducts;
  product: WishlistProduct;
  productCommitments?: WishlistProductCommitmentsWithUser[];
  sharedUsers: WishlistSharesWithUser[];
  session: Session;
  canUserEdit: boolean;
};

export default function Product({
  wishlist,
  product,
  productCommitments,
  sharedUsers,
  session,
  canUserEdit,
}: ProductPageProps) {
  const setProductToEdit = useSetAtom(productToEditAtom);
  const setIsProductFormOpen = useSetAtom(isProductFormOpenAtom);

  return (
    <div className="flex w-full max-w-screen-sm flex-col gap-8  px-4 lg:py-4 lg:pt-10 xl:max-w-none xl:pr-8 xl:pt-4 ">
      <div className="flex flex-col gap-2">
        <div className="grid gap-4 xl:grid-cols-[1fr_440px]">
          <div className="hidden h-full w-full xl:flex">
            <ProductImage product={product} />
          </div>
          <div className="flex flex-col gap-4 lg:rounded-lg lg:border-2 lg:border-black lg:p-4 ">
            <div className="flex flex-1 flex-col gap-4">
              <div className="flex flex-col items-start justify-normal gap-2 xs:flex-row xs:items-center xs:justify-between ">
                <Breadcrumbs wishlist={wishlist} session={session} />
                {product.priority !== "normal" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block font-sans"
                  >
                    <Priority
                      showText={true}
                      priorityLevel={product.priority}
                    />
                  </motion.div>
                )}
              </div>

              <div className="col-span-full flex items-center justify-between">
                <div>
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
              <div className="flex h-full w-full xl:hidden">
                <ProductImage product={product} />
              </div>

              {product.description && (
                <div className="flex  flex-col">
                  <p className="w-full  text-lg font-medium">About</p>
                  <p className="flex-1  text-lg leading-tight xl:max-w-[480px]">
                    {product.description}
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setProductToEdit(product);
                setIsProductFormOpen(true);
              }}
              className="flex items-center gap-1 self-end text-sm font-medium underline"
            >
              Edit Product
              <PencilIcon size={15} />
            </button>
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {!canUserEdit && !wishlist.isSecret && (
          <PurchaseProduct
            session={session}
            isWishlistSecret={wishlist.isSecret}
            product={product}
            productCommitments={productCommitments}
            url={product.url}
          />
        )}
        {product.url && (
          <div className="relative flex h-full w-full flex-col justify-between gap-2 rounded-lg border-2 border-black p-4">
            <div className="absolute right-4 top-4">
              <ExternalLinkIcon size={20} />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-medium">Interested?</h2>
              <p>View product on {product.url.split("//")[1]?.split("/")[0]}</p>
            </div>
            <ButtonLink
              href={product.url}
              target="_blank"
              className="mt-2 w-fit gap-0"
            >
              Purchase product
            </ButtonLink>
          </div>
        )}
        {canUserEdit && (
          <>
            <ConfirmReceipt
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
