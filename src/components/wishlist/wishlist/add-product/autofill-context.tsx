import { zodResolver } from "@hookform/resolvers/zod";
import { HookActionStatus, useAction } from "next-safe-action/hooks";
import {
  Dispatch,
  SetStateAction,
  useState,
  useContext,
  createContext,
} from "react";
import { UseFormReturn, useForm } from "react-hook-form";

import { z } from "zod";
import { scrapeInputSchema } from "~/schema/wishlist/scrape";
import { scrapeProductData } from "~/server/actions/scrape";
import { useProductSheetNavigation } from ".";
import { useProductForm } from "./form";

type AutofillContextType = {
  formError: string;
  setFormError: Dispatch<SetStateAction<string>>;
  form: UseFormReturn<z.infer<typeof scrapeInputSchema>>;
  execute: (formData: { pageToScrape: string }) => void;
  status: HookActionStatus;
};

const AutofillContext = createContext<AutofillContextType | null>(null);

type AutofillProviderProps = {
  children: React.ReactNode;
  onSuccess?: () => void;
};

export const AutofillProvider = ({
  children,
  onSuccess,
}: AutofillProviderProps) => {
  const { setFrame } = useProductSheetNavigation();
  const { setFormValues, form: productForm } = useProductForm();
  const [formError, setFormError] = useState("");

  const form = useForm<z.infer<typeof scrapeInputSchema>>({
    resolver: zodResolver(scrapeInputSchema),
    defaultValues: {
      url: "",
    },
  });

  const { execute, result, status, reset } = useAction(scrapeProductData, {
    onSuccess: ({ data }) => {
      setFormValues({
        description: data?.description ?? "",
        quantity: "1",
        brand: "",
        name: data?.name ?? "",
        price: data?.price ?? "",
        url: data?.url ?? "",
        imageUrl: data?.images?.[0] ?? "",
        priority: "normal",
        wishlistId: productForm.getValues().wishlistId,
      });
      setFrame("form");
      form.reset();
      if (onSuccess) {
        onSuccess();
      }

      reset();
    },
  });

  return (
    <AutofillContext.Provider
      value={{
        formError,
        setFormError,
        form,
        execute,
        status,
      }}
    >
      {children}
    </AutofillContext.Provider>
  );
};

export const useAutofillForm = () => {
  const context = useContext(AutofillContext);
  if (!context) {
    throw new Error("useAutofillState must be used within a AutofillProvider");
  }
  return context;
};
