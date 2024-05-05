import type { Dispatch, SetStateAction } from "react";
import type { z } from "zod";
import { colors } from "~/consts/colors";
import { cn } from "~/lib/utils";
import type { colorSchema } from "~/schema/wishlist/wishlist";
import { motion } from "framer-motion";

type ColorPickerProps = {
  selectedColor: z.infer<typeof colorSchema>;
  setSelectedColor: Dispatch<SetStateAction<z.infer<typeof colorSchema>>>;
};

const ColorPicker = ({ selectedColor, setSelectedColor }: ColorPickerProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-medium" htmlFor="color">
        Color
      </label>
      <ul id="color" className="grid w-full grid-cols-3 gap-1 ">
        {colors.map((color) => (
          <li
            key={color.name}
            className="group flex aspect-square w-full items-center justify-center"
          >
            <button
              onClick={() => setSelectedColor(color.name)}
              type="button"
              className={cn(
                color.background,
                "aspect-square w-12 rounded-full border border-slate-800 transition-[transform] hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                selectedColor === color.name && "scale-125 border-2",
              )}
            >
              {" "}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorPicker;
