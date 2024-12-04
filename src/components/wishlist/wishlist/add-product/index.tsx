"use client";
import React, { useRef } from "react";
import ResponsiveSheet from "~/components/ui/responsive-sheet";
import ProductForm, { ProductFormFooter, ProductFormProvider } from "./form";
import { Button } from "~/components/ui/button";
import {
  PackagePlusIcon,
  PencilIcon,
  PlusIcon,
  SparklesIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ScrapeInput, { AutofillFooter } from "./autofill";

import { ProductImageUploadFooter } from "../../../ui/image/upload";
import { useAtom, useSetAtom } from "jotai";
import {
  isProductFormOpenAtom,
  productToEditAtom,
} from "~/store/product-settings";
import { ProductImageDisplay } from "./image/display";
import { ProductImageUpload } from "./image/upload";
import { AutofillProvider } from "./autofill-context";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";
import {
  ProductSheetNavigationProvider,
  useProductSheetNavigation,
} from "./navigation-context";

type AddProductSheetProps = {
  wishlistId: string;
};

const ProductFormSheet = ({ wishlistId }: AddProductSheetProps) => {
  const { frame, setFrame } = useProductSheetNavigation();
  const [productToEdit, setProductToEdit] = useAtom(productToEditAtom);
  const isEditing = Boolean(productToEdit);
  const [isOpen, setIsOpen] = useAtom(isProductFormOpenAtom);

  const autofillRef = useRef<HTMLFormElement>(null);

  return (
    <ResponsiveSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      titleIcon={
        isEditing ? (
          <ColoredIconWrapper className="bg-yellow-400">
            <PencilIcon size={20} />
          </ColoredIconWrapper>
        ) : (
          <ColoredIconWrapper className="bg-green-400">
            <PackagePlusIcon size={20} />
          </ColoredIconWrapper>
        )
      }
      onClose={() => setProductToEdit(undefined)}
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
                variant="secondary"
                onClick={() => setFrame("autofill")}
                className="group"
                icon={
                  <SparklesIcon
                    size={15}
                    className="group-hover:animate-shake"
                  />
                }
              >
                Autofill
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      }
      title={isEditing ? "Edit Product" : "Add Product"}
      shouldPadBottomMobile
    >
      <ProductFormProvider wishlistId={wishlistId}>
        <AutofillProvider>
          <div className="flex flex-col pt-4">
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
            </AnimatePresence>
            <AnimatePresence initial={false} mode="popLayout">
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

              <div
                style={{
                  WebkitBackdropFilter:
                    "var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
                }}
                className="absolute bottom-0 left-0 right-0 flex h-16 flex-row items-center justify-between border-t border-black bg-transparent px-4 backdrop-blur-lg md:relative md:mt-4 md:h-auto md:px-0  md:pt-4"
              >
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
                    <ProductImageUploadFooter onBack={() => setFrame("form")} />
                  </motion.div>
                )}
              </div>
            </AnimatePresence>
          </div>
        </AutofillProvider>
      </ProductFormProvider>
    </ResponsiveSheet>
  );
};

const AddProduct = (props: AddProductSheetProps) => {
  return (
    <ProductSheetNavigationProvider>
      <ProductFormSheet {...props} />
    </ProductSheetNavigationProvider>
  );
};

export const AddProductSheetTrigger = () => {
  const setIsOpen = useSetAtom(isProductFormOpenAtom);
  const setProductToEdit = useSetAtom(productToEditAtom);
  const openSheet = () => {
    setIsOpen(true);
    setProductToEdit(undefined);
  };
  return (
    <Button icon={<PlusIcon size={15} />} onClick={openSheet}>
      Add Product
    </Button>
  );
};

export default AddProduct;
