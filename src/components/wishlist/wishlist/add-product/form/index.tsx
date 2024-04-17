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
      quantity: defaultValues?.quantity ?? product?.quantity ?? "",
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
    <Form {...form}>
      <form
        className=" -mx-4 flex h-full flex-col gap-4 overflow-y-auto p-4"
        action={executeServerAction}
        onSubmit={() => form.trigger()}
      >
        <div className="grid grid-cols-2 gap-4">
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
        </div>
        <FormField
          name="image"
          render={({ field }) => (
            <div className=" grid grid-cols-[1fr_auto] gap-4">
              <div className="flex w-full items-center">
                <FormItem className="w-full">
                  <FormLabel>Image</FormLabel>

                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
              <ProductFormImagePreview
                setImageUrl={(value: string) => form.setValue("image", value)}
                imageUrl={fields.image}
              />
            </div>
          )}
        />
        <div className="mt-4 grid grid-cols-2 gap-4">
          <FormField
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
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
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        <div className="h-12">
          <div
            className={cn(
              "absolute bottom-0 left-0 right-0 mt-8 flex bg-background p-4 ",
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
  );
};
