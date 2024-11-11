import { z } from "zod";

export const productPrioritySchema = z.union([
  z.literal("high"),
  z.literal("normal"),
  z.literal("low"),
]);

export const productInputSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Product Name is required",
    })
    .max(255),
  description: z.string().max(2000).optional().nullable().default(""),
  brand: z.string().max(255).optional().nullable().default(""),
  imageUrl: z.string().max(255).optional().nullable().default(""),
  price: z.string().max(15).optional().nullable().default(""),
  quantity: z.string().optional().nullable().default(""),
  url: z.string().max(255).optional().nullable().default(""),
  priority: productPrioritySchema.default("normal"),
});

export const productSchema = productInputSchema.extend({
  id: z.string(),
  wishlistId: z.string(),
});
