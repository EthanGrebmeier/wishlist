import type { WishlistProductWithCommitmentsWithUser } from "~/types/wishlist";
import Product from "./product";

type ProductListProps = {
  products: WishlistProductWithCommitmentsWithUser[];
  isEditor: boolean;
};

const ProductList = ({ products, isEditor }: ProductListProps) => {
  return (
    <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {products.map((product) => (
        <Product isEditor={isEditor} product={product} key={product.id} />
      ))}
    </ul>
  );
};

export default ProductList;
