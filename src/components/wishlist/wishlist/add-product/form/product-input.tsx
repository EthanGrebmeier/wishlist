import type { LucideIcon } from "lucide-react";
import React, { forwardRef, type ReactNode } from "react";
import {
  FormControl,
  FormLabel,
  HorizontalFormItem,
} from "~/components/ui/form";
import { cn } from "~/lib/utils";

type HorizontalInputProps = {
  Icon: LucideIcon;
  label: string;
  input: ReactNode;
  required?: boolean;
};

export const HorizontalInputWrapper = ({
  Icon,
  label,
  required,
  input,
}: HorizontalInputProps) => {
  return (
    <HorizontalFormItem className="flex w-full items-center">
      <div className="flex w-[120px] items-center gap-2 capitalize">
        <Icon size={15} />
        <FormLabel>
          {label}
          {required && <sup className="text-xs">*</sup>}
        </FormLabel>
      </div>
      <div className="flex flex-1 items-center gap-2">
        <FormControl>{input}</FormControl>
      </div>
    </HorizontalFormItem>
  );
};

export const VerticalInputWrapper = ({
  Icon,
  label,
  required,
  input,
}: HorizontalInputProps) => {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <div className="flex w-full flex-1 items-center gap-2 capitalize">
        <Icon size={15} />
        <FormLabel>
          {label}
          {required && <sup>*</sup>}
        </FormLabel>
      </div>
      <div className="flex w-full flex-1 items-center gap-2">
        <FormControl>{input}</FormControl>
      </div>
    </div>
  );
};

export const HorizontalTextInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "h-8 w-full overflow-hidden overflow-ellipsis rounded-md bg-transparent p-1 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

HorizontalTextInput.displayName = "HorizontalTextInput";
