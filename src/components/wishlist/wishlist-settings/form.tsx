import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  LoaderCircleIcon,
  PaletteIcon,
  SaveIcon,
  SquarePenIcon,
  EyeOffIcon,
  ImageIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Form, FormField } from "~/components/ui/form";
import { updateWishlist } from "~/server/actions/wishlist";
import {
  HorizontalInputWrapper,
  HorizontalTextInput,
} from "~/components/wishlist/wishlist/add-product/form/product-input";
import { Switch } from "~/components/ui/switch";
import StatusButton from "~/components/ui/status-button";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import DatePicker from "../create-wishlist/date-picker";
import ColorPicker from "../create-wishlist/color-picker";
import { wishlistSettingsSchema } from "~/schema/wishlist/wishlist";
import { HookActionStatus } from "next-safe-action/hooks";
import { useAtom } from "jotai";
import { wishlistToEditAtom } from "~/store/wishlist-settings";
import { format } from "date-fns";

type WishlistSettingsFormFrame = "form" | "color" | "date";

const WishlistSettingsForm = () => {
  const [frame, setFrame] = useState<WishlistSettingsFormFrame>("form");
  const { form, handleSubmit } = useWishlistSettingsForm();

  if (frame === "date") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2">
        <DatePicker
          date={form.getValues("date")}
          setDate={(date) => {
            console.log(date);
            form.setValue("date", date);
          }}
        />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form className="flex h-full flex-col gap-2" onSubmit={handleSubmit}>
        <FormField
          name="wishlistName"
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

        <FormField
          name="imageUrl"
          render={({ field }) => (
            <HorizontalInputWrapper
              Icon={ImageIcon}
              label="Image URL"
              input={
                <HorizontalTextInput
                  placeholder="https://example.com/image.jpg"
                  {...field}
                />
              }
            />
          )}
        />

        <HorizontalInputWrapper
          Icon={CalendarIcon}
          label="Due Date"
          input={(() => {
            const date = form.getValues("date");
            return (
              <button onClick={() => setFrame("date")}>
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
              label="Theme Color"
              input={
                <ColorPicker
                  selectedColor={field.value}
                  setSelectedColor={(color) => field.onChange(color)}
                />
              }
            />
          )}
        />

        <FormField
          name="isSecret"
          render={({ field }) => (
            <HorizontalInputWrapper
              Icon={EyeOffIcon}
              label="Secret Wishlist"
              input={
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              }
            />
          )}
        />
      </form>
    </Form>
  );
};

export const WishlistSettingsFooter = () => {
  const { handleSubmit, status } = useWishlistSettingsForm();

  return (
    <div className="flex w-full justify-end">
      <StatusButton
        onClick={handleSubmit}
        status={status}
        content={{
          text: "Save Changes",
          Icon: SaveIcon,
        }}
        loadingContent={{
          text: "Saving...",
          Icon: LoaderCircleIcon,
          shouldSpin: true,
        }}
        hasSucceededContent={{
          text: "Saved!",
          Icon: SaveIcon,
        }}
      />
    </div>
  );
};

type WishlistSettingsFormContextType = {
  form: UseFormReturn<z.infer<typeof wishlistSettingsSchema>>;
  formError: string;
  setFormError: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  status: HookActionStatus;
};

const WishlistSettingsFormContext =
  createContext<WishlistSettingsFormContextType | null>(null);

type WishlistSettingsFormProviderProps = {
  children: React.ReactNode;
  initialValues?: z.infer<typeof wishlistSettingsSchema>;
};

export const WishlistSettingsFormProvider = ({
  children,
  initialValues,
}: WishlistSettingsFormProviderProps) => {
  const [formError, setFormError] = useState("");
  const router = useRouter();
  const [wishlistToEdit, setWishlistToEdit] = useAtom(wishlistToEditAtom);

  const { form, handleSubmitWithAction, action, resetFormAndAction } =
    useHookFormAction(updateWishlist, zodResolver(wishlistSettingsSchema), {
      formProps: {
        mode: "onSubmit",
        defaultValues: {
          wishlistName:
            wishlistToEdit?.wishlistName ?? initialValues?.wishlistName ?? "",
          imageUrl: wishlistToEdit?.imageUrl ?? initialValues?.imageUrl ?? "",
          date: wishlistToEdit?.date ?? initialValues?.date ?? new Date(),
          color: wishlistToEdit?.color ?? initialValues?.color ?? "white",
          isSecret:
            wishlistToEdit?.isSecret ?? initialValues?.isSecret ?? false,
        },
      },
      actionProps: {
        onError: (error) => {
          setFormError("Error updating wishlist");
        },
        onSuccess: () => {
          router.refresh();
        },
      },
    });

  useEffect(() => {
    return () => {
      resetFormAndAction();
    };
  }, []);

  return (
    <WishlistSettingsFormContext.Provider
      value={{
        form,
        handleSubmit: handleSubmitWithAction,
        formError,
        setFormError,
        status: action.status,
      }}
    >
      {children}
    </WishlistSettingsFormContext.Provider>
  );
};

export const useWishlistSettingsForm = () => {
  const context = useContext(WishlistSettingsFormContext);
  if (!context) {
    throw new Error(
      "useWishlistSettingsForm must be used within a WishlistSettingsFormProvider",
    );
  }
  return context;
};

export default WishlistSettingsForm;
