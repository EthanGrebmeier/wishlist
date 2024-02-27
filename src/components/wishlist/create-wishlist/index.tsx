"use client";

import React, { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWishlist } from "~/app/wishlist/create/actions";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SubmitButton } from "~/components/ui/submit-button";

export const createWishlistInputSchema = z.object({
  wishlistName: z
    .string({
      required_error: "Wishlist name is required",
    })
    .min(2, {
      message: "Wishlist name is required",
    }),
});

const CreateWishlistForm = () => {
  const [response, formAction] = useFormState(createWishlist, null);
  const form = useForm<z.infer<typeof createWishlistInputSchema>>({
    resolver: zodResolver(createWishlistInputSchema),
  });
  const fields = form.watch();

  const actionWithValidity = formAction.bind(null, {
    ...fields,
  });

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={() => form.trigger()}
          action={actionWithValidity}
          className="w-[400px] space-y-4"
        >
          <FormField
            name="wishlistName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wishlist Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Button asChild variant="outline" className="space-x-2">
              <Link href="/wishlist">
                <ArrowLeft width={20} height={20} /> <span> Back </span>
              </Link>
            </Button>
            <SubmitButton />
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateWishlistForm;
