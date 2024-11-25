"use client";
import type { WishlistProductWithCommitmentsWithUser } from "~/types/wishlist";
import Product from "./product";
import { sortProductsByPriority } from "~/lib/wishlist/sortProductsByPriority";
import type { z } from "zod";
import type { colorSchema } from "~/schema/wishlist/wishlist";
import { cn } from "~/lib/utils";
import { useAtom } from "jotai";
import { gridDisplayAtom } from "~/store/grid-display";
import { AnimatePresence, motion } from "framer-motion";

type ProductListProps = {
  products: WishlistProductWithCommitmentsWithUser[];
  canUserEdit: boolean;
  wishlistColor: z.infer<typeof colorSchema>;
  hideStatus?: boolean;
};

const ProductList = ({
  products,
  canUserEdit,
  wishlistColor,
  hideStatus = false,
}: ProductListProps) => {
  const [gridDisplay] = useAtom(gridDisplayAtom);
  return (
    <motion.ul
      layout
      className={cn(
        "grid grid-cols-2 gap-2 gap-y-6 sm:grid-cols-3 sm:gap-4 md:gap-y-6 xl:grid-cols-4",
        gridDisplay === "grid" ? "grid-cols-2" : " grid-cols-1",
      )}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {products
          .sort(sortProductsByPriority)
          .sort(
            (a, b) =>
              (a.updatedAt?.getTime() ?? 0) - (b.updatedAt?.getTime() ?? 0),
          )
          .sort((a) => (a.commitments?.length ? 1 : -1))
          .map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0 }}
            >
              <Product
                wishlistColor={wishlistColor}
                canUserEdit={canUserEdit}
                product={product}
                hideStatus={hideStatus}
                key={product.id}
                animationDelay={0.1 * index}
              />
            </motion.div>
          ))}
      </AnimatePresence>
    </motion.ul>
  );
};

export default ProductList;
