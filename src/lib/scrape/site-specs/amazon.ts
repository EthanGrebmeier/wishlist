import type { CheerioAPI } from "cheerio";

export const scrapeAmazon = ($: CheerioAPI) => {
  const priceWhole = $(".a-price-whole").first().text();
  const priceFraction = $(".a-price-fraction").first().text();
  const image = $("#landingImage").attr("src");

  return {
    name: $("#productTitle").text().trim(),
    description: $("#feature-bullets").text().trim(),
    images: image ? [image] : [],
    price: `${priceWhole}${priceFraction}`,
    brand: $("#bylineInfo").text().replace("Brand:", ""),
  };
};
