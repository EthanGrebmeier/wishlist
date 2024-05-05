"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Tooltip } from "~/components/ui/tooltip";

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

  useEffect(() => {
    const checkValidity = async () => {
      if (!debouncedUrl) return setIsImageValid(false);

      try {
        const res = await fetch(debouncedUrl);
        if (res.ok) {
          console.log("setting valid");
          setIsImageValid(true);
        } else {
          setIsImageValid(false);
        }
      } catch {
        setIsImageValid(false);
      }
    };
    void checkValidity();
  }, [debouncedUrl]);

  return (
    <div className="relative w-full">
      <div className="aspect-square w-full overflow-hidden rounded-md border border-black object-cover">
        <img
          src={
            isImageValid ? imageUrl : "https://placehold.co/600x600/EEE/31343C"
          }
          className="h-full w-full"
        />
      </div>
      {imageUrl && !isImageValid && (
        <Tooltip text="Invalid URL">
          <div className="absolute -right-2 -top-2 rounded-md p-1 transition-all hover:bg-yellow-400/80">
            <AlertTriangle width={20} height={20} />
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default ProductFormImagePreview;
