"use client";

import { PlusIcon } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";

import { AddProductForm } from "./form";
import ScrapeInput from "./scrape-input";
import type { z } from "zod";
import type { partialCompiledProductDataSchema } from "~/schema/wishlist/scrape";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

type AddProduct = {
  wishlistId: string;
  trigger?: ReactNode;
};

export const AddProduct = ({ wishlistId, trigger }: AddProduct) => {
  const [isOpen, setIsOpen] = useState(false);
  const [frame, setFrame] = useState<"scrape" | "form">("scrape");
  const [height, setHeight] = useState(400);
  const [scrapedData, setScrapedData] = useState<
    undefined | z.infer<typeof partialCompiledProductDataSchema>
  >(undefined);

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const innerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setFrame("scrape");
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const recalculateHeight = () => {
    setHeight((innerContainerRef.current?.offsetHeight ?? 126) + 36);
  };

  useEffect(() => {
    recalculateHeight();
  }, [frame, isOpen]);

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  {trigger ?? (
                    <Button icon={<PlusIcon size={20} />}>
                      <span className=" hidden lg:block"> Add Product</span>
                    </Button>
                  )}
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>Add Product</TooltipContent>
            </>
          </Tooltip>
        </TooltipProvider>
        <DialogContent>
          <DialogHeader>
            <h1 className="font-serif text-4xl font-medium">Add Product </h1>
          </DialogHeader>
          <div>
            {frame === "scrape" ? (
              <ScrapeInput
                setFrame={setFrame}
                setScrapedData={setScrapedData}
                onStatusChange={recalculateHeight}
              />
            ) : (
              <AddProductForm
                method="create"
                setFrame={setFrame}
                defaultValues={scrapedData}
                wishlistId={wishlistId}
                onSuccess={() => {
                  setIsOpen(false);
                  setScrapedData(undefined);
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        {trigger ?? (
          <Button icon={<PlusIcon size={20} />}>
            <span className=" hidden lg:block"> Add Product</span>
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="border-b-2 border-black md:border-none md:pb-0">
          <DrawerTitle className=" font-serif text-4xl font-medium ">
            Add Product
          </DrawerTitle>
        </DrawerHeader>
        <div
          className="max-h-[clamp(400px,80vh,800px)] overflow-y-scroll p-4 transition-all"
          style={{ height }}
        >
          <div ref={innerContainerRef}>
            {frame === "scrape" ? (
              <ScrapeInput
                setFrame={setFrame}
                setScrapedData={setScrapedData}
                onStatusChange={recalculateHeight}
              />
            ) : (
              <AddProductForm
                method="create"
                setFrame={setFrame}
                defaultValues={scrapedData}
                wishlistId={wishlistId}
                onSuccess={() => {
                  setIsOpen(false);
                  setScrapedData(undefined);
                }}
              />
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AddProduct;
