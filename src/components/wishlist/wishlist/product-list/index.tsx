import type { WishlistProductWithCommitmentsWithUser } from "~/types/wishlist";
import Product from "./product";

type ProductListProps = {
  products: WishlistProductWithCommitmentsWithUser[];
  isEditor: boolean;
};

const ProductList = ({ products, isEditor }: ProductListProps) => {
  return (
    <ul className="grid grid-cols-2 gap-4 gap-y-6 md:grid-cols-3 xl:grid-cols-4">
      {products
        .sort((a) => (a.commitments.length ? 1 : -1))
        .map((product) => (
          <Product isEditor={isEditor} product={product} key={product.id} />
        ))}
    </ul>
  );
};

export default ProductList;
