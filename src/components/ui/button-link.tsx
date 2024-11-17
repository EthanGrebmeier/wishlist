"use client";

import { default as NextLink } from "next/link";
import {
  buttonBackgroundVariants,
  buttonInnerVariants,
  buttonVariants,
} from "./button";
import { cn } from "~/lib/utils";
import { usePathname } from "next/navigation";
import type { VariantProps } from "class-variance-authority";

type LinkProps = React.ComponentProps<typeof NextLink> & {
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonInnerVariants>["size"];
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
        "flex gap-4 text-xl",
        buttonVariants({
          variant,
          className,
          size,
        }),
      )}
      data-selected={isSelected ? "active" : "inactive"}
      {...rest}
    >
      <span className={cn(buttonInnerVariants({ variant, size }))}>
        {icon}
        {children}
      </span>
      <div className={cn(buttonBackgroundVariants({ variant, size }))}></div>
    </NextLink>
  );
};

export default ButtonLink;
