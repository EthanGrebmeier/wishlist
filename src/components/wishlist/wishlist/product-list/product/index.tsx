"use client";

import type { WishlistProductWithCommitmentsWithUser } from "~/types/wishlist";
import ProductMenu from "./menu";
import MenuProvider from "./menu/menuProvider";
import ProductImage from "./image";
import Link from "~/components/ui/link";
import { getProductSlug } from "~/lib/wishlist/product/getProductSlug";
import { AnimatePresence, motion } from "framer-motion";
import Priority from "./priority";
import { cn, getBackgroundColor } from "~/lib/utils";
import type { z } from "zod";
import type { colorSchema } from "~/schema/wishlist/wishlist";

type ProductProps = {
  product: WishlistProductWithCommitmentsWithUser;
  isEditor: boolean;
  wishlistColor: z.infer<typeof colorSchema>;
};

const Product = ({ product, isEditor, wishlistColor }: ProductProps) => {
  return (
    <AnimatePresence>
      <motion.li
        whileHover={{
          translateY: -4,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="group relative isolate overflow-hidden rounded-md border-2 border-black"
      >
        {isEditor && (
          <MenuProvider product={product} wishlistId={product.wishlistId}>
            <div className="absolute right-2 top-2 z-10">
              <ProductMenu />
            </div>
          </MenuProvider>
        )}
        <Link href={getProductSlug(product)} className="w-full ">
          <div className="relative aspect-square w-full overflow-hidden bg-background object-cover ">
            {!!product.commitments.length ? (
              <div className="absolute left-2 top-2 z-10 rounded-md border-2 border-black bg-green-300 px-1 py-[2px] font-medium ">
                <p className="text-sm font-medium text-black"> Purchased </p>
              </div>
            ) : (
              <Priority priorityLevel={product.priority} />
            )}
            <ProductImage imageUrl={product.imageUrl} />
          </div>

          <div
            className={cn(
              "flex w-full items-center justify-between gap-4 border-t-2 border-black px-2 py-2",
              getBackgroundColor(wishlistColor),
            )}
          >
            <p className="-mb-[2px] line-clamp-1 overflow-ellipsis font-serif text-2xl group-hover:underline">
              {" "}
              {product.name}{" "}
            </p>
            {product.price && (
              <p className="text-md font-medium"> ${product.price} </p>
            )}
          </div>
        </Link>
      </motion.li>
    </AnimatePresence>
  );
};

export default Product;
