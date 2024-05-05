import { formatDate } from "date-fns";
import { Calendar } from "lucide-react";
import React from "react";
import { cn, getBackgroundColor } from "~/lib/utils";
import { Wishlist } from "~/types/wishlist";

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
      <p className="text-sm">{formatDate(wishlist.dueDate, "P")}</p>
    </div>
  );
};

export default DueDate;
