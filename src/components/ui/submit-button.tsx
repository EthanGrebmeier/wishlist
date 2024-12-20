"use client";

import { useFormStatus } from "react-dom";
import { Button, type buttonVariants } from "./button";
import { Loader } from "lucide-react";
import { forwardRef, type ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";

type SubmitButtonProps = {
  children?: ReactNode;
  icon?: ReactNode;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  rounding?: VariantProps<typeof buttonVariants>["rounding"];
  className?: string;
};

export const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  (
    {
      children,
      icon,
      variant = "default",
      rounding = "rounded",
      className,
      ...props
    },
    ref,
  ) => {
    const formStatus = useFormStatus();
    return (
      <Button
        icon={
          formStatus.pending ? (
            <Loader width={20} height={20} className="animate-spin" />
          ) : (
            icon
          )
        }
        type="submit"
        variant={variant}
        rounding={rounding}
        className={className}
        disabled={formStatus.pending}
        ref={ref}
        {...props}
      >
        {children ?? "Submit"}
      </Button>
    );
  },
);

SubmitButton.displayName = "SubmitButton";
