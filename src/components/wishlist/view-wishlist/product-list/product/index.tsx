import { Product } from "~/types/wishlist";
import ProductMenu from "./menu";
import MenuProvider from "./menu/menuProvider";
import ProductImage from "./image";

type ProductProps = {
  product: Product;
};

const Product = ({ product }: ProductProps) => {
  return (
    <div className="w-full space-y-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-md">
        <MenuProvider productId={product.id} wishlistId={product.wishlistId}>
          <div className="absolute right-2 top-2">
            <ProductMenu />
          </div>
        </MenuProvider>
        <ProductImage imageUrl={product.image} link={product.url} />
      </div>
      <div className="flex w-full items-center justify-between gap-4">
        <p className="text-xl font-medium"> {product.name} </p>
        <p className="text-md font-medium"> ${product.price} </p>
      </div>
    </div>
  );
};

export default Product;
