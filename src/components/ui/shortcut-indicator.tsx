"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const ShortcutIndicator = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const isMac = navigator.userAgent?.toLowerCase().includes("mac");
  const shortcutText = isMac ? "⌘K" : "Ctrl+K";

  return (
    <motion.div
      key="shortcut"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <kbd className="hidden rounded-md border border-black bg-gray-100 px-1 py-0.5 text-xs tracking-widest sm:inline-block">
        {shortcutText}
      </kbd>
    </motion.div>
  );
};
