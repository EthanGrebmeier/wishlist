import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva("relative", {
  variants: {
    variant: {
      default: "bg-black rounded-md",
      destructive: "bg-black rounded-md",
      secondary: "bg-black rounded-md",
      outline: "",
      ghost: "",
      link: "text-primary underline-offset-4 hover:underline",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const buttonInnerVariants = cva(
  "inline-flex items-center text-black justify-center whitespace-nowrap rounded-md border-2 border-black text-sm font-bold ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all",
  {
    variants: {
      variant: {
        default:
          "bg-primary hover:bg-primary/90 -translate-y-1.5 hover:translate-y-[-2px] active:translate-y-[0px]",
        destructive:
          "bg-destructive hover:bg-destructive/90 -translate-y-1.5 hover:translate-y-[-2px] active:translate-y-[0px]",
        secondary:
          "bg-secondary hover:bg-secondary/90 -translate-y-1.5 hover:translate-y-[-2px] active:translate-y-[0px]",
        outline:
          "border-2 border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        ghost: "",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonInnerVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, icon, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, className }),
          icon && "flex gap-4",
        )}
        ref={ref}
        {...props}
      >
        <span className={cn(buttonInnerVariants({ variant, size }))}>
          {icon}
          {children}
        </span>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
