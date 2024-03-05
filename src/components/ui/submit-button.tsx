"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { Loader } from "lucide-react";
import type { ReactNode } from "react";

type SubmitButtonProps = {
  children?: ReactNode;
  icon?: ReactNode;
};

export const SubmitButton = ({ children, icon }: SubmitButtonProps) => {
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
      variant="outline"
    >
      {children ?? "Submit"}
    </Button>
  );
};
