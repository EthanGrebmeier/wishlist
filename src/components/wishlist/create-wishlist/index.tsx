"use client";

import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { ArrowLeft, PlusIcon } from "lucide-react";
import { SubmitButton } from "~/components/ui/submit-button";
import { createWishlist } from "~/app/wishlist/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";

export const createWishlistInputSchema = z.object({
  wishlistName: z
    .string({
      required_error: "Wishlist name is required",
    })
    .min(2, {
      message: "Wishlist name is required",
    }),
});

type CreateWishlistFormProps = {
  onSuccess?: () => void;
};

const CreateWishlistForm = ({ onSuccess }: CreateWishlistFormProps) => {
  const [response, formAction] = useFormState(createWishlist, null);
  const form = useForm<z.infer<typeof createWishlistInputSchema>>({
    resolver: zodResolver(createWishlistInputSchema),
  });
  const fields = form.watch();

  const actionWithValidity = formAction.bind(null, {
    ...fields,
  });

  useEffect(() => {
    if (response?.message === "success" && onSuccess) {
      onSuccess();
    }
  }, [response, onSuccess]);

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
          <SubmitButton />
        </form>
      </Form>
    </>
  );
};

const CreateWishlist = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" icon={<PlusIcon width="20" height="20" />}>
          Create Wishlist
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h1 className="text-2xl font-medium">Create Wishlist </h1>
          <CreateWishlistForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWishlist;
