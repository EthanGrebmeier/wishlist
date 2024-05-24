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
      className={cn(
        "block ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 focus-visible:ring-offset-2",
        className,
      )}
      data-selected={isSelected ? "active" : "inactive"}
      {...rest}
    />
  );
};

export default Link;
