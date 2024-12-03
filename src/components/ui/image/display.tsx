"use client";

import React from "react";
import Image from "next/image";
import PlaceholderImage from "../../wishlist/product/placeholder-image";
import { Button } from "~/components/ui/button";
import { ImageIcon, Trash2Icon } from "lucide-react";

type ImageDisplayProps = {
  openImageEditor: () => void;
  imageUrl?: string | null;
  removeImage: () => void;
};

const ImageDisplay = ({
  openImageEditor,
  imageUrl,
  removeImage,
}: ImageDisplayProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex items-center gap-2">
          <ImageIcon size={15} />
          <h3 className=" text-lg font-medium">Image</h3>
        </div>
        <button
          type="button"
          onClick={openImageEditor}
          className="font-medium underline"
        >
          {imageUrl ? "Edit Image" : "Add Image"}
        </button>
      </div>
      <div className="relative h-64 w-full  self-center overflow-hidden rounded-md border border-black ">
        {imageUrl ? (
          <Image
            fill
            className="h-full w-full object-cover"
            src={imageUrl}
            alt="Content selected or uploaded by the user"
          />
        ) : (
          <PlaceholderImage />
        )}
        <div className="absolute bottom-2 right-2">
          {imageUrl && (
            <Button
              onClick={removeImage}
              variant={"destructive"}
              icon={<Trash2Icon size={15} />}
              size="icon"
            ></Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageDisplay;
