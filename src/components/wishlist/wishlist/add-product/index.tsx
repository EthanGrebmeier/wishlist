"use client";
import React, { useRef, useState } from "react";
import ResponsiveSheet from "~/components/ui/responsive-sheet";
import ProductForm, {
  ProductFormFooter,
  ProductFormProvider,
  useProductForm,
} from "./form";
import type { WishlistProduct } from "~/types/wishlist";
import { Button } from "~/components/ui/button";
import { PlusIcon, SparklesIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ScrapeInput, {
  AutofillFooter,
  AutofillProvider,
  useAutofillForm,
} from "./autofill";
import ProductImageDisplay from "./image/display";
import ProductImageUpload, { ProductImageUploadFooter } from "./image/upload";
import { useAtom, useSetAtom } from "jotai";
import { isProductFormOpenAtom, productToEditAtom } from "~/store/product-form";

type AddProductSheetProps = {
  wishlistId: string;
};

const ProductFormSheet = () => {
  const { frame, setFrame, isEditing, resetProductForm, isOpen, setIsOpen } =
    useProductForm();
  const { form: autofillForm } = useAutofillForm();

  const cleanup = () => {
    resetProductForm();
    autofillForm.reset();
  };
  const autofillRef = useRef<HTMLFormElement>(null);

  return (
    <ResponsiveSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onClose={() => {
        setTimeout(cleanup, 400);
      }}
      header={
        <AnimatePresence mode="wait" initial={false}>
          {frame === "form" && (
            <motion.div
              key="formheader"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0 }}
            >
              <Button
                onClick={() => setFrame("autofill")}
                variant="secondary"
                icon={<SparklesIcon size={15} />}
              >
                Autofill
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      }
      footer={
        <AnimatePresence initial={false} mode="popLayout">
          {frame === "autofill" && (
            <motion.div
              initial={{ opacity: 0, x: "110%", filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: "110%", filter: "blur(4px)" }}
              transition={{ duration: 0.3, type: "spring", bounce: 0 }}
              className="w-full"
              key="submenufooter"
            >
              <AutofillFooter
                setFrame={setFrame}
                handleSubmit={() => {
                  autofillRef.current?.requestSubmit();
                }}
              />
            </motion.div>
          )}
          {frame === "form" && (
            <motion.div
              key="formfooter"
              initial={{ opacity: 0, x: "110%", filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: "110%", filter: "blur(4px)" }}
              transition={{ duration: 0.3, type: "spring", bounce: 0 }}
              className="w-full"
            >
              <ProductFormFooter />
            </motion.div>
          )}
          {frame === "image" && (
            <motion.div
              key="imagefooter"
              initial={{ opacity: 0, x: "110%", filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: "110%", filter: "blur(4px)" }}
              transition={{ duration: 0.3, type: "spring", bounce: 0 }}
              className="w-full"
            >
              <ProductImageUploadFooter />
            </motion.div>
          )}
        </AnimatePresence>
      }
      title={isEditing ? "Edit Product" : "Add Product"}
    >
      <div className="py-4">
        <AnimatePresence initial={false} mode="popLayout">
          {frame === "form" && (
            <motion.div
              initial={{ opacity: 0, x: "-110%", filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: "-110%", filter: "blur(4px)" }}
              transition={{ duration: 0.3, type: "spring", bounce: 0 }}
              key="form"
              className="flex flex-col gap-4"
            >
              <ProductImageDisplay />
              <ProductForm />
            </motion.div>
          )}
          {frame === "autofill" && (
            <motion.div
              key="autofill"
              initial={{ opacity: 0, x: "110%", filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: "110%", filter: "blur(4px)" }}
              transition={{ duration: 0.3, type: "spring", bounce: 0 }}
            >
              <ScrapeInput ref={autofillRef} />
            </motion.div>
          )}
          {frame === "image" && (
            <motion.div
              key="image"
              initial={{ opacity: 0, x: "110%", filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: "110%", filter: "blur(4px)" }}
              transition={{ duration: 0.3, type: "spring", bounce: 0 }}
            >
              <ProductImageUpload />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ResponsiveSheet>
  );
};

const AddProduct = (props: AddProductSheetProps) => {
  return (
    <ProductFormProvider wishlistId={props.wishlistId}>
      <AutofillProvider>
        <ProductFormSheet />
      </AutofillProvider>
    </ProductFormProvider>
  );
};

export const AddProductSheetTrigger = () => {
  const setIsOpen = useSetAtom(isProductFormOpenAtom);
  return (
    <Button icon={<PlusIcon size={15} />} onClick={() => setIsOpen(true)}>
      Add Product
    </Button>
  );
};

export default AddProduct;
