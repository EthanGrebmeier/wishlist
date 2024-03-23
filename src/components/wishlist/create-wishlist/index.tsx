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

import { FilePlus, PlusIcon } from "lucide-react";
import { SubmitButton } from "~/components/ui/submit-button";
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
import type { colorSchema } from "~/schema/wishlist/wishlist";
import { createWishlist, updateWishlist } from "~/server/actions/wishlist";

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
  values?: WishlistFormValues;
};

interface WishlistFormValues {
  wishlistId: string;
  wishlistName: string;
  date: Date | null;
  color: z.infer<typeof colorSchema>;
}

export const CreateWishlistForm = ({
  onSuccess,
  values,
}: CreateWishlistFormProps) => {
  const { execute: executeCreate } = useAction(createWishlist, { onSuccess });
  const { execute: executeUpdate } = useAction(updateWishlist, { onSuccess });
  const [date, setDate] = React.useState<Date | undefined>(
    values?.date ?? undefined,
  );
  const [selectedColor, setSelectedColor] = React.useState<
    z.infer<typeof colorSchema>
  >(values?.color ?? "white");
  const form = useForm<z.infer<typeof createWishlistInputSchema>>({
    resolver: zodResolver(createWishlistInputSchema),
    defaultValues: {
      wishlistName: values?.wishlistName ?? "",
    },
  });

  const method = values ? "UPDATE" : "CREATE";

  const fields = form.watch();

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={() => form.trigger()}
          action={() =>
            method === "CREATE"
              ? executeCreate({ ...fields, date, color: selectedColor })
              : executeUpdate({
                  ...fields,
                  date,
                  color: selectedColor,
                  id: values?.wishlistId ?? "",
                })
          }
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
            <div className="flex flex-col gap-2 text-lg font-medium">
              <label htmlFor="date-picker">Due Date </label>
              <DatePicker date={date} setDate={setDate} />
            </div>
          </div>
          <ColorPicker
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
          <div className="absolute bottom-1 right-0 flex justify-end">
            <SubmitButton icon={<FilePlus size={20} />} />
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
        </DialogHeader>
        <CreateWishlistForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateWishlist;
