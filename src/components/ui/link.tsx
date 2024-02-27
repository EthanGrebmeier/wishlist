"use client";

import { default as NextLink } from "next/link";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";

type LinkProps = React.ComponentProps<typeof NextLink>;

const Link = ({ className, ...rest }: LinkProps) => {
  const pathname = usePathname();
  const isSelected = pathname === rest.href;

  return (
    <NextLink
      className={cn("text-xl font-medium", className)}
      data-selected={isSelected ? "active" : "inactive"}
      {...rest}
    />
  );
};

export default Link;
