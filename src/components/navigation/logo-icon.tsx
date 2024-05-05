"use client";

import React from "react";
import ColoredIconWrapper from "../ui/colored-icon-wrapper";
import { Scroll } from "lucide-react";
import { motion } from "framer-motion";

const LogoIcon = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        translateY: 4,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
      }}
      className="absolute -right-8 top-4"
    >
      <ColoredIconWrapper>
        <Scroll size="18" />
      </ColoredIconWrapper>
    </motion.div>
  );
};

export default LogoIcon;
