"use client";
import React, { useRef } from "react";
import ResponsiveSheet from "~/components/ui/responsive-sheet";
import ProductForm, {
  ProductFormFooter,
  ProductFormProvider,
  useProductForm,
} from "./form";
import type { WishlistProduct } from "~/types/wishlist";
import { Button } from "~/components/ui/button";
import { SparklesIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ScrapeInput, { AutofillFooter, AutofillProvider } from "./autofill";
import ProductImageDisplay from "./image/display";
import ProductImageUpload, { ProductImageUploadFooter } from "./image/upload";

type AddProductSheetProps = {
  wishlistId: string;
  product?: WishlistProduct;
  trigger: React.ReactNode;
};

const AddProductSheet = ({ trigger }: AddProductSheetProps) => {
  const { frame, setFrame, isEditing } = useProductForm();
  const autofillRef = useRef<HTMLFormElement>(null);

  return (
    <ResponsiveSheet
      onClose={() => {
        setTimeout(() => {
          setFrame("form");
        }, 400);
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
      trigger={trigger}
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

const WithContext = (props: AddProductSheetProps) => {
  return (
    <ProductFormProvider
      isEditing={Boolean(props.product)}
      wishlistId={props.wishlistId}
      product={props.product}
    >
      <AutofillProvider>
        <AddProductSheet {...props} />
      </AutofillProvider>
    </ProductFormProvider>
  );
};

export default WithContext;
