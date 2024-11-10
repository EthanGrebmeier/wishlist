"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ClipboardPaste, Sparkles } from "lucide-react";
import { type HookActionStatus, useAction } from "next-safe-action/hooks";
import {
  createContext,
  forwardRef,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import type { z } from "zod";
import { Button } from "~/components/ui/button";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Tooltip } from "~/components/ui/tooltip";
import { scrapeInputSchema } from "~/schema/wishlist/scrape";
import { scrapeProductData } from "~/server/actions/scrape";
import { ProductInputFrame, useProductForm } from "./form";
import InputButton from "~/components/ui/input-button";

const ScrapeInput = forwardRef<HTMLFormElement>(({}, ref) => {
  const { form, execute, formError } = useAutofillState();

  return (
    <Form {...form}>
      <form
        ref={ref}
        className="space-y-8"
        action={execute}
        onSubmit={() => form.trigger()}
      >
        <FormField
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Link</FormLabel>
              <FormControl>
                <InputButton
                  button={{
                    children: "Paste",
                    icon: <ClipboardPaste size={15} />,
                    tooltip: "Paste Copied URL",
                    onClick: () => {
                      void (async () => {
                        form.setValue(
                          "url",
                          await navigator.clipboard.readText(),
                        );
                      })();
                    },
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              {formError && <p className="text-sm text-red-400">{formError}</p>}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
});

ScrapeInput.displayName = "ScrapeInput";

const Autofill = forwardRef<HTMLFormElement>((props, ref) => {
  return (
    <div className="flex flex-col ">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-serif text-xl font-medium">Autofill</h3>
          <p className="text-sm tracking-tight">
            {" "}
            Input a link to a product to autofill information
          </p>
        </div>
        <ColoredIconWrapper className="bg-purple-300">
          <Sparkles size={30} />
        </ColoredIconWrapper>
      </div>
      <ScrapeInput ref={ref} {...props} />
    </div>
  );
});

Autofill.displayName = "Autofill";

type AutofillFooterProps = {
  setFrame: Dispatch<SetStateAction<ProductInputFrame>>;
  handleSubmit: () => void;
};

export const AutofillFooter = ({
  setFrame,
  handleSubmit,
}: AutofillFooterProps) => {
  const { status } = useAutofillState();
  // Todo: ensure this works after we upgrade to safe action v7
  return (
    <div className="flex w-full items-center justify-between">
      <Button onClick={() => setFrame("form")}>Back</Button>
      <Button
        variant={"secondary"}
        onClick={handleSubmit}
        icon={<Sparkles size={15} />}
      >
        {status === "executing" ? "Submitting..." : "Autofill"}
      </Button>
    </div>
  );
};

type AutofillContextType = {
  formError: string;
  setFormError: Dispatch<SetStateAction<string>>;
  form: UseFormReturn<z.infer<typeof scrapeInputSchema>>;
  execute: (arg0: unknown) => void;
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
  const { setFormValues, setFrame } = useProductForm();
  const [formError, setFormError] = useState("");

  const form = useForm<z.infer<typeof scrapeInputSchema>>({
    resolver: zodResolver(scrapeInputSchema),
    defaultValues: {
      url: "",
    },
  });

  const input = form.watch();

  const actionWithData = scrapeProductData.bind(null, {
    pageToScrape: input.url,
  });

  const { execute, result, status } = useAction(actionWithData, {
    onSuccess: (data) => {
      setFormValues(data);
      setFrame("form");
      if (onSuccess) {
        onSuccess();
      }
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

const useAutofillState = () => {
  const context = useContext(AutofillContext);
  if (!context) {
    throw new Error("useAutofillState must be used within a AutofillProvider");
  }
  return context;
};

export default Autofill;
