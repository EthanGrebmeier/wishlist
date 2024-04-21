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
      <ul id="color" className="grid w-full grid-cols-4 gap-1.5 ">
        {colors.map((color) => (
          <li
            key={color.name}
            className="group flex aspect-square w-full items-center justify-center"
          >
            <motion.button
              onClick={() => setSelectedColor(color.name)}
              type="button"
              whileTap={{
                scale: 1.2,
              }}
              className={cn(
                color.background,
                "aspect-square w-9 rounded-full border border-slate-800 transition-[width] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 group-hover:w-full",
                selectedColor === color.name && "border-2",
              )}
            >
              {" "}
            </motion.button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorPicker;
