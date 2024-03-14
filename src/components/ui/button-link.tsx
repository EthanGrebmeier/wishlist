"use client";

import { default as NextLink } from "next/link";
import { buttonVariants } from "./button";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";
import type { VariantProps } from "class-variance-authority";

type LinkProps = React.ComponentProps<typeof NextLink> & {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
  icon?: JSX.Element;
};

const ButtonLink = ({
  variant = "default",
  size = "default",
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
        "flex gap-4 text-xl font-medium",
        buttonVariants({
          variant,
          size,
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
