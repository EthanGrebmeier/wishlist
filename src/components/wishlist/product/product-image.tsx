import Image from "next/image";
import PlaceholderImage from "./placeholder-image";
import type { WishlistProduct } from "~/types/wishlist";
import { ArrowLeftIcon } from "lucide-react";
import ButtonLink from "~/components/ui/button-link";

export default function ProductImage({
  product,
}: {
  product: WishlistProduct;
}) {
  return (
    <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-md border-2 border-black">
      {product.imageUrl ? (
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 600px) 100vw, 600px"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <PlaceholderImage />
      )}
    </div>
  );
}
