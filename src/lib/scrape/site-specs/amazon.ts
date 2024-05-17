import type { CheerioAPI } from "cheerio";

export const scrapeAmazon = ($: CheerioAPI) => {
  return {
    title: $(),
    description: $(),
    image: $(),
    price: $(),
    brand: $(),
  };
};
