"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Package } from "lucide-react";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";

type AnimatedPackageProps = {
  icon?: JSX.Element;
};

const AnimatedPackage = ({ icon }: AnimatedPackageProps) => {
  return (
    <AnimatePresence>
      <motion.div
        key="unreceived"
        className="absolute bottom-4 right-4 rotate-[17deg]"
        initial={{
          translateY: 80,
        }}
        animate={{
          translateY: 0,
          rotate: 9,
        }}
        exit={{
          translateY: 80,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        {icon ?? (
          <ColoredIconWrapper className="border-dashed  bg-blue-400">
            <Package strokeWidth={2} size={45} color="black" />
          </ColoredIconWrapper>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedPackage;
