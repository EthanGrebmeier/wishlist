"use client";

import Link from "~/components/ui/link";
import { cn } from "~/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type ListItemProps = {
  topContent: ReactNode;
  bottomContent: ReactNode;
  children?: ReactNode;
  backgroundColor?: string;
  href: string;
  onClick?: () => void;
  animationDelay?: number;
  prefetch?: boolean;
};

export const Card = ({
  topContent,
  bottomContent,
  children,
  backgroundColor,
  href,
  onClick,
  prefetch = true,
}: ListItemProps) => {
  const shouldNotTranslate = useReducedMotion();

  const content = (
    <div
      className={cn(
        "group w-full overflow-hidden rounded-md border-2 border-black ",
      )}
    >
      {topContent}
      <div
        className={cn(
          "flex items-center justify-between gap-2 border-t-2 border-black px-2 py-2 sm:px-3",
          backgroundColor,
        )}
      >
        {bottomContent}
      </div>
    </div>
  );

  return (
    <motion.li layout>
      <motion.div
        whileHover={{
          translateY: shouldNotTranslate ? 0 : -2,
        }}
        className="group relative isolate"
      >
        {children}
        {href ? (
          <Link className="text-xl font-medium" href={href} prefetch={prefetch}>
            {content}
          </Link>
        ) : onClick ? (
          <button
            className="w-full p-0 text-start text-xl font-medium"
            onClick={onClick}
          >
            {content}
          </button>
        ) : (
          content
        )}
      </motion.div>
    </motion.li>
  );
};

export default Card;
