"use client";

import React from "react";
import { useProductForm } from "../form";
import Image from "next/image";
import PlaceholderImage from "../../../product/placeholder-image";
import { Button } from "~/components/ui/button";
import { ImageIcon } from "lucide-react";

const ProductImageDisplay = () => {
  const { form, setFrame } = useProductForm();

  const image = form.watch("imageUrl");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <ImageIcon size={15} />
        <h3 className=" text-lg font-medium">Image</h3>
      </div>
      <div className="relative h-64 w-full  self-center overflow-hidden rounded-md border border-black ">
        {image ? (
          <Image
            fill
            className="h-full w-full object-cover"
            src={image}
            alt="Product Image"
          />
        ) : (
          <PlaceholderImage />
        )}
        <Button
          onClick={() => {
            setFrame("image");
          }}
          icon={<ImageIcon size={15} />}
          size="icon"
          className="absolute bottom-2 right-2"
        ></Button>
      </div>
    </div>
  );
};

export default ProductImageDisplay;
