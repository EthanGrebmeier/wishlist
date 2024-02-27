"use client";

import { default as NextLink } from "next/link";
import { Button } from "./button";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";

type LinkProps = React.ComponentProps<typeof NextLink> & {
  variant?: "default" | "button" | "ghost";
};

const Link = ({ variant = "default", className, ...rest }: LinkProps) => {
  const pathname = usePathname();
  const isSelected = pathname === rest.href;

  if (variant === "button") {
    return (
      <Button className={className} asChild variant="outline">
        <NextLink {...rest} />
      </Button>
    );
  }

  return (
    <NextLink
      className={cn(
        "text-xl font-medium",
        isSelected && "font-bold",
        className,
      )}
      {...rest}
    />
  );
};

export default Link;
