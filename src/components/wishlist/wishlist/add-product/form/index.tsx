"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { addProduct } from "~/app/(main)/wishlist/[wishlistId]/actions";
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
  const [imageUrl, setImageUrl] = useState(
    defaultValues?.images?.[0] ?? product?.imageUrl ?? undefined,
  );

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
    <Form {...form}>
      <form
        className=" -mx-4 flex h-full flex-col gap-4 overflow-y-auto px-4 pb-20"
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
        <div>
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
          <ProductImageInput setImageUrl={setImageUrl} imageUrl={imageUrl} />
          <div className="flex flex-col justify-between gap-4 pb-2 xs:gap-0 ">
            <div className="flex flex-row gap-4 xs:flex-col xs:gap-0 ">
              <FormField
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <PriceInput type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <label className="text-lg font-medium" htmlFor="quantity">
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
            "absolute bottom-0 left-0 right-0 flex border-t-2 border-black bg-background px-4 py-4 ",
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
          <SubmitButton>
            {setFrame ? "Add Product" : "Update Product"}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};
