import type { WishlistProduct } from "~/types/wishlist";
import Product from "./product";

type ProductListProps = {
  products: WishlistProduct[];
};

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="grid grid-cols-4 gap-8">
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
