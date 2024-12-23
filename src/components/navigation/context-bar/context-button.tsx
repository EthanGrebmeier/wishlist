"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "~/lib/utils";
import { forwardRef } from "react";

type ContextButtonProps = {
  isLeftmost: boolean;
  isRightmost: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  text: string;
  backgroundColor: string;
  className?: string;
  hideTextOnMobile?: boolean;
};

const ContextButton = forwardRef<HTMLDivElement, ContextButtonProps>(
  (
    {
      isLeftmost,
      isRightmost,
      onClick,
      icon,
      text,
      backgroundColor,
      className,
      hideTextOnMobile = false,
    },
    ref,
  ) => {
    return (
      <motion.div
        ref={ref}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "fit-content", opacity: 1 }}
        exit={{ width: 0, opacity: 0 }}
        className={cn(
          " bg-black",
          isLeftmost ? "rounded-l-full" : "rounded-l-none",
          isRightmost ? "xl:rounded-r-full" : "rounded-r-none",
          className,
        )}
      >
        <motion.button
          style={{
            translateY: "-4px",
          }}
          animate={{
            backgroundColor,
          }}
          whileTap={{ translateY: "0" }}
          whileHover={{
            translateY: "-3px",
          }}
          whileFocus={{
            translateY: "-3px",
          }}
          onClick={onClick}
          className={cn(
            "flex items-center gap-2 overflow-hidden border-2 border-black  bg-background font-bold focus-visible:outline-none focus-visible:ring-2  focus-visible:ring-blue-500 focus-visible:ring-offset-1",
            isLeftmost
              ? "rounded-l-full border-l-2"
              : "rounded-l-none border-l-0",
            isRightmost
              ? "border-r-0 xl:rounded-r-full xl:border-r-2"
              : "rounded-r-none ",
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div className="flex flex-nowrap items-center gap-2 overflow-hidden text-nowrap px-4 py-2">
              {icon}{" "}
              <span
                className={cn(hideTextOnMobile && "hidden xs:hidden md:block ")}
              >
                {text}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </motion.div>
    );
  },
);

ContextButton.displayName = "ContextButton";

export default ContextButton;
