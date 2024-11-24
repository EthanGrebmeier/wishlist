"use client";

import type { WishlistProductWithCommitmentsWithUser } from "~/types/wishlist";
import ProductMenu from "./menu";
import MenuProvider from "./menu/menuProvider";
import ProductImage from "./image";
import { getProductSlug } from "~/lib/wishlist/product/getProductSlug";
import Priority from "./priority";
import { getBackgroundColor } from "~/lib/utils";
import type { z } from "zod";
import type { colorSchema } from "~/schema/wishlist/wishlist";
import PlaceholderImage from "~/components/wishlist/product/placeholder-image";
import Card from "~/components/ui/card";
import { useSetAtom } from "jotai";
import { isProductViewOpenAtom, productToViewAtom } from "~/store/product-view";
import { CheckIcon } from "lucide-react";

type ProductProps = {
  product: WishlistProductWithCommitmentsWithUser;
  canUserEdit: boolean;
  wishlistColor: z.infer<typeof colorSchema>;
  hideStatus: boolean;
  animationDelay: number;
};

const Product = ({
  product,
  canUserEdit,
  wishlistColor,
  hideStatus,
  animationDelay = 0,
}: ProductProps) => {
  const setProductToView = useSetAtom(productToViewAtom);
  const setIsProductViewOpen = useSetAtom(isProductViewOpenAtom);
  const handleClick = () => {
    setProductToView(product);
    setIsProductViewOpen(true);
  };
  return (
    <Card
      // onClick={handleClick}
      href={`/product/${product.id}`}
      animationDelay={animationDelay}
      backgroundColor={getBackgroundColor(wishlistColor)}
      topContent={
        <>
          <div className="relative aspect-square w-full  bg-background  ">
            <div className="absolute left-2 right-2 top-2 z-[5] flex gap-1">
              {product.price && (
                <div className=" w-fit rounded-md border-2 border-black bg-white px-1 py-0.5">
                  <p className="text-md text-base font-medium">
                    ${product.price}
                  </p>
                </div>
              )}
              {!hideStatus &&
                (!!product.commitments?.length ? (
                  <div className="rounded-md border-2 border-black bg-green-300 px-1 py-[2px] font-medium ">
                    <CheckIcon size={24} />
                  </div>
                ) : (
                  <Priority priorityLevel={product.priority} />
                ))}
            </div>
            {product.imageUrl ? (
              <ProductImage imageUrl={product.imageUrl} />
            ) : (
              <PlaceholderImage />
            )}
          </div>
        </>
      }
      bottomContent={
        <p className="-mb-[2px] line-clamp-1 overflow-ellipsis rounded-b-md pr-4 font-serif text-base group-hover:underline xs:text-xl sm:text-2xl">
          {" "}
          {product.name}{" "}
        </p>
      }
    >
      {canUserEdit && (
        <MenuProvider product={product} wishlistId={product.wishlistId}>
          <div className="absolute right-2 top-2 z-10">
            <ProductMenu />
          </div>
        </MenuProvider>
      )}
    </Card>
  );
};

export default Product;
