import { z } from "zod";

export const scrapeInputSchema = z.object({
  url: z.string().refine(
    (val) => {
      console.log(val);
      const URLRegex =
        /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/;
      return URLRegex.test(val);
    },
    {
      message: "Please enter a valid URL",
    },
  ),
});

export const scrapeLDJSONSchema = z.object({
  name: z.string().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  brand: z
    .object({
      name: z.string(),
    })
    .optional(),
  offers: z.object({
    price: z.string().optional(),
    priceCurrency: z.string().optional(),
    availability: z.string().optional(),
  }),
});

export const compiledProductDataSchema = z.object({
  name: z.string(),
  images: z.array(z.string()),
  description: z.string(),
  quantity: z.string(),
  brand: z.string(),
  price: z.string(),
  currency: z.string(),
  availability: z.string(),
  url: z.string(),
});

export const partialCompiledProductDataSchema =
  compiledProductDataSchema.partial();
