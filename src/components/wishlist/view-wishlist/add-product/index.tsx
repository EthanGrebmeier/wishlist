"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { addProduct } from "~/app/wishlist/[wishlistId]/add-product/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import Link from "~/components/ui/link";
import { SubmitButton } from "~/components/ui/submit-button";
import { productInputSchema } from "~/schema/wishlist/product";

type AddProductProps = {
  wishlistId: string;
};

const AddProduct = ({ wishlistId }: AddProductProps) => {
  const [response, formAction] = useFormState(addProduct, null);
  const form = useForm<z.infer<typeof productInputSchema>>({
    resolver: zodResolver(productInputSchema),
    defaultValues: {
      name: "",
    },
  });
  const fields = form.watch();

  const actionWithValidity = formAction.bind(null, {
    product: {
      ...fields,
    },
    wishlistId,
  });

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        action={actionWithValidity}
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
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
          <Link href={`/wishlist/${wishlistId}`} variant="button">
            Back
          </Link>
          <SubmitButton />
        </div>
      </form>
    </Form>
  );
};

export default AddProduct;
