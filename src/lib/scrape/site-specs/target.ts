import type { CheerioAPI } from "cheerio";

export const scrapeTarget = ($: CheerioAPI) => {
  const priceWhole = $('[data-test="product-price"]')
    .first()
    .text()
    .replace("$", "");

  const image = $("img").first().attr("src");

  return {
    name: $("h1").text().trim(),
    description: $('[data-test="item-details-description"]').text().trim(),
    images: image ? [image] : [],
    price: priceWhole,
  };
};
