"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsRight, Sparkles } from "lucide-react";
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
import {
  scrapeInputSchema,
  type partialCompiledProductDataSchema,
} from "~/schema/wishlist/scrape";
import { scrapeProductData } from "~/server/actions/product";

type ScrapeInputProps = {
  setFrame: Dispatch<SetStateAction<"scrape" | "form">>;
  setScrapedData: Dispatch<
    SetStateAction<z.infer<typeof partialCompiledProductDataSchema> | undefined>
  >;
};

const ScrapeInput = ({ setFrame, setScrapedData }: ScrapeInputProps) => {
  const form = useForm<z.infer<typeof scrapeInputSchema>>({
    resolver: zodResolver(scrapeInputSchema),
    defaultValues: {
      url: "",
    },
  });

  const input = form.watch();

  const actionWithData = scrapeProductData.bind(null, {
    url: input.url,
  });

  const { execute, result } = useAction(actionWithData);

  useEffect(() => {
    if (result.data) {
      setScrapedData(result.data);
      setFrame("form");
    }
  }, [result, setScrapedData, setFrame]);

  return (
    <Form {...form}>
      <form
        className="space-y-8 "
        action={execute}
        onSubmit={() => form.trigger()}
      >
        <FormField
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Link</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-8 flex justify-between">
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
