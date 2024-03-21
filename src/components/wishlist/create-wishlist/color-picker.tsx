import { useState } from "react";
import { cn } from "~/lib/utils";

const colors = [
  {
    name: "red",
    className: "bg-red-500",
  },
  {
    name: "blue",
    className: "bg-blue-300",
  },
  {
    name: "green",
    className: "bg-green-300",
  },
  {
    name: "yellow",
    className: "bg-yellow-300",
  },
  {
    name: "orange",
    className: "bg-orange-300",
  },
  {
    name: "pink",
    className: "bg-pink-200",
  },
  {
    name: "white",
    className: "bg-white",
  },
];

const ColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState("");

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
                color.className,
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
