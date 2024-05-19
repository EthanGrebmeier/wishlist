import type { CheerioAPI } from "cheerio";
import { scrapeLDJSONSchema } from "~/schema/wishlist/scrape";

export const getJSONld = ($: CheerioAPI) => {
  const jsonLDText = $('script [type="application/ld+json"]').text();

  try {
    const parsedJsonLD = scrapeLDJSONSchema.parse(JSON.parse(jsonLDText));
    const images = parsedJsonLD.image ? [parsedJsonLD.image] : [];
    return {
      name: parsedJsonLD.name,
      description: parsedJsonLD.description,
      images,
      price: parsedJsonLD.offers.price,
      brand: parsedJsonLD.brand?.name,
    };
  } catch (e) {
    console.log("error parsing json", e);
    throw e;
  }
};
