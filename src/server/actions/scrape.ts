"use server";

import { load } from "cheerio";
import { z } from "zod";
import { protectedAction } from "~/lib/actions/protectedAction";
import { getMatchingScraper } from "~/lib/scrape/site-specs";

export const scrapeProductData = protectedAction
  .schema(
    z.object({
      pageToScrape: z.string(),
    }),
  )
  .action(async ({ parsedInput: { pageToScrape } }) => {
    try {
      // check for https for safety!
      if (!pageToScrape?.includes("https://")) {
        throw new Error("Missing https");
      }

      console.log("Fetching");

      // launch a new headless browser with dev / prod options

      const content = await fetch(pageToScrape, {
        cache: "no-store",
      });

      console.log("Loading into cheerio");

      const contentText = await content.text();
      const $ = load(contentText);

      const matchingScraper = getMatchingScraper(pageToScrape);

      if (matchingScraper) {
        const scrapedData = matchingScraper($);

        return {
          ...scrapedData,
          url: pageToScrape,
        };
      }

      // Get og content
      const getMetaTagContent = async (field: string) => {
        const metaTag = $(`meta[property="${field}"]`);
        return metaTag.prop("content");
      };

      console.log("Searching");

      const responseBody = {
        url: pageToScrape,
        name: "",
        description: "",
        images: [] as string[],
        brand: "",
        price: "",
      };

      const ogTitleQuery = getMetaTagContent("og:title");
      const ogDescriptionQuery = getMetaTagContent("og:description");
      const ogImageQuery = getMetaTagContent("og:image");
      const ogSiteNameQuery = getMetaTagContent("og:site_name");
      const ogBrandQuery = getMetaTagContent("og:brand");

      const [ogTitle, ogDescription, ogImage, ogSiteName, ogBrand] =
        await Promise.all([
          ogTitleQuery,
          ogDescriptionQuery,
          ogImageQuery,
          ogSiteNameQuery,
          ogBrandQuery,
        ]);

      console.log("After get meta");

      if (ogTitle) {
        responseBody.name = ogTitle;
      }
      if (ogDescription) {
        responseBody.description = ogDescription;
      }
      if (ogImage) {
        responseBody.images.push(ogImage);
      }
      if (ogSiteName) {
        responseBody.brand = ogSiteName;
      }
      if (ogBrand) {
        responseBody.brand = ogBrand;
      }

      if (!responseBody.name) {
        const h1Title = $("h1");
        responseBody.name = h1Title.text();
      }

      if (!responseBody.name) {
        const title = $("title");
        responseBody.name = title.text();
      }

      const productImages = [
        ...new Set(
          $('[class*="image"][class*="prod"]')
            .map(() => $(this).find("img").prop("src"))
            .toArray(),
        ),
      ];

      responseBody.images = [...responseBody.images, ...productImages];

      console.log("Get price");

      const priceElements = $('[class*="price"]:not(:has(*))')
        .toArray()
        .map((element) => $(element).text().replace(/\s/g, ""));

      const priceElement = priceElements
        .find((text) =>
          text.match(/(\$[0-9,]+(\.[0-9]{2})?)/)?.[0]?.replace("$", ""),
        )
        ?.match(/(\$[0-9,]+(\.[0-9]{2})?)/)?.[0]
        ?.replace("$", "");

      if (priceElement) {
        responseBody.price = priceElement;
      }

      console.log("Returning", {
        status: 200,
        body: JSON.stringify(responseBody),
      });

      return responseBody;
    } catch (e) {
      console.log("Error", e);
      throw e;
    }
  });
