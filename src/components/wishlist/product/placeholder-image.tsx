import { Gift } from "lucide-react";
import React from "react";
import { cn } from "~/lib/utils";

type PlaceholderImageProps = {
  className?: string;
};

const PlaceholderImage = ({ className }: PlaceholderImageProps) => {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-green-100",
        className,
      )}
    >
      {" "}
      <Gift size={50} />{" "}
    </div>
  );
};

export default PlaceholderImage;
