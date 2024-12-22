"use client";

import {
  ClipboardPaste,
  LoaderCircleIcon,
  Sparkles,
  SparklesIcon,
} from "lucide-react";
import { forwardRef, type Dispatch, type SetStateAction } from "react";
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
import { type ProductInputFrame } from "./form";
import InputButton from "~/components/ui/input-button";
import StatusButton from "~/components/ui/status-button";
import { useAutofillForm } from "./autofill-context";

const ScrapeInput = forwardRef<HTMLFormElement>(({}, ref) => {
  const { form, execute, formError } = useAutofillForm();

  const handleUrlChange = async (value: string) => {
    form.setValue("url", value);
    try {
      // Basic URL validation
      new URL(value);
      // Let the form state update before submitting
      setTimeout(() => {
        void execute({ pageToScrape: value });
      }, 0);
    } catch {
      // Not a valid URL, just update the form value
    }
  };

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
                        const clipboardText =
                          await navigator.clipboard.readText();
                        void handleUrlChange(clipboardText);
                      })();
                    },
                  }}
                  onPaste={(e) => {
                    const pastedText = e.clipboardData.getData("text");
                    void handleUrlChange(pastedText);
                  }}
                  {...field}
                />
              </FormControl>

              <div className="flex items-center">
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
      <Button variant="tertiary" onClick={() => setFrame("form")}>
        Back
      </Button>
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
