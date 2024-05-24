"use client";

import type { WishlistProductWithCommitmentsWithUser } from "~/types/wishlist";
import ProductMenu from "./menu";
import MenuProvider from "./menu/menuProvider";
import ProductImage from "./image";
import Link from "~/components/ui/link";
import { getProductSlug } from "~/lib/wishlist/product/getProductSlug";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Priority from "./priority";
import { cn, getBackgroundColor } from "~/lib/utils";
import type { z } from "zod";
import type { colorSchema } from "~/schema/wishlist/wishlist";
import { Gift } from "lucide-react";
import PlaceholderImage from "~/components/wishlist/product/placeholder-image";

type ProductProps = {
  product: WishlistProductWithCommitmentsWithUser;
  canUserEdit: boolean;
  wishlistColor: z.infer<typeof colorSchema>;
  hideStatus: boolean;
};

const Product = ({
  product,
  canUserEdit,
  wishlistColor,
  hideStatus,
}: ProductProps) => {
  const shouldNotTranslate = useReducedMotion();

  return (
    <AnimatePresence>
      <motion.li
        whileHover={{
          translateY: shouldNotTranslate ? 0 : -4,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="group relative isolate "
      >
        <Link href={getProductSlug(product)}>
          <div className="w-full overflow-hidden rounded-md border-2 border-black">
            <div className="relative aspect-square w-full  bg-background  ">
              {!hideStatus &&
                (!!product.commitments.length ? (
                  <div className="absolute left-2 top-2 z-10 rounded-md border-2 border-black bg-green-300 px-1 py-[2px] font-medium ">
                    <p className="-mb-[1px] text-sm font-medium text-black">
                      {" "}
                      Purchased{" "}
                    </p>
                  </div>
                ) : (
                  <Priority
                    className="absolute left-2 top-2"
                    priorityLevel={product.priority}
                  />
                ))}
              {product.imageUrl ? (
                <ProductImage imageUrl={product.imageUrl} />
              ) : (
                <PlaceholderImage />
              )}
            </div>

            <div
              className={cn(
                "flex w-full items-center justify-between gap-4 border-t-2 border-black px-2 py-2",
                getBackgroundColor(wishlistColor),
              )}
            >
              <p className="-mb-[2px] line-clamp-1 overflow-ellipsis rounded-b-md font-serif text-2xl group-hover:underline">
                {" "}
                {product.name}{" "}
              </p>
              {product.price && (
                <p className="text-md font-medium"> ${product.price} </p>
              )}
            </div>
          </div>
        </Link>
        {canUserEdit && (
          <MenuProvider product={product} wishlistId={product.wishlistId}>
            <div className="absolute right-2 top-2 z-10">
              <ProductMenu />
            </div>
          </MenuProvider>
        )}
      </motion.li>
    </AnimatePresence>
  );
};

export default Product;
