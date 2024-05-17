"use client";

import React from "react";
import ColoredIconWrapper from "../ui/colored-icon-wrapper";
import { Scroll } from "lucide-react";
import { motion } from "framer-motion";

const LogoIcon = ({ size = "base" }: { size?: "base" | "large" }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        translateY: size === "base" ? 4 : 12,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="absolute -right-8 -top-2"
    >
      <ColoredIconWrapper>
        <Scroll size={size === "base" ? 18 : 24} />
      </ColoredIconWrapper>
    </motion.div>
  );
};

export default LogoIcon;
