import type { Dispatch, SetStateAction } from "react";
import type { z } from "zod";
import { colors } from "~/consts/colors";
import { cn } from "~/lib/utils";
import type { colorSchema } from "~/schema/wishlist/wishlist";

type ColorPickerProps = {
  selectedColor: z.infer<typeof colorSchema>;
  setSelectedColor: Dispatch<SetStateAction<z.infer<typeof colorSchema>>>;
};

const ColorPicker = ({ selectedColor, setSelectedColor }: ColorPickerProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium" htmlFor="color">
        Color
      </label>
      <div id="color" className="-ml-2 grid grid-cols-12">
        {colors.map((color) => (
          <div
            key={color.name}
            className="group flex aspect-square h-full w-full items-center justify-center"
          >
            <button
              onClick={() => setSelectedColor(color.name)}
              type="button"
              className={cn(
                color.background,
                "aspect-square w-6 rounded-full border border-slate-800 transition-[width] group-hover:w-full ",
                selectedColor === color.name && "border-2",
              )}
            >
              {" "}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
