"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Pencil, Sparkles } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addProduct } from "~/server/actions/product";
import { Button } from "~/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { SubmitButton } from "~/components/ui/submit-button";
import { productInputSchema } from "~/schema/wishlist/product";
import type { partialCompiledProductDataSchema } from "~/schema/wishlist/scrape";
import { updateProduct } from "~/server/actions/product";
import { useAction } from "next-safe-action/hooks";
import type { WishlistProduct } from "~/types/wishlist";
import { cn } from "~/lib/utils";
import Incrementor from "~/components/ui/incrementor";
import { Textarea } from "~/components/ui/textarea";
import ProductImageInput from "./image";
import PriceInput from "./price";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import ProductFormImagePreview from "./image/image-preview";
import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";

type AddProductFormProps = {
  wishlistId: string;
  onSuccess?: () => void;
  defaultValues?: z.infer<typeof partialCompiledProductDataSchema>;
  setView?: Dispatch<SetStateAction<"scrape" | "form">>;
  product?: WishlistProduct;
} & (
  | {
      method: "create";
    }
  | {
      method: "update";
      product: WishlistProduct;
    }
);
export const AddProductForm = ({
  wishlistId,
  onSuccess,
  defaultValues,
  setView,
  method = "create",
  product,
}: AddProductFormProps) => {
  const [formView, setFormView] = useState<"form" | "image">("form");
  const [imageUrl, setImageUrl] = useState(
    defaultValues?.images?.[0] ?? product?.imageUrl ?? undefined,
  );
  const [innerRef, dimensions] = useMeasure();

  // Two separate useActions due to useAction not liking being provided an action based on a condition
  const { execute: executeAdd, result: addResult } = useAction(addProduct);
  const { execute: executeUpdate, result: updateResult } =
    useAction(updateProduct);

  const form = useForm<z.infer<typeof productInputSchema>>({
    resolver: zodResolver(productInputSchema),
    defaultValues: {
      name: defaultValues?.name ?? product?.name ?? "",
      description: defaultValues?.description ?? product?.description ?? "",
      brand: defaultValues?.brand ?? product?.brand ?? "",
      quantity: defaultValues?.quantity ?? product?.quantity ?? "1",
      price: defaultValues?.price ?? product?.price ?? "",
      url: defaultValues?.url ?? product?.url ?? "",
      priority: product?.priority ?? "normal",
    },
  });

  const fields = form.watch();

  const executeServerAction = () => {
    if (method === "create") {
      executeAdd({
        ...fields,
        imageUrl,
        wishlistId,
      });
    } else if (product) {
      executeUpdate({
        ...fields,
        wishlistId,
        id: product.id,
        imageUrl,
      });
    }
  };

  useEffect(() => {
    if (
      method === "create" &&
      addResult.data?.message === "success" &&
      onSuccess
    ) {
      onSuccess();
    }
    if (
      method === "update" &&
      updateResult.data?.message === "success" &&
      onSuccess
    ) {
      onSuccess();
    }
  }, [onSuccess, addResult, updateResult, method]);

  return (
    <motion.div
      animate={{
        height: dimensions?.height,
      }}
    >
      <div ref={innerRef}>
        <AnimatePresence initial={false} mode="popLayout">
          {formView === "image" ? (
            <motion.div
              key="image"
              initial={{ opacity: 0, x: "110%", filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: "110%", filter: "blur(4px)" }}
              transition={{ duration: 0.3, type: "spring", bounce: 0 }}
              className="flex h-full flex-col gap-4  "
            >
              <ProductImageInput
                setFormView={setFormView}
                setImageUrl={setImageUrl}
                imageUrl={imageUrl}
              />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: "-110%", filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: "-110%", filter: "blur(4px)" }}
              transition={{ duration: 0.3, type: "spring", bounce: 0 }}
              className="flex h-full flex-col gap-4  "
            >
              {defaultValues && (
                <div className="mb-4 flex items-center justify-between text-sm tracking-tight">
                  <div>
                    <p className="text-lg font-medium">
                      {" "}
                      Product Information Autofilled{" "}
                    </p>
                    <p>We&apos;ve gathered the following product information</p>
                    <p>Please ensure that it is correct</p>
                  </div>
                  <ColoredIconWrapper className="bg-purple-300">
                    <Sparkles size={30} />
                  </ColoredIconWrapper>
                </div>
              )}

              <Form {...form}>
                <form
                  className=" flex h-full flex-col gap-4"
                  action={executeServerAction}
                  onSubmit={() => form.trigger()}
                >
                  <div className="grid gap-4">
                    <FormField
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Name<sup> * </sup>
                          </FormLabel>
                          <FormControl>
                            <Input autoComplete="off" type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 ">
                    <FormField
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={z.string().parse(field.value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem
                                  className="focus:bg-yellow-200"
                                  value="high"
                                >
                                  High
                                </SelectItem>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem
                                  className="focus:bg-red-200"
                                  value="low"
                                >
                                  Low
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea className="resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 xs:grid-cols-[200px_auto] xs:gap-4">
                    <div className="">
                      <p className="mb-2 text-lg font-medium"> Image </p>
                      <div className="relative">
                        <ProductFormImagePreview imageUrl={imageUrl} />
                        <Button
                          type="button"
                          size="circle"
                          onClick={() => setFormView("image")}
                          className="absolute right-2 top-2"
                        >
                          <Pencil size={20} />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between gap-4 pb-2 xs:gap-0 ">
                      <div className="flex flex-row gap-4 xs:flex-col xs:gap-0 ">
                        <FormField
                          name="price"
                          render={({ field }) => (
                            <FormItem className="w-[180px]">
                              <FormLabel>Price</FormLabel>
                              <FormControl>
                                <PriceInput type="text" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="w-[180px] space-y-2">
                          <label
                            className=" text-lg font-medium"
                            htmlFor="quantity"
                          >
                            Quantity
                          </label>
                          <Incrementor
                            onQuantityChange={(value) =>
                              form.setValue("quantity", value.toString())
                            }
                            value={parseInt(fields.quantity ?? "1")}
                          />
                        </div>
                      </div>
                      <FormField
                        name="url"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Link </FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div
                    className={cn(
                      "flex ",
                      setView ? "justify-between" : "justify-end",
                    )}
                  >
                    {setView && (
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setView("scrape")}
                        icon={<ArrowLeft width={20} height={20} />}
                      >
                        Back
                      </Button>
                    )}
                    <SubmitButton>
                      {setView ? "Add Product" : "Update Product"}
                    </SubmitButton>
                  </div>
                </form>
              </Form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
