import { CameraIcon, ImageIcon, UploadIcon } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import InputButton from "~/components/ui/input-button";
import { useProductForm } from "../form";
import { UploadButton } from "~/lib/upload-thing";
import { z } from "zod";
import { Label } from "~/components/ui/label";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";

const ProductImageUpload = () => {
  const { setImageUrl, setFrame } = useProductForm();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full items-center gap-2">
        <div className="flex flex-1 flex-col">
          <h3 className="font-serif text-xl font-medium">Image</h3>
          <p className="text-sm tracking-tight">
            Select an image for your product
          </p>
        </div>
        <ColoredIconWrapper className="bg-green-400">
          <CameraIcon size={30} />
        </ColoredIconWrapper>
      </div>
      <section className="flex flex-col gap-2">
        <h1 className="text-sm font-medium leading-none">Upload Image</h1>
        <div className="flex h-64 w-full items-center justify-center rounded-md border border-black">
          <UploadButton
            className=" mt-4 ut-button:border ut-button:border-black ut-button:bg-transparent ut-button:text-black"
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              const uploadedFileUrl = res[0]?.url;
              const parsedFileUrl = z.string().parse(uploadedFileUrl);
              setImageUrl(parsedFileUrl);
              setFrame("form");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </section>
      <div className="flex items-center gap-3">
        <div className="h-[1px] flex-1 bg-black"></div>
        <p className="font-medium"> or </p>
        <div className="h-[1px] flex-1 bg-black"></div>
      </div>
      <section className="flex flex-col gap-2">
        <Label htmlFor="imageUrl"> Import from URL </Label>
        <InputButton
          name="imageUrl"
          button={{
            children: "Upload",
            icon: <UploadIcon size={15} />,
          }}
        />
      </section>
    </div>
  );
};

export const ProductImageUploadFooter = () => {
  const { setFrame } = useProductForm();
  return (
    <div className="flex w-full ">
      <Button onClick={() => setFrame("form")}>Back</Button>
    </div>
  );
};

export default ProductImageUpload;
