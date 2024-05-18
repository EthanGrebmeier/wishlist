"use server";

import { load } from "cheerio";
import { z } from "zod";
import { makeProtectedAction } from "~/lib/actions/protectedAction";
import { getMatchingScraper } from "~/lib/scrape/site-specs";

export const scrapeProductData = makeProtectedAction(
  z.object({
    pageToScrape: z.string(),
  }),
  async ({ pageToScrape }) => {
    try {
      // check for https for safety!
      if (!pageToScrape?.includes("https://")) {
        return new Response("Sorry, missing https", {
          status: 500,
        });
      }

      console.log("Fetching");

      // launch a new headless browser with dev / prod options

      const content = await fetch(pageToScrape);

      console.log("Loading into cheerio");

      const contentText = await content.text();
      console.log(contentText);
      const $ = load(contentText);

      // const matchingScraper = getMatchingScraper(pageToScrape);

      // if (matchingScraper) {
      //   return matchingScraper($);
      // }

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

      if (!ogTitle) {
        console.log("searching for title");
        const h1Title = $("h1");
        responseBody.name = h1Title.text();
      }

      console.log("Get images");

      const productImages = [
        ...new Set(
          $('[class*="image"][class*="prod"]')
            .map(() => $(this).find("img").prop("src"))
            .toArray(),
        ),
      ];

      responseBody.images = [...responseBody.images, ...productImages];

      console.log("Get price");

      const priceElement = $('[class*="price"][class*="prod"]')
        .map(() => $(this).text())
        .toArray()
        .find((text) => text.includes("$"));

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
    }
  },
);
