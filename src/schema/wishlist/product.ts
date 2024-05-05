import { z } from "zod";

export const productInputSchema = z.object({
  name: z.string().min(1, {
    message: "Product Name is required",
  }),
  description: z.string().optional(),
  brand: z.string().optional(),
  imageUrl: z.string().optional(),
  price: z.string().optional(),
  quantity: z.string().optional(),
  url: z.string().optional(),
});

export const productSchema = productInputSchema.extend({
  id: z.string(),
  wishlistId: z.string(),
});
