"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

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
    <div className="relative  w-[120px] translate-y-4 ">
      <div className="aspect-square w-full overflow-hidden rounded-md border border-black">
        <img
          src={
            isImageValid ? imageUrl : "https://placehold.co/600x600/EEE/31343C"
          }
        />
      </div>
      {imageUrl && !isImageValid && (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute left-2 top-2 rounded-md p-1 transition-all hover:bg-yellow-400/80">
                <AlertTriangle width={20} height={20} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p> Invalid URL</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default ProductFormImagePreview;
