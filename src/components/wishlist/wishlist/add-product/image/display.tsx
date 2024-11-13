"use client";

import React from "react";
import { useProductForm } from "../form";
import Image from "next/image";
import PlaceholderImage from "../../../product/placeholder-image";
import { Button } from "~/components/ui/button";
import { ImageIcon, Trash2Icon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProductImageDisplay = () => {
  const { form, setFrame, setImageUrl } = useProductForm();

  const image = form.watch("imageUrl");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex items-center gap-2">
          <ImageIcon size={15} />
          <h3 className=" text-lg font-medium">Image</h3>
        </div>
        <button
          type="button"
          onClick={() => setFrame("image")}
          className="font-medium underline"
        >
          {image ? "Edit Image" : "Add Image"}
        </button>
      </div>
      <div className="relative h-64 w-full  self-center overflow-hidden rounded-md border border-black ">
        {image ? (
          <Image
            fill
            className="h-full w-full object-scale-down"
            src={image}
            alt="Product Image"
          />
        ) : (
          <PlaceholderImage />
        )}
        <AnimatePresence>
          {image && (
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 40, filter: "blur(4px)" }}
              transition={{ duration: 0.3, type: "spring", bounce: 0 }}
              className="absolute "
              style={{
                bottom: 8,
                right: 8,
              }}
            >
              <Button
                onClick={() => {
                  setImageUrl("");
                }}
                variant={"destructive"}
                icon={<Trash2Icon size={15} />}
                size="icon"
              ></Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductImageDisplay;
