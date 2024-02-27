"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { addProduct } from "~/app/wishlist/[wishlistId]/actions";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";

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
  onSuccess?: () => void;
};

const AddProductForm = ({ wishlistId, onSuccess }: AddProductProps) => {
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

  useEffect(() => {
    if (response?.message === "success" && onSuccess) {
      onSuccess();
    }
  }, [response, onSuccess]);

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
        <SubmitButton />
      </form>
    </Form>
  );
};

type AddProduct = {
  wishlistId: string;
};

export const AddProduct = ({ wishlistId }: AddProduct) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" icon={<PlusIcon width="20" height="20" />}>
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h1 className="text-4xl font-medium">Add Product </h1>
          <AddProductForm
            onSuccess={() => setIsOpen(false)}
            wishlistId={wishlistId}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddProduct;
