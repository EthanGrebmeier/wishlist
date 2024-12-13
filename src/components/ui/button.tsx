import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "relative group flex font-bold transition-colors border-2 border-black duration-150 ease-out justify-center focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 px-4 items-center",
  {
    variants: {
      variant: {
        default: "h-9 bg-green-300 hover:bg-green-200",
        destructive: "h-9  bg-red-300 hover:bg-red-200",
        secondary: " h-9 bg-secondary hover:bg-secondary/80",
        tertiary: "h-9 bg-yellow-300 hover:bg-yellow-200",
        outline: "h-9 border-2 border-black bg-background hover:bg-green-200",
        ghost: "",
        link: "text-primary underline-offset-4 group-hover:underline",
      },
      rounding: {
        square: "rounded-md",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      rounding: "rounded",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  innerClassName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, rounding, asChild = false, icon, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, className, rounding }),
          icon && "flex gap-2",
        )}
        ref={ref}
        {...props}
      >
        {icon}
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
