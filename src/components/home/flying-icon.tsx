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
  const shouldNotAnimate = useReducedMotion();

  const initialValues = shouldNotAnimate
    ? {
        ...animate,
        opacity: 0,
      }
    : {
        opacity: 0,
      };

  return (
    <motion.div
      //@ts-expect-error Framer doesn't expose types ahhhhhhh
      initial={initialValues}
      animate={animate}
      transition={{
        duration: 0.55,
        delay: 0.05,
      }}
      whileHover={{
        ...(!shouldNotAnimate && { rotate: -12 }),
      }}
      className="absolute"
    >
      {children}
    </motion.div>
  );
};

export default FlyingIcon;
