"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";

export const SubmitButton = () => {
  const formStatus = useFormStatus();
  return (
    <Button type="submit" variant="outline">
      {formStatus.pending ? "..." : "Submit"}
    </Button>
  );
};
