import React, { type ReactNode } from "react";
import { cn } from "~/lib/utils";

type ColoredIconWrapperProps = {
  children: ReactNode;
  className?: string;
};

const ColoredIconWrapper = ({
  children,
  className,
}: ColoredIconWrapperProps) => {
  return (
    <div
      className={cn(
        "h-fit w-fit rounded-md border-2 border-black bg-green-400 p-[1px]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default ColoredIconWrapper;
