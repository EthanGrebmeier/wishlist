"use client";

import { motion, type MotionStyle } from "framer-motion";

import React from "react";

type FlyingIconProps = {
  children: JSX.Element;
  style: MotionStyle;
};

const FlyingIcon = ({ children, style }: FlyingIconProps) => {
  return (
    <motion.div
      style={style}
      transition={{
        duration: 0.55,
        delay: 0.05,
        type: "spring",
        bounce: 0.5,
      }}
      whileHover={{ rotate: -12 }}
      className="absolute z-10"
    >
      {children}
    </motion.div>
  );
};

export default FlyingIcon;
