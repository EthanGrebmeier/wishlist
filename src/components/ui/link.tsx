"use client";

import { default as NextLink } from "next/link";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";

interface LinkProps extends React.ComponentProps<typeof NextLink> {
  shallowSelected?: boolean;
}

const Link = ({ className, shallowSelected, ...rest }: LinkProps) => {
  const pathname = usePathname();
  const isSelected = shallowSelected
    ? // eslint-disable-next-line @typescript-eslint/no-base-to-string
      pathname.includes(rest.href.toString())
    : pathname === rest.href;

  return (
    <NextLink
      className={cn("text-xl font-medium", className)}
      data-selected={isSelected ? "active" : "inactive"}
      {...rest}
    />
  );
};

export default Link;
