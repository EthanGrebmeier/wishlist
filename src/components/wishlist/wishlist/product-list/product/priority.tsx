import { ChevronsDown, ChevronsUp } from "lucide-react";
import React from "react";
import type { z } from "zod";
import { Tooltip } from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import type { productPrioritySchema } from "~/schema/wishlist/product";

type PriorityProps = {
  priorityLevel: z.infer<typeof productPrioritySchema>;
  showText?: boolean;
  className?: string;
};

const priorityIcons = {
  high: <ChevronsUp size={20} />,
  low: <ChevronsDown size={20} />,
};

const Priority = ({
  priorityLevel,
  showText = false,
  className,
}: PriorityProps) => {
  if (priorityLevel === "normal") {
    return null;
  }

  return (
    <Tooltip text={`${priorityLevel} Priority`}>
      <div
        className={cn(
          "flex h-fit w-fit items-center gap-2 overflow-hidden rounded-md border-2 border-black p-1 text-sm font-medium capitalize ",
          priorityLevel === "high" ? "bg-yellow-400" : "bg-red-300",
          className,
        )}
      >
        {priorityIcons[priorityLevel]}
        {showText && <p className="-mb-[1px]">{priorityLevel} Priority</p>}
      </div>
    </Tooltip>
  );
};

export default Priority;
