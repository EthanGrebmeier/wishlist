import type { WishlistProductWithCommitmentsWithUser } from "~/types/wishlist";
import Product from "./product";
import { sortProductsByPriority } from "~/lib/wishlist/sortProductsByPriority";
import type { z } from "zod";
import type { colorSchema } from "~/schema/wishlist/wishlist";

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
  return (
    <ul className="grid gap-4 gap-y-6 xs:grid-cols-2 md:grid-cols-3 md:gap-y-6 xl:grid-cols-4">
      {products
        .sort(sortProductsByPriority)
        .sort((a) => (a.commitments.length ? 1 : -1))
        .map((product) => (
          <Product
            wishlistColor={wishlistColor}
            canUserEdit={canUserEdit}
            product={product}
            hideStatus={hideStatus}
            key={product.id}
          />
        ))}
    </ul>
  );
};

export default ProductList;
