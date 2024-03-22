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
import FrameSelect from "./frame-select";
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
  const [frame, setFrame] = useState<"init" | "scrape" | "form">("init");
  const [scrapedData, setScrapedData] = useState<
    undefined | z.infer<typeof partialCompiledProductDataSchema>
  >(undefined);

  useEffect(() => {
    setFrame("init");
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button>
                  {" "}
                  <PlusIcon width="20" height="20" />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>Add Product</TooltipContent>
          </>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="px-0">
        <DialogHeader>
          <h1 className="px-4 font-serif text-4xl">Add Product </h1>
          {frame === "init" ? (
            <FrameSelect setFrame={setFrame} />
          ) : frame === "scrape" ? (
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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddProduct;
