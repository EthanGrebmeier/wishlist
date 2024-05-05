import React, { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";
import { Link, Upload, X } from "lucide-react";
import ProductFormImagePreview from "./image-preview";
import { UploadButton } from "~/lib/upload-thing";
import { Tooltip } from "~/components/ui/tooltip";
import { z } from "zod";

type ProductImageInput = {
  setImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  imageUrl?: string;
};

const ProductImageInput = ({ setImageUrl, imageUrl }: ProductImageInput) => {
  const [mode, setMode] = useState<"scrape" | "upload">("scrape");
  const [uploadedImageURL, setUploadedImageURL] = useState<
    string | undefined
  >();

  return (
    <div className="space-y-2">
      <p className="font-sans text-lg font-medium"> Image </p>
      <div className="relative">
        <ProductFormImagePreview
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
        />
        {mode === "scrape" ? (
          <div className=" absolute inset-0 flex flex-col items-end justify-end gap-4 p-2">
            <div className="flex w-full items-center">
              <div className="w-full">
                <label htmlFor="imageUrl">Image Url</label>
                <Input
                  name="imageUrl"
                  type="text"
                  onChange={(e) => setImageUrl(e.target.value)}
                  value={imageUrl}
                />
              </div>
            </div>
          </div>
        ) : !uploadedImageURL ? (
          <div className="absolute bottom-2 left-1/2 w-fit -translate-x-1/2">
            <UploadButton
              className="ut-button:border-2 ut-button:border-black ut-button:bg-transparent ut-button:text-black"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                const uploadedFileUrl = res[0]?.url;
                const parsedFileUrl = z.string().parse(uploadedFileUrl);

                setUploadedImageURL(parsedFileUrl);
                setImageUrl(parsedFileUrl);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
        ) : (
          <Tooltip text="Remove Image">
            <button
              className="absolute -right-2 -top-2 z-10"
              onClick={() => {
                setUploadedImageURL(undefined);
                setImageUrl(undefined);
              }}
            >
              <ColoredIconWrapper className="bg-red-400">
                <X size={25} />
              </ColoredIconWrapper>
            </button>
          </Tooltip>
        )}
        {mode === "scrape" ? (
          <Button
            type="button"
            onClick={() => setMode("upload")}
            className="absolute left-2 top-2 h-10 w-10 rounded-full p-0"
          >
            <Upload size={20} />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => setMode("scrape")}
            className="absolute left-2 top-2 h-10 w-10 rounded-full p-0"
          >
            <Link size={20} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductImageInput;
