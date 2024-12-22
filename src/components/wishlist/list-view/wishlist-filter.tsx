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
}: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative z-10 rounded-sm px-1 py-0.5 text-base font-medium transition-colors duration-150 hover:bg-green-200",

        className,
      )}
    >
      {isActive && (
        <motion.div
          layoutId="active-filter"
          className="absolute inset-0 -z-10 rounded-sm border-2 border-black bg-green-400"
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
    <div className="isolate flex h-10 w-fit items-center gap-1 overflow-hidden rounded-md border-2 border-black px-1">
      <FilterButton
        isActive={wishlistType === "all"}
        onClick={() => setWishlistType("all")}
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
      >
        Shared Lists
      </FilterButton>
    </div>
  );
};
