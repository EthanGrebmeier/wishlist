import type { Product as ProductType } from "~/types/wishlist";
import Product from "./product";

type ProductListProps = {
  products: ProductType[];
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
