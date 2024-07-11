"use client";

import Link from "~/components/ui/link";
import { cn } from "~/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

type ListItemProps = {
  topContent: JSX.Element;
  bottomContent: JSX.Element;
  backgroundColor?: string;
  href: string;
  animationDelay?: number;
};

export const Card = ({
  topContent,
  bottomContent,
  backgroundColor,
  href,
  animationDelay,
}: ListItemProps) => {
  const shouldNotTranslate = useReducedMotion();

  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        delay: animationDelay,
      }}
    >
      <motion.div
        whileHover={{
          translateY: shouldNotTranslate ? 0 : -4,
        }}
        className="group relative isolate"
      >
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
