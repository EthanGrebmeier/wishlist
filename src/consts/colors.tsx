import type { z } from "zod";
import type { colorSchema } from "~/schema/wishlist/wishlist";

type Color = { name: z.infer<typeof colorSchema>; background: string };

export const colors: Color[] = [
  {
    name: "white",
    background: "bg-white",
  },
  {
    name: "red",
    background: "bg-red-500",
  },
  {
    name: "blue",
    background: "bg-blue-300",
  },
  {
    name: "green",
    background: "bg-green-300",
  },
  {
    name: "lavender",
    background: "bg-purple-200",
  },
  {
    name: "yellow",
    background: "bg-yellow-300",
  },
  {
    name: "orange",
    background: "bg-orange-300",
  },
  {
    name: "pink",
    background: "bg-pink-200",
  },
];
