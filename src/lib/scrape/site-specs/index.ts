import { scrapeAmazon } from "./amazon";
import { scrapeTarget } from "./target";
import { scrapeWalmart } from "./walmart";

export const getMatchingScraper = (pageToScrape: string) => {
  if (pageToScrape.includes("amazon.com")) {
    return scrapeAmazon;
  }
  if (pageToScrape.includes("target.com")) {
    return scrapeTarget;
  }
  if (pageToScrape.includes("walmart.com")) {
    return scrapeWalmart;
  }
};
