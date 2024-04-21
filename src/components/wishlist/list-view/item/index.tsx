"use client";
import type { WishlistWithProducts } from "~/types/wishlist";
import WishlistMenu from "./menu";
import Link from "~/components/ui/link";
import Image from "next/image";
import type { User } from "next-auth";
import { formatDate } from "date-fns";
import { cn } from "~/lib/utils";
import { colors } from "~/consts/colors";
import { motion } from "framer-motion";

type ListItemProps = {
  wishlist: WishlistWithProducts;
  user: User;
};

const ListItem = ({ wishlist, user }: ListItemProps) => {
  const { name, id, color } = wishlist;

  const isEditor = wishlist.createdById === user.id;
  const backgroundClass =
    colors.find((colorTheme) => colorTheme.name === color)?.background ??
    "bg-white";

  return (
    <motion.li
      whileHover={{
        translateY: -4,
      }}
      className="relative isolate"
    >
      {wishlist.dueDate && (
        <div
          className={cn(
            "absolute left-2 top-2 z-[10] rounded-md border-2 border-black p-1 font-medium",
            backgroundClass,
          )}
        >
          <p className="text-sm">{formatDate(wishlist.dueDate, "P")}</p>
        </div>
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
          <div className="relative aspect-square w-full overflow-hidden object-cover">
            <Image alt="placeholder" src="https://placehold.co/600x600" fill />
          </div>
          <div
            className={cn(
              "flex items-center justify-between border-t-2 border-black px-4 py-2",
              backgroundClass,
            )}
          >
            {" "}
            <div>
              <h2 className="line-clamp-1 font-serif text-2xl group-hover:underline">
                {" "}
                {name}{" "}
              </h2>
            </div>
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
