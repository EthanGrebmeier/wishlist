"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import PlaceholderImage from "~/components/wishlist/product/placeholder-image";

type ProductFormImagePreviewProps = {
  imageUrl?: string;
};

const ProductFormImagePreview = ({
  imageUrl,
}: ProductFormImagePreviewProps) => {
  const [debouncedUrl, updateDebouncedUrl] = useDebounceValue(imageUrl, 300);
  const [isImageValid, setIsImageValid] = useState(true);

  useEffect(() => {
    updateDebouncedUrl(imageUrl);
  }, [imageUrl, updateDebouncedUrl]);

  return (
    <div className="relative w-full">
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-md border border-black object-cover object-center">
        {debouncedUrl && isImageValid ? (
          <Image
            alt=""
            fill
            src={debouncedUrl}
            onError={() => setIsImageValid(false)}
            onLoad={() => setIsImageValid(true)}
          />
        ) : (
          <PlaceholderImage />
        )}
      </div>
    </div>
  );
};

export default ProductFormImagePreview;
