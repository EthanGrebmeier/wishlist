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
  animationDelay?: number;
};

export const Card = ({
  topContent,
  bottomContent,
  children,
  backgroundColor,
  href,
  animationDelay,
}: ListItemProps) => {
  const shouldNotTranslate = useReducedMotion();

  return (
    <motion.li layout>
      <motion.div
        whileHover={{
          translateY: shouldNotTranslate ? 0 : -4,
        }}
        className="group relative isolate"
      >
        {children}
        <Link className="text-xl font-medium " href={href}>
          <div
            className={cn(
              "group w-full overflow-hidden rounded-md border-2 border-black",
            )}
          >
            {topContent}
            <div
              className={cn(
                "flex items-center justify-between gap-2 border-t-2 border-black px-2 py-2 sm:px-4",
                backgroundColor,
              )}
            >
              {bottomContent}
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.li>
  );
};

export default Card;
