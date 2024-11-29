"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ClipboardPaste,
  LoaderCircleIcon,
  Sparkles,
  SparklesIcon,
} from "lucide-react";
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
import { scrapeInputSchema } from "~/schema/wishlist/scrape";
import { scrapeProductData } from "~/server/actions/scrape";
import { type ProductInputFrame, useProductForm } from "./form";
import InputButton from "~/components/ui/input-button";
import StatusButton from "~/components/ui/status-button";
import { useProductSheetNavigation } from ".";
import { useAutofillForm } from "./autofill-context";

const ScrapeInput = forwardRef<HTMLFormElement>(({}, ref) => {
  const { form, execute, formError } = useAutofillForm();

  return (
    <Form {...form}>
      <form
        ref={ref}
        className="space-y-8 "
        action={() => execute({ pageToScrape: form.getValues().url })}
        onSubmit={async () => {
          await form.trigger();
        }}
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

              <div className="flex min-h-5 items-center">
                <FormMessage />
                {formError && (
                  <p className="text-sm text-red-400">{formError}</p>
                )}
              </div>
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
          <p className="text-sm tracking-tight">
            Some websites may not be supported
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
  const { status } = useAutofillForm();
  // Todo: ensure this works after we upgrade to safe action v7
  return (
    <div className="flex w-full items-center justify-between">
      <Button onClick={() => setFrame("form")}>Back</Button>
      <StatusButton
        className="w-32"
        status={status}
        variant={"secondary"}
        onClick={handleSubmit}
        content={{
          Icon: SparklesIcon,
          text: "Autofill",
        }}
        loadingContent={{
          Icon: LoaderCircleIcon,
          text: "Autofilling...",
          shouldSpin: true,
        }}
        hasSucceededContent={{
          Icon: SparklesIcon,
          text: "Success!",
        }}
      />
    </div>
  );
};
export default Autofill;
