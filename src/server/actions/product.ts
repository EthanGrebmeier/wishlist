"use server";

import { load } from "cheerio";
import type { z } from "zod";
import { makeSafeAction } from "~/lib/actions/protectedAction";
import {
  compiledProductDataSchema,
  type partialCompiledProductDataSchema,
  scrapeInputSchema,
  scrapeLDJSONSchema,
} from "~/schema/wishlist/scrape";

import parse from "srcset-parse";

type scrapeProductDataArgs = {
  url: string;
};

export const scrapeProductData = makeSafeAction(
  scrapeInputSchema,
  async ({ url }: scrapeProductDataArgs) => {
    const scrapedProductData: z.infer<typeof partialCompiledProductDataSchema> =
      {
        name: undefined,
        description: undefined,
        images: [],
        brand: undefined,
        price: undefined,
        currency: undefined,
        url,
      };
    const result = await fetch(url);

    // Load html content into cheerio
    const $ = load(await result.text());

    // Find ldJSON
    const ldJSONText = $(`script[type="application/ld+json"]`).text();

    try {
      const ldJSON: unknown = JSON.parse(ldJSONText);
      const parsedJson = scrapeLDJSONSchema.safeParse(ldJSON);

      if (parsedJson.success) {
        const data = parsedJson.data;
        scrapedProductData.name = data.name;
        scrapedProductData.description = data.description;
        const ldJsonImage = data.image;
        if (ldJsonImage) {
          scrapedProductData.images?.push(ldJsonImage);
        }
        scrapedProductData.price = data.offers.price;
        scrapedProductData.currency = data.offers.priceCurrency;
        scrapedProductData.brand = data.brand?.name;
      }
    } catch (e) {
      // Error finding ldJson
    }

    return scrapedProductData;
  },
);
