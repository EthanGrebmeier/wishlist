import type { CheerioAPI } from "cheerio";
import { getJSONld } from "../getJSONld";

export const scrapeWalmart = ($: CheerioAPI) => {
  return getJSONld($);
};
