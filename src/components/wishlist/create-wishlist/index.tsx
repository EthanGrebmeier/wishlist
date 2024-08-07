"use client";

import React, { type ReactNode, useState } from "react";
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

import { FilePlus, Lock, PlusIcon, Unlock } from "lucide-react";
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
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Switch } from "~/components/ui/switch";
import ImageUpload from "../../ui/image-upload";
import DeleteWishlist from "../wishlist/settings/delete-wishlist";
import { parseISO } from "date-fns";

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
  isOwner?: boolean;
};

interface WishlistFormValues {
  wishlistId: string;
  imageUrl: string | null;
  wishlistName: string;
  date: string | null;
  color: z.infer<typeof colorSchema>;
  isSecret: boolean;
}

export const CreateWishlistForm = ({
  onSuccess,
  values,
  isOwner,
}: CreateWishlistFormProps) => {
  const { execute: executeCreate } = useAction(createWishlist, { onSuccess });
  const { execute: executeUpdate } = useAction(updateWishlist, { onSuccess });
  const [uploadedImageURL, setUploadedImageURL] = useState(
    values?.imageUrl ?? undefined,
  );
  const [date, setDate] = React.useState<Date | undefined>(
    values?.date ? new Date(parseISO(values?.date)) ?? undefined : undefined,
  );
  const [isSecret, setIsSecret] = useState(values?.isSecret ?? false);
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
              ? executeCreate({
                  ...fields,
                  date,
                  color: selectedColor,
                  isSecret,
                  imageUrl: uploadedImageURL,
                })
              : executeUpdate({
                  ...fields,
                  date,
                  color: selectedColor,
                  id: values?.wishlistId ?? "",
                  isSecret,
                  imageUrl: uploadedImageURL,
                })
          }
          className="relative w-full space-y-4"
        >
          <div className="grid grid-cols-2 gap-8">
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
            <div className="flex flex-col gap-2 text-lg font-medium">
              <p>Due Date </p>
              <DatePicker date={date} setDate={setDate} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <ImageUpload
              uploadedImageURL={uploadedImageURL}
              setUploadedImageURL={setUploadedImageURL}
            />
            <ColorPicker
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
          </div>

          <div className="mr-2 flex w-full items-center justify-between gap-2 rounded-md border-2 border-black px-4 py-2">
            <div>
              <div className="flex items-center gap-2">
                {" "}
                <p className=" text-lg font-medium"> Keep it a secret? </p>{" "}
                {isSecret ? <Lock size={20} /> : <Unlock size={20} />}
              </div>
              <p className="max-w-[300px] text-balance text-sm leading-tight">
                {" "}
                Enable this if you would like to keep purchased items from being
                spoiled for yourself!
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={isSecret} onCheckedChange={setIsSecret} />
            </div>
          </div>
          {values && isOwner && (
            <DeleteWishlist wishlistId={values.wishlistId} />
          )}
          <div className="flex w-full justify-end">
            <SubmitButton icon={<FilePlus size={20} />}>
              {values ? "Update" : "Create"}
            </SubmitButton>
          </div>
        </form>
      </Form>
    </>
  );
};

type CreateWishlistProps = {
  trigger?: ReactNode;
};

const CreateWishlist = ({ trigger }: CreateWishlistProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {trigger ?? (
            <Button icon={<PlusIcon width="20" height="20" />}>
              <span> Create Wishlist </span>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className=" overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-4xl font-medium">
              Create Wishlist{" "}
            </DialogTitle>
          </DialogHeader>
          <CreateWishlistForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        {trigger ?? (
          <Button icon={<PlusIcon width="20" height="20" />}>
            <span className="sr-only "> Create Wishlist </span>
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent className="mx-auto max-w-[440px]">
        <DrawerHeader>
          <DrawerTitle className="font-serif text-4xl font-medium">
            Create Wishlist
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <CreateWishlistForm />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateWishlist;
