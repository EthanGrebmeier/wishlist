import Image from "next/image";
import PlaceholderImage from "./placeholder-image";
import { WishlistProduct } from "~/types/wishlist";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function ProductImage({
  product,
}: {
  product: WishlistProduct;
}) {
  return (
    <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-md border-2 border-black">
      <Link
        className="group absolute left-2 top-2 z-10 flex items-center gap-2 overflow-hidden rounded-md border-2 border-black bg-background px-2 py-1 transition-all duration-150 ease-out hover:bg-green-300"
        href={`/wishlist/${product.wishlistId}`}
      >
        <ArrowLeftIcon
          className="transition-all duration-150 ease-in group-hover:-translate-x-0.5"
          size={15}
        />{" "}
        Back
      </Link>
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
