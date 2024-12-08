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
import type { Wishlist } from "~/types/wishlist";
import { AnimatePresence, motion } from "framer-motion";

type DueDateProps = {
  className?: string;
  wishlist: Wishlist;
};

const DueDate = ({ wishlist, className }: DueDateProps) => {
  const [viewType, setViewType] = useState<"date" | "countdown">("date");
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const updateCountdown = () => {
      if (!wishlist.dueDate) return;

      const now = new Date();
      const dueDate = parseISO(wishlist.dueDate);

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
  }, [viewType, wishlist.dueDate]);

  if (!wishlist.dueDate) {
    return null;
  }

  return (
    <motion.button
      layout
      onClick={() => setViewType(viewType === "date" ? "countdown" : "date")}
      className={cn(
        "flex items-center gap-2 overflow-hidden rounded-md border-2 border-black p-1 font-medium",
        getBackgroundColor(wishlist.color),
        className,
      )}
    >
      <AnimatePresence initial mode="wait">
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
            <time className="text-sm">
              {formatDate(parseISO(wishlist.dueDate), "P")}
            </time>
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
    </motion.button>
  );
};

export default DueDate;
