"use client";

import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
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

type AddProduct = {
  wishlistId: string;
};

export const AddProduct = ({ wishlistId }: AddProduct) => {
  const [isOpen, setIsOpen] = useState(false);
  const [frame, setFrame] = useState<"scrape" | "form">("scrape");
  const [scrapedData, setScrapedData] = useState<
    undefined | z.infer<typeof partialCompiledProductDataSchema>
  >(undefined);

  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setFrame("scrape");
      }, 200);

      return clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button icon={<PlusIcon size={20} />}>
                  <span className="hidden lg:block"> Add Product</span>
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>Add Product</TooltipContent>
          </>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <h1 className="font-serif text-4xl">Add Product </h1>
        </DialogHeader>
        <div>
          {frame === "scrape" ? (
            <ScrapeInput setFrame={setFrame} setScrapedData={setScrapedData} />
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
};

export default AddProduct;
