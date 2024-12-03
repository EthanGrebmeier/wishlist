import { useState, type Dispatch, type SetStateAction } from "react";
import type { z } from "zod";
import { colors } from "~/consts/colors";
import { cn } from "~/lib/utils";
import type { colorSchema } from "~/schema/wishlist/wishlist";
import { color, motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { XIcon } from "lucide-react";

type ColorPickerProps = {
  selectedColor: z.infer<typeof colorSchema>;
  setSelectedColor: (color: z.infer<typeof colorSchema>) => void;
};

const ColorPicker = ({ selectedColor, setSelectedColor }: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedColorObj = colors.find((color) => color.name === selectedColor);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center gap-2 px-1 capitalize"
        >
          <div
            className={cn(
              "size-5 rounded-full border-2 border-black",
              selectedColorObj?.background,
            )}
          ></div>
          {selectedColorObj?.name}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-44">
        <ul
          id="color"
          className="flex flex-wrap items-center justify-center gap-2"
        >
          <li>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              type="button"
              className="flex size-9 items-center justify-center rounded-full border-2 border-black"
            >
              <XIcon className="size-4" />
            </button>
          </li>
          {colors.map((color, index) => (
            <motion.li
              key={color.name}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5 }}
              transition={{
                duration: 0.24,
                delay: index * 0.05,
                type: "spring",
                bounce: 0.4,
              }}
              className="group flex aspect-square w-9 items-center justify-center"
            >
              <button
                onClick={() => {
                  setSelectedColor(color.name);
                  setIsOpen(false);
                }}
                type="button"
                className={cn(
                  color.background,
                  "aspect-square w-full rounded-full border border-slate-800 transition-[transform] hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  selectedColor === color.name && "scale-125 border-2",
                )}
              >
                {" "}
              </button>
            </motion.li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
