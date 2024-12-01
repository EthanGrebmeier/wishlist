import { z } from "zod";

export const colorSchema = z.union([
  z.literal("red"),
  z.literal("yellow"),
  z.literal("green"),
  z.literal("blue"),
  z.literal("orange"),
  z.literal("pink"),
  z.literal("white"),
  z.literal("lavender"),
]);

export const privacyTypeSchema = z.union([
  z.literal("private"),
  z.literal("public"),
  z.literal("link"), // TODO: Support link sharing
]);
export const shareWishlistInputSchema = z.object({
  wishlistId: z.string(),
  sharedWithUserId: z.string(),
});

export const shareWishlistEmailInputSchema = z.object({
  email: z.string(),
});

export const wishlistSettingsSchema = z.object({
  wishlistName: z.string().min(1, { message: "Name is required" }),
  imageUrl: z.string().optional(),
  id: z.string().optional(),
  createdById: z.string(),
  date: z.date().optional(),
  color: colorSchema,
  isSecret: z.boolean(),
});
