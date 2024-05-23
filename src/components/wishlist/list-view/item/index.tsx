"use client";
import type { WishlistWithProducts } from "~/types/wishlist";
import WishlistMenu from "./menu";
import Link from "~/components/ui/link";
import type { User } from "next-auth";
import { cn } from "~/lib/utils";
import { colors } from "~/consts/colors";
import { motion } from "framer-motion";
import DueDate from "../../due-date";
import { Scroll } from "lucide-react";

export type ListItemProps = {
  wishlist: WishlistWithProducts;
  isEditor: boolean;
};

const ListItem = ({ wishlist, isEditor }: ListItemProps) => {
  const { name, id, color } = wishlist;

  const backgroundClass =
    colors.find((colorTheme) => colorTheme.name === color)?.background ??
    "bg-white";

  return (
    <motion.li
      whileHover={{
        translateY: -4,
      }}
      className="group relative isolate"
    >
      {wishlist.dueDate && (
        <DueDate className="absolute left-2 top-2 z-[10]" wishlist={wishlist} />
      )}
      {isEditor && (
        <div className="absolute right-2 top-2 z-10">
          <WishlistMenu wishlist={wishlist} />
        </div>
      )}
      <Link href={`/wishlist/${id}`}>
        <div
          className={cn(
            "group w-full overflow-hidden rounded-md border-2 border-black",
          )}
        >
          <div className="relative aspect-square w-full overflow-hidden object-cover object-center">
            {wishlist.imageUrl ? (
              <img src={wishlist.imageUrl} className="w-full" />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-green-100">
                {" "}
                <Scroll size={50} />{" "}
              </div>
            )}
          </div>
          <div
            className={cn(
              "flex items-center justify-between border-t-2 border-black px-4 py-2",
              backgroundClass,
            )}
          >
            <h2 className="-mb-[2px] line-clamp-1 font-serif text-2xl group-hover:underline">
              {" "}
              {name}{" "}
            </h2>
            <div className="text-end">
              <p className="text-sm"> {isEditor ? "You" : "Fix me"} </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.li>
  );
};

export default ListItem;
