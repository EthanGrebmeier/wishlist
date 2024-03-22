import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { z } from "zod";
import { colors } from "~/consts/colors";
import type { colorSchema } from "~/schema/wishlist/wishlist";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBackgroundColor(color: z.infer<typeof colorSchema>) {
  return (
    colors.find((themeColor) => themeColor.name === color)?.background ??
    colors[0]?.background
  );
}
