"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Tooltip } from "~/components/ui/tooltip";
import PlaceholderImage from "~/components/wishlist/product/placeholder-image";

type ProductFormImagePreviewProps = {
  imageUrl?: string;
  setImageUrl: (value: string) => void;
};

const ProductFormImagePreview = ({
  imageUrl,
}: ProductFormImagePreviewProps) => {
  const [debouncedUrl, updateDebouncedUrl] = useDebounceValue(imageUrl, 300);
  const [isImageValid, setIsImageValid] = useState(false);

  useEffect(() => {
    updateDebouncedUrl(imageUrl);
  }, [imageUrl, updateDebouncedUrl]);

  return (
    <div className="relative w-full">
      <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-md border border-black object-cover object-center">
        {debouncedUrl && isImageValid ? (
          <img
            src={debouncedUrl}
            onError={() => setIsImageValid(false)}
            onLoad={() => setIsImageValid(true)}
          />
        ) : (
          <PlaceholderImage />
        )}
      </div>
      {imageUrl && !isImageValid && (
        <div className="absolute right-2 top-2 rounded-md border-2 border-black bg-yellow-400/80 p-1 transition-all">
          <Tooltip text="Invalid URL">
            <AlertTriangle width={20} height={20} />
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default ProductFormImagePreview;
