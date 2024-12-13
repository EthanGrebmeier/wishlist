"use client";

import {
  formatDate,
  parseISO,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
} from "date-fns";
import { Calendar, Clock } from "lucide-react";
import React, { useState, useEffect } from "react";
import { cn, getBackgroundColor } from "~/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import type { colorSchema } from "~/schema/wishlist/wishlist";
import type { z } from "zod";
import useMeasure from "react-use-measure";

type DueDateProps = {
  className?: string;
  date: string;
  color: z.infer<typeof colorSchema>;
};

const DueDate = ({ date, className, color }: DueDateProps) => {
  const [viewType, setViewType] = useState<"date" | "countdown">("date");
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      if (!date) return;

      const now = new Date();
      const dueDate = parseISO(date);

      const days = Math.max(differenceInDays(dueDate, now), 0);
      const hours = Math.max(differenceInHours(dueDate, now) % 24, 0);
      const minutes = Math.max(differenceInMinutes(dueDate, now) % 60, 0);

      setCountdown(`${days}D:${hours}H:${minutes}M`);
    };

    if (viewType === "countdown") {
      updateCountdown();
      const interval = setInterval(updateCountdown, 1000 * 60); // Update every minute
      return () => clearInterval(interval);
    }
  }, [viewType, date]);
  const [ref, { width }] = useMeasure();

  if (!date) {
    return null;
  }

  return (
    <motion.button
      onClick={(e) => {
        e.stopPropagation();
        setViewType(viewType === "date" ? "countdown" : "date");
      }}
      className={cn(
        "flex h-fit w-fit items-center gap-2 overflow-hidden rounded-md border-2 border-black p-1 font-medium",
        getBackgroundColor(color),
        className,
      )}
      animate={{ width: width + 12 }}
    >
      <div ref={ref}>
        <AnimatePresence initial={false} mode="wait">
          {viewType === "date" ? (
            <motion.div
              key="date"
              initial={{ opacity: 0, y: "110%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "110%" }}
              className="flex items-center gap-2"
              transition={{ duration: 0.2 }}
            >
              <Calendar size={20} />
              <time className="text-sm">{formatDate(parseISO(date), "P")}</time>
            </motion.div>
          ) : (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, y: "110%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "110%" }}
              className="flex items-center gap-2"
              transition={{ duration: 0.2 }}
            >
              <Clock size={20} />
              <time className="text-sm">{countdown}</time>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
};

export default DueDate;
