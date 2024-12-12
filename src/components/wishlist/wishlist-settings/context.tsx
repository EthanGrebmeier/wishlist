import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import type { HookActionStatus } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import {
  useState,
  useEffect,
  useContext,
  createContext,
  useCallback,
} from "react";
import type { UseFormReturn } from "react-hook-form";

import type { z } from "zod";
import { wishlistSettingsSchema } from "~/schema/wishlist/wishlist";
import { updateWishlist } from "~/server/actions/wishlist";
import {
  isWishlistSettingsOpenAtom,
  wishlistToEditAtom,
} from "~/store/wishlist-settings";

type WishlistSettingsFormContextType = {
  form: UseFormReturn<z.infer<typeof wishlistSettingsSchema>>;
  formError: string;
  setFormError: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  status: HookActionStatus;
  frame: WishlistSettingsFormFrame;
  setFrame: React.Dispatch<React.SetStateAction<WishlistSettingsFormFrame>>;
  isEditing: boolean;
  isOwner: boolean;
  setFormValues: (
    values: Partial<z.infer<typeof wishlistSettingsSchema>>,
  ) => void;
};

const WishlistSettingsFormContext =
  createContext<WishlistSettingsFormContextType | null>(null);

type WishlistSettingsFormProviderProps = {
  children: React.ReactNode;
  initialValues?: z.infer<typeof wishlistSettingsSchema>;
};

type WishlistSettingsFormFrame = "form" | "image" | "date";

export const WishlistSettingsFormProvider = ({
  children,
  initialValues,
}: WishlistSettingsFormProviderProps) => {
  const [frame, setFrame] = useState<WishlistSettingsFormFrame>("form");
  const [formError, setFormError] = useState("");
  const router = useRouter();
  const [wishlistToEdit, setWishlistToEdit] = useAtom(wishlistToEditAtom);
  const queryClient = useQueryClient();

  const session = useSession();

  const isEditing = !!wishlistToEdit;
  const isOwner = wishlistToEdit?.createdById === session.data?.user.id;
  const setIsOpen = useSetAtom(isWishlistSettingsOpenAtom);

  const { form, handleSubmitWithAction, action } = useHookFormAction(
    updateWishlist,
    zodResolver(wishlistSettingsSchema),
    {
      formProps: {
        mode: "onSubmit",
        defaultValues: {
          id: wishlistToEdit?.id ?? undefined,
          createdById: wishlistToEdit?.createdById ?? session.data?.user.id,
          name: wishlistToEdit?.name ?? initialValues?.name ?? "",
          imageUrl: wishlistToEdit?.imageUrl ?? initialValues?.imageUrl ?? "",
          dueDate:
            wishlistToEdit?.dueDate ?? initialValues?.dueDate ?? undefined,
          color: wishlistToEdit?.color ?? initialValues?.color ?? "white",
          isSecret:
            wishlistToEdit?.isSecret ?? initialValues?.isSecret ?? false,
        },
      },
      actionProps: {
        onError: (error) => {
          console.log(error);
          setFormError("Error updating wishlist");
        },
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ["wishlists"] });
          setTimeout(() => {
            setIsOpen(false);
            router.refresh();
          }, 600);
        },
      },
    },
  );

  const setFormValues = useCallback(
    (values: Partial<z.infer<typeof wishlistSettingsSchema>>) => {
      Object.entries(values).forEach(([key, value]) => {
        form.setValue(
          key as keyof z.infer<typeof wishlistSettingsSchema>,
          value,
          {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          },
        );
      });
    },
    [form],
  );

  return (
    <WishlistSettingsFormContext.Provider
      value={{
        form,
        handleSubmit: handleSubmitWithAction,
        formError,
        setFormError,
        status: action.status,
        frame,
        setFrame,
        isEditing,
        isOwner,
        setFormValues,
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
