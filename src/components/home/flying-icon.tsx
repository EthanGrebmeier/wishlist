"use client";

import {
  useReducedMotion,
  motion,
  type TargetAndTransition,
} from "framer-motion";
import React from "react";

type FlyingIconProps = {
  children: JSX.Element;
  animate: TargetAndTransition;
};

const FlyingIcon = ({ children, animate }: FlyingIconProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={animate}
      transition={{
        duration: 0.55,
        delay: 0.05,
        type: "spring",
        bounce: 0.5,
      }}
      whileHover={{ rotate: -12 }}
      className="absolute"
    >
      {children}
    </motion.div>
  );
};

export default FlyingIcon;
