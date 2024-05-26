import { ArrowLeft, ExternalLink, Pencil } from "lucide-react";
import { getWishlistSlug } from "~/lib/wishlist/getWishlistSlug";
import type { Wishlist, WishlistProduct } from "~/types/wishlist";
import Commit from "./commit";
import {
  getProductCommitments,
  getProductReceipts,
} from "~/server/actions/product";
import ButtonLink from "~/components/ui/button-link";
import { getServerAuthSession } from "~/server/auth";
import EditProduct from "../wishlist/product-list/product/menu/edit";
import { Button } from "~/components/ui/button";
import ConfirmReceipt from "./confirm/index";
import { Suspense } from "react";
import ConfirmedReceipt from "./confirm/confirmed-receipt";
import Priority from "../wishlist/product-list/product/priority";
import PlaceholderImage from "./placeholder-image";
import { cn } from "~/lib/utils";
import { verifyUserIsWishlistEditor } from "~/lib/wishlist/verifyUserIsWishlistEditor";
import { getUserShareType } from "~/lib/wishlist/getUserShareType";
import { getSharedUsers } from "~/lib/wishlist/getSharedUsers";

type ProductProps = {
  product: WishlistProduct;
  wishlist: Wishlist;
  isSecret: boolean;
};

const Product = async ({ product, wishlist, isSecret }: ProductProps) => {
  const [productCommitments, productReceipts, wishlistShares, session] =
    await Promise.all([
      getProductCommitments({
        productId: product.id,
      }),
      getProductReceipts({
        productId: product.id,
      }),
      getSharedUsers({
        wishlistId: wishlist.id,
      }),
      getServerAuthSession(),
    ]);

  if (!session) {
    return null;
  }

  const hasUserCommitted = Boolean(
    productCommitments.data?.find(
      (commitment) => commitment.createdById === session.user.id,
    ),
  );

  const userStatus = getUserShareType({
    wishlist,
    wishlistShares,
    session,
  });
  const canUserEdit = verifyUserIsWishlistEditor(userStatus);

  return (
    <div className=" mx-auto flex w-full max-w-[600px] grid-cols-1 flex-col gap-4 px-2 pb-4 md:mt-4 md:max-w-[800px] md:px-6 lg:mx-6 lg:mt-8 lg:grid  lg:w-auto lg:max-w-none lg:flex-1 lg:grid-rows-[1fr] lg:gap-14 lg:px-0">
      <section className="flex h-full w-full flex-col gap-x-4 gap-y-2 overflow-hidden transition-all lg:grid lg:grid-cols-[1fr_min-content] lg:gap-4">
        <div className="flex w-full items-start justify-center gap-4 align-top lg:mx-0">
          <div className="relative flex items-center justify-center overflow-hidden rounded-md border-2 border-black  bg-white transition-all md:max-h-[580px] lg:max-h-[calc(100svh-48px)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {product.imageUrl ? (
              <img
                className=" max-h-[calc(100svh-44px)] w-[600px]"
                alt={product.name}
                /* eslint-disable-next-line  */
                src={product.imageUrl}
              />
            ) : (
              <PlaceholderImage className="relative mx-auto flex h-[400px] w-screen items-center justify-center overflow-hidden md:max-w-[800px] lg:aspect-square lg:w-[600px] " />
            )}
            <ButtonLink
              variant="secondary"
              size="lg"
              href={
                productReceipts.data ? "/my-gifts" : getWishlistSlug(wishlist)
              }
              icon={<ArrowLeft size={20} />}
              className="absolute left-2 top-2 h-10 w-10 rounded-full p-0"
            >
              <span className="sr-only"> Back to {wishlist.name} </span>
            </ButtonLink>
            <div className="absolute right-2 top-2 flex gap-4">
              {canUserEdit && (
                <EditProduct
                  product={product}
                  wishlistId={wishlist.id}
                  trigger={
                    <Button
                      className="h-10 w-10 rounded-full p-0"
                      icon={<Pencil size={20} />}
                    />
                  }
                />
              )}
              {product.url && (
                <ButtonLink
                  variant="secondary"
                  size="lg"
                  target="_blank"
                  href={product.url}
                  icon={<ExternalLink size={20} />}
                  className="h-10 w-10 rounded-full p-0"
                ></ButtonLink>
              )}
            </div>
          </div>
        </div>
        <div className="mx-auto mb-4 flex max-h-full w-full flex-col justify-between gap-2 overflow-y-auto lg:h-full  lg:min-h-[calc(100svh-64px)] lg:w-[320px] lg:max-w-none lg:gap-8">
          <div className="rounded-md border-2 border-black ">
            <Priority className="ml-4 mt-4" priorityLevel={product.priority} />
            <div className="relative flex w-full flex-col gap-2 p-4 pb-4">
              <div className="flex max-w-[80%] flex-col gap-2">
                <h1 className="translate-y-[2px] overflow-hidden text-wrap break-words font-serif text-3xl font-medium md:text-4xl">
                  {product.name}
                </h1>
                {product.brand && (
                  <p className="font-sans text-xl font-medium">
                    {" "}
                    {product.brand}{" "}
                  </p>
                )}
                {product.price && (
                  <p className="text-3xl"> ${product.price} </p>
                )}
              </div>
              {product.quantity && (
                <p className="absolute right-4 top-4 text-3xl">
                  x{product.quantity}{" "}
                </p>
              )}
            </div>
            {product.description && (
              <div className=" mt-4  border-t-2 border-t-black pb-2">
                <h2 className="px-4 py-2 font-sans text-xl font-medium">
                  Description
                </h2>
                <p className="max-h-[300px] overflow-y-auto px-4 text-lg">
                  {product.description}
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2  md:flex-row lg:flex-col">
            {!(isSecret && canUserEdit) && !productReceipts.data && (
              <div
                className={cn(
                  "flex w-full flex-col justify-center gap-6 rounded-md border-2 border-black p-4 md:w-1/2 lg:-mt-4 lg:w-full",
                  !canUserEdit ? "md:w-full" : "md:w-1/2",
                )}
              >
                <div className="flex flex-col gap-2">
                  {/** Only hide commitments for the owner of the wishlist */}
                  <Commit
                    hasUserCommitted={hasUserCommitted}
                    productCommitments={productCommitments.data}
                    product={product}
                  />
                </div>
              </div>
            )}
            {canUserEdit &&
              (!productReceipts.data ? (
                <Suspense
                  fallback={
                    <div className="skeleton h-24 w-full md:w-1/2 lg:w-full"></div>
                  }
                >
                  <ConfirmReceipt
                    className={
                      !(isSecret && canUserEdit) && !productReceipts.data
                        ? "md:w-1/2"
                        : "md:w-full"
                    }
                    product={product}
                    wishlist={wishlist}
                  />
                </Suspense>
              ) : (
                <ConfirmedReceipt />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
