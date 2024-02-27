import { z } from "zod";

export const productInputSchema = z.object({
  name: z.string().min(1, {
    message: "Product Name is required",
  }),
  image: z.string().min(1).optional(),
  price: z.string().min(1).optional(),
  quantity: z.string().min(1).optional(),
  url: z.string().min(1).optional(),
});

export const productSchema = productInputSchema.extend({
  id: z.string(),
  wishlistId: z.string(),
});
