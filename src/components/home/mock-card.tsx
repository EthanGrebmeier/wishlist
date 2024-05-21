"use client";

import React, { type ReactNode } from "react";
import { cn } from "~/lib/utils";
import { motion } from "framer-motion";

type MockCardProps = {
  title: string;
  color: string;
  children?: ReactNode;
  price?: string;
  className?: string;
};

const MockCard = ({
  title,
  color,
  price,
  children,
  className,
}: MockCardProps) => {
  return (
    <motion.div
      whileHover={{
        translateY: -4,
      }}
      className={cn(
        "relative w-full overflow-clip rounded-md border-2 border-black bg-green-100",
        className,
        // color,
      )}
    >
      <div className="relative aspect-square w-full"> {children}</div>
      <div
        className={cn(
          "flex justify-between border-t-2 border-black p-2",
          color,
        )}
      >
        <p className="-mb-[2px] font-serif text-xl md:text-2xl"> {title} </p>{" "}
        {price && <p className="text-xl font-medium"> {price} </p>}
      </div>
    </motion.div>
  );
};

export default MockCard;
