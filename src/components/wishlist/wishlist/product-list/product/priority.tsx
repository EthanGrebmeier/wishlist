import { ChevronsDown, ChevronsUp } from "lucide-react";
import React from "react";
import type { z } from "zod";
import { cn } from "~/lib/utils";
import type { productPrioritySchema } from "~/schema/wishlist/product";

type PriorityProps = {
  priorityLevel: z.infer<typeof productPrioritySchema>;
  className?: string;
};

const priorityIcons = {
  high: <ChevronsUp size={15} />,
  low: <ChevronsDown size={15} />,
};

const Priority = ({ priorityLevel, className }: PriorityProps) => {
  if (priorityLevel === "normal") {
    return null;
  }

  return (
    <div
      className={cn(
        "flex w-fit items-center gap-2 overflow-hidden rounded-md border-2 border-black px-1 py-[2px] text-sm capitalize ",
        priorityLevel === "high" ? "bg-yellow-400" : "bg-red-300",
        className,
      )}
    >
      {priorityIcons[priorityLevel]}
      <p className="-mb-[1px]">{priorityLevel} Priority</p>
    </div>
  );
};

export default Priority;
