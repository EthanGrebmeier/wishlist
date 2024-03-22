"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { addProduct } from "~/app/wishlist/[wishlistId]/actions";
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
import ProductFormImagePreview from "./image";
import { updateProduct } from "~/server/actions/product";
import { useAction } from "next-safe-action/hooks";
import type { WishlistProduct } from "~/types/wishlist";
import { cn } from "~/lib/utils";
import { DialogFooter } from "~/components/ui/dialog";

type AddProductFormProps = {
  wishlistId: string;
  onSuccess?: () => void;
  defaultValues?: z.infer<typeof partialCompiledProductDataSchema>;
  setFrame?: Dispatch<SetStateAction<"scrape" | "form">>;
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
  setFrame,
  method = "create",
  product,
}: AddProductFormProps) => {
  // Two separate useActions due to useAction not liking being provided an action based on a condition
  const { execute: executeAdd, result: addResult } = useAction(addProduct);
  const { execute: executeUpdate, result: updateResult } =
    useAction(updateProduct);

  const form = useForm<z.infer<typeof productInputSchema>>({
    resolver: zodResolver(productInputSchema),
    defaultValues: {
      name: defaultValues?.name ?? product?.name ?? "",
      brand: defaultValues?.brand ?? product?.brand ?? "",
      image: defaultValues?.images?.[0] ?? product?.image ?? "",
      price: defaultValues?.price ?? product?.price ?? "",
      url: defaultValues?.url ?? product?.url ?? "",
    },
  });

  const fields = form.watch();

  const executeServerAction = () => {
    if (method === "create") {
      executeAdd({
        wishlistId,
        product: fields,
      });
    } else if (product) {
      executeUpdate({
        ...fields,
        wishlistId,
        id: product.id,
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
    <div className="flex flex-col gap-4 ">
      {/* <section>
        <h2 className="pb-2 text-2xl font-medium"> Product Preview </h2>
        <div className="mx-auto w-[280px]">
          <div className="mb-2 aspect-square w-full overflow-hidden rounded-md">
            <img
              src={fields.image ?? "https://placehold.co/600x400/EEE/31343C"}
            />
          </div>
          <div className="flex h-6 w-full items-center justify-between gap-4">
            <p className="text-xl font-medium"> {fields.name} </p>
            {fields.price && (
              <p className="text-md font-medium"> ${fields.price} </p>
            )}
          </div>
        </div>
      </section> */}
      <section>
        <Form {...form}>
          <form
            className=" flex h-full flex-col gap-4 overflow-y-auto px-4 py-2"
            action={executeServerAction}
            onSubmit={() => form.trigger()}
          >
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Product Name<sup> * </sup>
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="image"
              render={({ field }) => (
                <div className=" grid grid-cols-[1fr_auto] gap-4">
                  <div className="flex w-full items-center">
                    <FormItem className="w-full">
                      <FormLabel>Product Image</FormLabel>

                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                  <ProductFormImagePreview
                    setImageUrl={(value: string) =>
                      form.setValue("image", value)
                    }
                    imageUrl={fields.image}
                  />
                </div>
              )}
            />
            <FormField
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Quantity</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Link </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="h-12">
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 m-4 mt-8 flex bg-background",
                  setFrame ? "justify-between" : "justify-end",
                )}
              >
                {setFrame && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setFrame("scrape")}
                    icon={<ArrowLeft width={20} height={20} />}
                  >
                    Back
                  </Button>
                )}
                <SubmitButton />
              </div>
            </div>
          </form>
        </Form>
      </section>
    </div>
  );
};
