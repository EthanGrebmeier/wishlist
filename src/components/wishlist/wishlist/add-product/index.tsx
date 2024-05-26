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
  shouldDefaultOpen?: boolean;
};

export const AddProduct = ({
  wishlistId,
  trigger,
  shouldDefaultOpen = false,
}: AddProduct) => {
  const [isOpen, setIsOpen] = useState(shouldDefaultOpen);
  const [view, setView] = useState<"scrape" | "form">("scrape");
  const [scrapedData, setScrapedData] = useState<
    undefined | z.infer<typeof partialCompiledProductDataSchema>
  >(undefined);

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const innerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setView("scrape");
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    if (view === "scrape") {
      setScrapedData(undefined);
    }
  }, [view]);

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {trigger ?? (
            <Button icon={<PlusIcon size={20} />}>
              <span className=" hidden lg:block"> Add Product</span>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-h-[80svh] overflow-y-auto">
          <DialogHeader>
            <h1 className="font-serif text-4xl font-medium">Add Product </h1>
          </DialogHeader>
          <div>
            {view === "scrape" ? (
              <ScrapeInput setView={setView} setScrapedData={setScrapedData} />
            ) : (
              <AddProductForm
                method="create"
                setView={setView}
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
          className="max-h-[80svh] overflow-y-auto p-4 transition-all"
          // style={{ height }}
        >
          <div ref={innerContainerRef}>
            {view === "scrape" ? (
              <ScrapeInput
                setView={setView}
                setScrapedData={setScrapedData}
                // onStatusChange={recalculateHeight}
              />
            ) : (
              <AddProductForm
                method="create"
                setView={setView}
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
