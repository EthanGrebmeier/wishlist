"use client";
import {
  CalendarIcon,
  LoaderCircleIcon,
  PaletteIcon,
  PencilIcon,
  PlusIcon,
  SaveIcon,
  SquarePenIcon,
} from "lucide-react";
import React, { useMemo } from "react";
import { Form, FormField } from "~/components/ui/form";
import {
  HorizontalInputWrapper,
  HorizontalTextInput,
} from "~/components/wishlist/wishlist/add-product/form/product-input";
import { Switch } from "~/components/ui/switch";
import StatusButton from "~/components/ui/status-button";
import ColorPicker from "../create-wishlist/color-picker";
import { useAtomValue } from "jotai";
import { wishlistToEditAtom } from "~/store/wishlist-settings";
import { format, parseISO } from "date-fns";
import { useWishlistSettingsForm } from "./context";
import { Button } from "~/components/ui/button";
import ImageUpload from "~/components/ui/image/upload";
import ImageDisplay from "~/components/ui/image/display";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, Unlock } from "lucide-react";
import DeleteWishlist from "../wishlist/settings/delete-wishlist";
import Calendar from "./calendar";
import { type colorSchema } from "~/schema/wishlist/wishlist";
import { type z } from "zod";

const WishlistSettingsForm = () => {
  const {
    form,
    handleSubmit,
    frame,
    setFrame,
    isEditing,
    isOwner,
    setFormValues,
  } = useWishlistSettingsForm();
  const wishlistToEdit = useAtomValue(wishlistToEditAtom);
  const isSecret = form.watch("isSecret");
  const values = form.getValues();

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {frame === "image" && (
        <motion.div
          key="image-upload"
          initial={{ opacity: 0, x: "100%", filter: "blur(4px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: "100%", filter: "blur(4px)" }}
          transition={{ duration: 0.2 }}
        >
          <ImageUpload
            onImageSelect={(url) => {
              setFormValues({ imageUrl: url });
              setFrame("form");
            }}
            onBack={() => setFrame("form")}
            subtitle="Select an image for your wishlist"
          />
        </motion.div>
      )}
      {frame === "date" && (
        <motion.div
          key="date-picker"
          initial={{ opacity: 0, x: "100%", filter: "blur(4px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: "100%", filter: "blur(4px)" }}
          transition={{ duration: 0.2 }}
        >
          <Calendar />
        </motion.div>
      )}
      {frame === "form" && (
        <motion.div
          key="form"
          initial={{ opacity: 0, x: "-100%", filter: "blur(4px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, x: "-100%", filter: "blur(4px)" }}
          transition={{ duration: 0.2 }}
        >
          <Form {...form}>
            <form
              id="wishlist-settings-form"
              className="flex h-full flex-col gap-2"
              onSubmit={handleSubmit}
            >
              <div className="mb-6 w-full">
                <ImageDisplay
                  imageUrl={values.imageUrl}
                  openImageEditor={() => setFrame("image")}
                  removeImage={() => setFormValues({ imageUrl: undefined })}
                />
              </div>
              <FormField
                name="name"
                render={({ field }) => (
                  <HorizontalInputWrapper
                    required
                    Icon={SquarePenIcon}
                    label="Name"
                    input={
                      <HorizontalTextInput
                        placeholder="Birthday Wishlist"
                        {...field}
                      />
                    }
                  />
                )}
              />

              <HorizontalInputWrapper
                Icon={CalendarIcon}
                label="Date"
                input={(() => {
                  const date = values.dueDate
                    ? parseISO(values.dueDate)
                    : undefined;
                  return (
                    <button
                      type="button"
                      onClick={() => setFrame("date")}
                      className="px-1 font-medium underline"
                    >
                      {date ? format(date, "PPP") : "Pick a date"}
                    </button>
                  );
                })()}
              />

              <FormField
                name="color"
                render={({ field }) => (
                  <HorizontalInputWrapper
                    Icon={PaletteIcon}
                    label="Color"
                    input={
                      <ColorPicker
                        selectedColor={
                          field.value as z.infer<typeof colorSchema>
                        }
                        setSelectedColor={(color) => setFormValues({ color })}
                      />
                    }
                  />
                )}
              />

              <div className="mr-2 mt-6 flex w-full items-center justify-between gap-2 rounded-md border border-black px-4 py-2">
                <div>
                  <div className="flex items-center gap-2">
                    {isSecret ? <Lock size={20} /> : <Unlock size={20} />}
                    <p className=" text-lg font-medium">Keep it a secret</p>
                  </div>
                  <p className="max-w-[300px] text-balance text-sm leading-tight">
                    {" "}
                    Enable this if you would like to keep purchased items from
                    being spoiled for yourself!
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={values.isSecret}
                    onCheckedChange={(value) => {
                      setFormValues({ isSecret: value });
                    }}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="hidden"
                aria-hidden="true"
                tabIndex={-1}
              >
                Submit
              </button>
            </form>
          </Form>
          {isEditing && isOwner && wishlistToEdit?.id && (
            <div className="mt-4 flex w-full ">
              <DeleteWishlist wishlistId={wishlistToEdit.id} />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const WishlistSettingsFooter = () => {
  const { handleSubmit, status, frame, setFrame } = useWishlistSettingsForm();
  const wishlistToEdit = useAtomValue(wishlistToEditAtom);
  const isEditing = !!wishlistToEdit;

  const content = useMemo(() => {
    if (frame === "image" || frame === "date") {
      return (
        <motion.div
          key="subsetting"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex w-full justify-between"
        >
          <Button onClick={() => setFrame("form")}>Back</Button>
        </motion.div>
      );
    }
    return (
      <motion.div
        key="form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="flex w-full justify-end"
      >
        <StatusButton
          onClick={handleSubmit}
          status={status}
          content={{
            text: isEditing ? "Save Changes" : "Create Wishlist",
            Icon: isEditing ? PencilIcon : PlusIcon,
          }}
          loadingContent={{
            text: isEditing ? "Saving..." : "Creating...",
            Icon: LoaderCircleIcon,
            shouldSpin: true,
          }}
          hasSucceededContent={{
            text: isEditing ? "Saved!" : "Created!",
            Icon: SaveIcon,
          }}
        />
      </motion.div>
    );
  }, [frame, handleSubmit, status, isEditing, setFrame]);

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {content}
    </AnimatePresence>
  );
};

export default WishlistSettingsForm;
