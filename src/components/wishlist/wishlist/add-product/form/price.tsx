import React from "react";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

const PriceInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }) => {
  return (
    <div className="relative">
      <p className="absolute left-2 top-1/2 mt-[.5px] -translate-y-1/2 font-sans font-medium">
        $
      </p>
      <Input type="text" className={cn("pl-[22px]", className)} {...props} />
    </div>
  );
});
PriceInput.displayName = "PriceInput";

export default PriceInput;
