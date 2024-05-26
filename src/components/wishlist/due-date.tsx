import { formatDate, parseISO } from "date-fns";
import { Calendar } from "lucide-react";
import React from "react";
import { cn, getBackgroundColor } from "~/lib/utils";
import type { Wishlist } from "~/types/wishlist";

type DueDateProps = {
  className?: string;
  wishlist: Wishlist;
};

const DueDate = ({ wishlist, className }: DueDateProps) => {
  if (!wishlist.dueDate) {
    return null;
  }

  return (
    <div
      className={cn(
        " flex items-center gap-2 rounded-md border-2 border-black p-1 font-medium",
        getBackgroundColor(wishlist.color),
        className,
      )}
    >
      <Calendar size={20} />{" "}
      <time className="text-sm">
        {formatDate(parseISO(wishlist.dueDate), "P")}
      </time>
    </div>
  );
};

export default DueDate;
