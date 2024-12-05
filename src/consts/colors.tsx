import type { z } from "zod";
import type { colorSchema } from "~/schema/wishlist/wishlist";

type Color = {
  name: z.infer<typeof colorSchema>;
  background: string;
  hex: string;
};

export const colors: Color[] = [
  {
    name: "white",
    background: "bg-white",
    hex: "#ffffff",
  },
  {
    name: "red",
    background: "bg-red-500",
    hex: "#ff0000",
  },
  {
    name: "blue",
    background: "bg-blue-300",
    hex: "#0000ff",
  },
  {
    name: "green",
    background: "bg-green-300",
    hex: "#00ff00",
  },
  {
    name: "lavender",
    background: "bg-purple-200",
    hex: "#800080",
  },
  {
    name: "yellow",
    background: "bg-yellow-300",
    hex: "#ffff00",
  },
  {
    name: "orange",
    background: "bg-orange-300",
    hex: "#ffa500",
  },
  {
    name: "pink",
    background: "bg-pink-200",
    hex: "#ffc0cb",
  },
];
