import type { LucideIcon } from "lucide-react";
import React, { useMemo } from "react";
import { Button } from "./button";
import { AnimatePresence, motion } from "framer-motion";
import type { HookActionStatus } from "next-safe-action/hooks";
import { cn } from "~/lib/utils";

type StatusButtonProps = {
  status: HookActionStatus;
  loadingContent: {
    text: string;
    Icon?: LucideIcon;
    shouldSpin?: boolean;
  };
  content: {
    text: string;
    Icon?: LucideIcon;
  };
  hasSucceededContent: {
    text: string;
    Icon?: LucideIcon;
  };
} & Omit<React.ComponentPropsWithoutRef<typeof Button>, "content">;

const variants = {
  initial: {
    y: 30,
    filter: "blur(4px)",
  },
  animate: {
    y: 0,
    filter: "blur(0px)",
  },
  exit: {
    y: 30,
    filter: "blur(4px)",
  },
};

const StatusButton = ({
  status,
  loadingContent,
  content,
  hasSucceededContent,
  className,
  ...props
}: StatusButtonProps) => {
  const renderedContent = useMemo(() => {
    if (status === "executing") {
      return (
        <motion.div
          key="executing"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          className="flex items-center gap-2"
        >
          {loadingContent.Icon && (
            <loadingContent.Icon
              className={cn(loadingContent.shouldSpin && "animate-spin")}
              size={15}
            />
          )}
          {loadingContent.text}
        </motion.div>
      );
    }

    if (status === "hasSucceeded") {
      return (
        <motion.div
          key="hasSucceeded"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          className="flex items-center gap-2"
        >
          {hasSucceededContent.Icon && <hasSucceededContent.Icon size={15} />}
          {hasSucceededContent.text}
        </motion.div>
      );
    }

    return (
      <motion.div
        key="idle"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        className="flex items-center gap-2"
      >
        {content.Icon && <content.Icon size={15} />}
        {content.text}
      </motion.div>
    );
  }, [status, content, hasSucceededContent, loadingContent]);

  return (
    <Button className={cn(" overflow-hidden", className)} {...props}>
      <AnimatePresence initial={false} mode="wait">
        {renderedContent}
      </AnimatePresence>
    </Button>
  );
};

export default StatusButton;
