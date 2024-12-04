"use client";

import { default as NextLink } from "next/link";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";

type LinkProps = React.ComponentProps<typeof NextLink> & {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  icon?: JSX.Element;
};

const ButtonLink = ({
  variant = "default",
  className,
  children,
  icon,
  ...rest
}: LinkProps) => {
  const pathname = usePathname();
  const isSelected = pathname === rest.href;

  return (
    <NextLink
      className={cn(
        icon && "flex gap-2",
        buttonVariants({
          variant,
          className,
        }),
      )}
      data-selected={isSelected ? "active" : "inactive"}
      {...rest}
    >
      {icon}
      {children}
    </NextLink>
  );
};

export default ButtonLink;
