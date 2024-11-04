"use client";

import { Clipboard, ClipboardCheck } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
  const [wasJustPressed, setWasJustPressed] = useState(false);

  useEffect(() => {
    if (wasJustPressed) {
      const timeout = setTimeout(() => {
        setWasJustPressed(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [wasJustPressed]);

  return (
    <Button
      onClick={async () => {
        setWasJustPressed(true);
        await navigator.clipboard.writeText(textToCopy);
      }}
      className="w-[140px]"
      innerClassName="overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {wasJustPressed ? (
          <motion.div
            key="copied"
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            transition={{ duration: 0.3, type: "spring", bounce: 0 }}
            className="flex items-center gap-2"
          >
            <ClipboardCheck size={20} />
            Copied!
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            transition={{ duration: 0.3, type: "spring", bounce: 0 }}
            className="flex items-center gap-2"
          >
            <Clipboard size={20} /> Copy
          </motion.div>
        )}
        <motion.div></motion.div>
      </AnimatePresence>
    </Button>
  );
};

export default CopyButton;
