"use client";

import { useAtom } from "jotai";
import { wishlistTypeAtom } from "~/store/wishlist-type";
import { cn } from "~/lib/utils";
import { motion } from "framer-motion";

type FilterButtonProps = {
  isActive: boolean;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  side?: "left" | "right" | "center";
};

const FilterButton = ({
  isActive,
  onClick,
  className,
  children,
  side,
}: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative z-10 border-black px-1 py-0.5 text-base font-medium",
        side === "left" && "border-r-2 pl-2",
        side === "right" && "border-l-2 pr-2",
        className,
      )}
    >
      {isActive && (
        <motion.div
          layoutId="active-filter"
          className="absolute inset-0 -z-10 bg-green-400"
          transition={{ type: "spring", bounce: 0.2, duration: 0.2 }}
        />
      )}
      {children}
    </button>
  );
};

export const WishlistFilter = () => {
  const [wishlistType, setWishlistType] = useAtom(wishlistTypeAtom);

  return (
    <div className="isolate flex w-fit items-center overflow-hidden rounded-full border-2 border-black">
      <FilterButton
        isActive={wishlistType === "all"}
        onClick={() => setWishlistType("all")}
        side="left"
      >
        All Lists
      </FilterButton>
      <FilterButton
        isActive={wishlistType === "mine"}
        onClick={() => setWishlistType("mine")}
      >
        My Lists
      </FilterButton>
      <FilterButton
        isActive={wishlistType === "shared"}
        onClick={() => setWishlistType("shared")}
        side="right"
      >
        Shared Lists
      </FilterButton>
    </div>
  );
};
