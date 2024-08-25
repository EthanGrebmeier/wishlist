"use client";
import type { WishlistWithProducts } from "~/types/wishlist";
import WishlistMenu from "./menu";
import { getBackgroundColor } from "~/lib/utils";
import DueDate from "../../due-date";
import { Scroll } from "lucide-react";
import type { UserTypeWithOwner } from "~/types/user";
import Card from "~/components/ui/card";
import Image from "next/image";

export type ListItemProps = {
  wishlist: WishlistWithProducts;
  canUserEdit: boolean;
  userType: UserTypeWithOwner;
  animationDelay?: number;
};

const ListItem = ({ wishlist, canUserEdit, animationDelay }: ListItemProps) => {
  const { name, id, color } = wishlist;

  return (
    <Card
      href={`/wishlist/${id}`}
      backgroundColor={getBackgroundColor(color)}
      animationDelay={animationDelay}
      topContent={
        <>
          <div className="relative aspect-square w-full overflow-hidden object-cover object-center">
            {wishlist.imageUrl ? (
              <Image
                alt={wishlist.name}
                fill
                src={wishlist.imageUrl}
                className="w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-green-100">
                {" "}
                <Scroll size={50} />{" "}
              </div>
            )}
          </div>
        </>
      }
      bottomContent={
        <h2 className="-mb-[2px] line-clamp-1 font-serif text-2xl group-hover:underline">
          {" "}
          {name}{" "}
        </h2>
      }
    >
      {wishlist.dueDate && (
        <DueDate className="absolute left-2 top-2 z-[10]" wishlist={wishlist} />
      )}
      {canUserEdit && (
        <div className="absolute right-2 top-2 z-10">
          <WishlistMenu wishlist={wishlist} />
        </div>
      )}
    </Card>
  );
};

export default ListItem;
