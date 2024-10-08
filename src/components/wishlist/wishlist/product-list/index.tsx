"use client";
import type { WishlistProductWithCommitmentsWithUser } from "~/types/wishlist";
import Product from "./product";
import { sortProductsByPriority } from "~/lib/wishlist/sortProductsByPriority";
import type { z } from "zod";
import type { colorSchema } from "~/schema/wishlist/wishlist";
import { cn } from "~/lib/utils";
import { useAtom } from "jotai";
import { gridDisplayAtom } from "~/store/grid-display";

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
    <ul
      className={cn(
        "grid grid-cols-2 gap-2 gap-y-6 sm:grid-cols-3 sm:gap-4 md:gap-y-6 xl:grid-cols-4",
        gridDisplay === "grid" ? " grid-cols-2" : " grid-cols-1",
      )}
    >
      {products
        .sort(sortProductsByPriority)
        .sort((a) => (a.commitments.length ? 1 : -1))
        .map((product, index) => (
          <Product
            wishlistColor={wishlistColor}
            canUserEdit={canUserEdit}
            product={product}
            hideStatus={hideStatus}
            key={product.id}
            animationDelay={0.1 * index}
          />
        ))}
    </ul>
  );
};

export default ProductList;
