"use client";

import { useFormStatus } from "react-dom";
import { Button, type buttonVariants } from "./button";
import { Loader } from "lucide-react";
import type { ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";

type SubmitButtonProps = {
  children?: ReactNode;
  icon?: ReactNode;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  className?: string;
};

export const SubmitButton = ({
  children,
  icon,
  variant = "default",
  size = "default",
  className,
}: SubmitButtonProps) => {
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
      size={size}
      className={className}
    >
      {children ?? "Submit"}
    </Button>
  );
};
