import { X } from "lucide-react";
import React from "react";
import { z } from "zod";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";
import { Tooltip } from "~/components/ui/tooltip";
import { UploadButton } from "~/lib/upload-thing";
import PlaceholderImage from "../wishlist/product/placeholder-image";
import Image from "next/image";

type ImageUploadProps = {
  uploadedImageURL?: string;
  setUploadedImageURL: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const ImageUpload = ({
  uploadedImageURL,
  setUploadedImageURL,
}: ImageUploadProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-lg font-medium">Image</p>
      <div className="flex w-full items-center ">
        <div className="relative w-full">
          <div className="aspect-square h-full w-full overflow-hidden rounded-md border-2 border-black">
            <div className="relative h-full w-full ">
              {uploadedImageURL ? (
                <Image
                  alt="uploaded image"
                  fill
                  src={uploadedImageURL}
                  className="h-full w-full object-cover object-center"
                />
              ) : (
                <PlaceholderImage />
              )}
            </div>
            {!uploadedImageURL ? (
              <div className="absolute bottom-2 left-1/2 w-fit -translate-x-1/2">
                <UploadButton
                  className="ut-button:border-2 ut-button:border-black ut-button:bg-transparent ut-button:text-black"
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    const uploadedFileUrl = res[0]?.url;

                    const parsedFileUrl = z.string().parse(uploadedFileUrl);

                    setUploadedImageURL(parsedFileUrl);
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
                  onClick={() => setUploadedImageURL(undefined)}
                >
                  <ColoredIconWrapper className="bg-red-400">
                    <X size={25} />
                  </ColoredIconWrapper>
                </button>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
