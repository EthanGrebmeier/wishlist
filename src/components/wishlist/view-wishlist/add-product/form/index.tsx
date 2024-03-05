"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
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

type AddProductFormProps = {
  wishlistId: string;
  onSuccess?: () => void;
  defaultValues?: z.infer<typeof partialCompiledProductDataSchema>;
  setFrame: Dispatch<SetStateAction<"init" | "scrape" | "form">>;
};
export const AddProductForm = ({
  wishlistId,
  onSuccess,
  defaultValues,
  setFrame,
}: AddProductFormProps) => {
  const [response, formAction] = useFormState(addProduct, null);
  const form = useForm<z.infer<typeof productInputSchema>>({
    resolver: zodResolver(productInputSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      brand: defaultValues?.brand ?? "",
      image: defaultValues?.images?.[0] ?? "",
      price: defaultValues?.price ?? "",
      url: defaultValues?.url ?? "",
    },
  });
  const fields = form.watch();

  const actionData = formAction.bind(null, {
    product: {
      ...fields,
    },
    wishlistId,
  });

  useEffect(() => {
    if (response?.message === "success" && onSuccess) {
      onSuccess();
    }
  }, [response, onSuccess]);

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
      <section className="relative ">
        <h2 className="pb-2 text-2xl font-medium"> Product Details </h2>
        <Form {...form}>
          <form
            className=" space-y-4 overflow-y-auto"
            action={actionData}
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
            <div className="flex justify-between">
              <Button
                onClick={() =>
                  defaultValues ? setFrame("scrape") : setFrame("init")
                }
                icon={<ArrowLeft width={20} height={20} />}
                variant="outline"
              >
                Back
              </Button>
              <SubmitButton />
            </div>
          </form>
        </Form>
      </section>
    </div>
  );
};
