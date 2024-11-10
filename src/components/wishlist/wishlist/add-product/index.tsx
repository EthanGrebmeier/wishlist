"use client";

import { PlusIcon } from "lucide-react";
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";
import useMeasure from "react-use-measure";
import { motion } from "framer-motion";

import { AddProductForm } from "./form";
import ScrapeInput from "./scrape-input";
import type { z } from "zod";
import type { partialCompiledProductDataSchema } from "~/schema/wishlist/scrape";
import ResponsiveDialog from "~/components/ui/responsive-dialog";
import { SubmitButton } from "~/components/ui/submit-button";

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
  const addProductFrame = useState<"image" | "scrape" | "form">("scrape");
  const [wrapperRef, dimensions] = useMeasure();

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

  const footerContent = useMemo(() => {
    if (view === "scrape") {
      return (
        <>
          <Button onClick={() => setView("form")}>Back</Button>
          <SubmitButton>Scrape</SubmitButton>
        </>
      );
    }
    if (view === "form") {
      return (
        <>
          <SubmitButton>Add Product</SubmitButton>
        </>
      );
    }
    if (view === "image") {
      return (
        <>
          <Button onClick={() => setView("form")}>Back</Button>
        </>
      );
    }
  }, [view]);

  return (
    <ResponsiveDialog
      title="Add Product"
      trigger={
        trigger ?? (
          <Button icon={<PlusIcon size={20} />}>
            <span className=" hidden lg:block"> Add Product</span>
          </Button>
        )
      }
      footer={footerContent}
    >
      <motion.div
        animate={{
          height: dimensions?.height,
        }}
      >
        <div ref={wrapperRef}>
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
      </motion.div>
    </ResponsiveDialog>
  );
};

export default AddProduct;
