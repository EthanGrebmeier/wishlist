"use client";

import React, { useState } from "react";
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

import { PlusIcon } from "lucide-react";
import { SubmitButton } from "~/components/ui/submit-button";
import { createWishlist } from "~/app/wishlist/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import DatePicker from "./date-picker";
import { useAction } from "next-safe-action/hooks";
import ColorPicker from "./color-picker";

const createWishlistInputSchema = z.object({
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
  const { execute } = useAction(createWishlist, { onSuccess });
  const [date, setDate] = React.useState<Date>();
  const form = useForm<z.infer<typeof createWishlistInputSchema>>({
    resolver: zodResolver(createWishlistInputSchema),
  });
  const fields = form.watch();

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={() => form.trigger()}
          action={() => execute({ ...fields, date })}
          className="relative w-full space-y-4"
        >
          <FormField
            name="wishlistName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Wishlist Name<sup>*</sup>
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 text-sm font-medium">
              <label htmlFor="date-picker">Due Date (optional) </label>
              <DatePicker date={date} setDate={setDate} />
            </div>
          </div>
          <ColorPicker />
          <div className="flex justify-end">
            <SubmitButton />
          </div>
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
        <Button icon={<PlusIcon width="20" height="20" />}>
          Create Wishlist
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-serif text-4xl font-medium">
            Create Wishlist{" "}
          </DialogTitle>
          <CreateWishlistForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWishlist;
