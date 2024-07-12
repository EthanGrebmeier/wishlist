import React, {
  type Dispatch,
  type SetStateAction,
  useState,
  useEffect,
} from "react";
import { Button } from "~/components/ui/button";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";
import { ChevronLeft, Link, Upload, X } from "lucide-react";
import ProductFormImagePreview from "./image-preview";
import { UploadButton } from "~/lib/upload-thing";
import { Tooltip } from "~/components/ui/tooltip";
import { z } from "zod";
import { Input } from "~/components/ui/input";

type ProductImageInput = {
  setImageUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  imageUrl?: string;
  setFormView: Dispatch<SetStateAction<"form" | "image">>;
};

const ProductImageInput = ({
  setImageUrl,
  imageUrl,
  setFormView,
}: ProductImageInput) => {
  return (
    <div className="space-y-2">
      <div className="mb-8 ">
        <div className="relative grid w-full gap-6">
          <div className="relative  mx-auto max-w-36 md:max-w-60">
            <p className="font-sans text-lg font-medium"> Product Image </p>
            <ProductFormImagePreview imageUrl={imageUrl} />
          </div>
          <div className=" flex flex-col items-center gap-4">
            <div className="flex w-full items-center justify-center">
              <div className="w-full max-w-80">
                <label htmlFor="imageUrl">Image Url</label>
                <Input
                  name="imageUrl"
                  type="text"
                  onChange={(e) => setImageUrl(e.target.value)}
                  value={imageUrl}
                />
              </div>
            </div>
            <p> Or </p>
            <UploadButton
              className=" ut-button:border ut-button:border-black ut-button:bg-transparent ut-button:text-black"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                const uploadedFileUrl = res[0]?.url;
                const parsedFileUrl = z.string().parse(uploadedFileUrl);
                setImageUrl(parsedFileUrl);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
        </div>
      </div>
      <Button variant="secondary" onClick={() => setFormView("form")}>
        <ChevronLeft size={20} />
        Back
      </Button>
    </div>
  );
};

export default ProductImageInput;
