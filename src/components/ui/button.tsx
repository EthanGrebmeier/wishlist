import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "relative group flex items-start justify-start focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 rounded-md",
  {
    variants: {
      variant: {
        default: "h-11 ",
        destructive: "h-11 ",
        secondary: " h-11 ",
        outline: "",
        ghost: "",
        link: "text-primary underline-offset-4 group-hover:underline",
      },
      size: {
        default: "",
        sm: "",
        lg: "",
        icon: "",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const buttonInnerVariants = cva(
  "inline-flex z-10 items-center text-black justify-center whitespace-nowrap rounded-md border-2 border-black text-sm font-bold ring-offset-background disabled:pointer-events-none disabled:opacity-50 transition-all gap-2 w-full group-hover:disabled:-translate-y-1.5",
  {
    variants: {
      variant: {
        default:
          "relative bg-primary group-hover:bg-primary/90 translate-y-0 group-hover:translate-y-[2px] group-active:translate-y-[4px]",
        destructive:
          "relative bg-destructive group-hover:bg-destructive/90 translate-y-0 group-hover:translate-y-[2px] group-active:translate-y-[4px]",
        secondary:
          "relative bg-secondary group-hover:bg-secondary/90 translate-y-0 group-hover:translate-y-[2px] group-active:translate-y-[4px]",
        outline:
          "relative border-2 border-input bg-secondary group-hover:bg-secondary/60 group-hover:text-accent-foreground",
        ghost: "border-none",
        link: "text-primary underline-offset-4 group-hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        circle: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const buttonBackgroundVariants = cva(
  "absolute bottom-0 left-0 right-0 h-10 rounded-md ",
  {
    variants: {
      variant: {
        default: "bg-black",
        destructive: "bg-black",
        secondary: "bg-black",
        outline: "",
        ghost: "",
        link: "bg-black",
      },
      size: {
        default: "h-10",
        sm: "h-9",
        lg: "h-11",
        icon: "h-10 w-10",
        circle: "h-10 w-10 rounded-full",
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
  innerClassName?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      innerClassName,
      variant,
      size,
      asChild = false,
      icon,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, className, size }),
          icon && "flex gap-4",
        )}
        ref={ref}
        {...props}
      >
        <span
          className={cn(buttonInnerVariants({ variant, size }), innerClassName)}
        >
          {icon}
          {children}
        </span>
        <div className={cn(buttonBackgroundVariants({ variant, size }))}></div>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
