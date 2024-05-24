"use client";
import type { WishlistWithProducts } from "~/types/wishlist";
import WishlistMenu from "./menu";
import Link from "~/components/ui/link";
import { cn } from "~/lib/utils";
import { colors } from "~/consts/colors";
import { motion, useReducedMotion } from "framer-motion";
import DueDate from "../../due-date";
import { Scroll } from "lucide-react";
import type { UserTypeWithOwner } from "~/types/user";

export type ListItemProps = {
  wishlist: WishlistWithProducts;
  canUserEdit: boolean;
  userType: UserTypeWithOwner;
};

const ListItem = ({ wishlist, canUserEdit }: ListItemProps) => {
  const { name, id, color } = wishlist;

  const shouldNotTranslate = useReducedMotion();

  const backgroundClass =
    colors.find((colorTheme) => colorTheme.name === color)?.background ??
    "bg-white";

  return (
    <motion.li
      whileHover={{
        translateY: shouldNotTranslate ? 0 : -4,
      }}
      className="group relative isolate"
    >
      {wishlist.dueDate && (
        <DueDate className="absolute left-2 top-2 z-[10]" wishlist={wishlist} />
      )}
      <Link className="text-xl font-medium " href={`/wishlist/${id}`}>
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
          </div>
        </div>
      </Link>
      {canUserEdit && (
        <div className="absolute right-2 top-2 z-10">
          <WishlistMenu wishlist={wishlist} />
        </div>
      )}
    </motion.li>
  );
};

export default ListItem;
