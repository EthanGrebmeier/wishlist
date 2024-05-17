import { scrapeAmazon } from "./amazon";

export const getMatchingScraper = (pageToScrape: string) => {
  if (pageToScrape.includes("amazon.com")) {
    return scrapeAmazon;
  }
};
