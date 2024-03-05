"use client";

import { default as NextLink } from "next/link";
import { Button, buttonVariants } from "./button";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";

type LinkProps = React.ComponentProps<typeof NextLink> & {
  variant?: "default" | "button" | "ghost";
};

const Link = ({ variant = "default", className, ...rest }: LinkProps) => {
  const pathname = usePathname();
  const isSelected = pathname === rest.href;

  return (
    <NextLink
      className={cn(
        "text-xl font-medium",
        variant === "button"
          ? buttonVariants({ variant: "outline", size: "default", className })
          : className,
        isSelected && "font-bold",
      )}
      {...rest}
    />
  );
};

export default Link;
