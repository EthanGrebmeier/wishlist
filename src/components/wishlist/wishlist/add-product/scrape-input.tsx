"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsRight, ClipboardPaste, Sparkles } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
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
import { SubmitButton } from "~/components/ui/submit-button";
import { Tooltip } from "~/components/ui/tooltip";
import {
  scrapeInputSchema,
  type partialCompiledProductDataSchema,
} from "~/schema/wishlist/scrape";
import { scrapeProductData } from "~/server/actions/scrape";

type ScrapeInputProps = {
  setFrame: Dispatch<SetStateAction<"scrape" | "form">>;
  setScrapedData: Dispatch<
    SetStateAction<z.infer<typeof partialCompiledProductDataSchema> | undefined>
  >;
  onStatusChange: () => void;
};

const ScrapeInput = ({
  setFrame,
  setScrapedData,
  onStatusChange,
}: ScrapeInputProps) => {
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

  const { execute, result } = useAction(actionWithData, {
    onSettled: onStatusChange,
  });

  useEffect(() => {
    if (result.data) {
      setScrapedData(result.data);
      setFrame("form");
    }
  }, [result, setScrapedData, setFrame]);

  return (
    <Form {...form}>
      <form
        className="space-y-8 pb-10 md:pb-16"
        action={execute}
        onSubmit={() => form.trigger()}
      >
        <FormField
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Link</FormLabel>
              <FormControl>
                <div className="relative flex gap-2">
                  <Input type="text" {...field} />
                  <Tooltip text="Paste Copied URL">
                    <Button
                      onClick={async () => {
                        form.setValue(
                          "url",
                          await navigator.clipboard.readText(),
                        );
                      }}
                      className="-mt-1"
                      variant="secondary"
                      type="button"
                    >
                      {" "}
                      <ClipboardPaste size={20} />{" "}
                    </Button>
                  </Tooltip>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 pb-4 md:py-4">
          <Button
            onClick={() => setFrame("form")}
            icon={<ChevronsRight size={20} />}
            variant="secondary"
            type="button"
          >
            Skip
          </Button>
          <SubmitButton icon={<Sparkles width={20} height={20} />}>
            Autofill
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};

export default ScrapeInput;
