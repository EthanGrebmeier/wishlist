"use client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import ResponsiveSheet from "~/components/ui/responsive-sheet";
import ProductForm, {
  ProductFormFooter,
  ProductFormProvider,
  useProductForm,
} from "./form";
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
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { isProductFormOpenAtom, productToEditAtom } from "~/store/product-form";

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
              <div
                style={{
                  WebkitBackdropFilter:
                    "var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
                }}
                className="absolute bottom-0 left-0 right-0 flex h-16 flex-row items-center justify-between border-t border-black bg-transparent px-6 backdrop-blur-lg md:relative md:mt-4 md:h-auto md:px-0  md:pt-4"
              >
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

export const AddProductSheetTriggerMobile = () => {
  const setIsOpen = useSetAtom(isProductFormOpenAtom);
  const setProductToEdit = useSetAtom(productToEditAtom);
  const openSheet = () => {
    setIsOpen(true);
    setProductToEdit(undefined);
  };
  return (
    <Button
      onClick={openSheet}
      className="fixed bottom-4 left-4 hidden md:block"
      size="circle"
      icon={<PlusIcon size={20} />}
    ></Button>
  );
};

type ProductInputFrame = "form" | "autofill" | "image";

type ProductSheetNavigationContextType = {
  frame: ProductInputFrame;
  setFrame: Dispatch<SetStateAction<ProductInputFrame>>;
};

const ProductSheetNavigationContext =
  createContext<ProductSheetNavigationContextType | null>(null);

type ProductSheetNavigationProviderProps = {
  children: React.ReactNode;
};

export const ProductSheetNavigationProvider = ({
  children,
}: ProductSheetNavigationProviderProps) => {
  const [frame, setFrame] = useState<ProductInputFrame>("form");
  return (
    <ProductSheetNavigationContext.Provider value={{ frame, setFrame }}>
      {children}
    </ProductSheetNavigationContext.Provider>
  );
};

export const useProductSheetNavigation = () => {
  const context = useContext(ProductSheetNavigationContext);
  if (!context) {
    throw new Error(
      "useProductSheetNavigation must be used within a ProductSheetNavigationProvider",
    );
  }
  return context;
};

export default AddProduct;
