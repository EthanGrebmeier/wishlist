import type { Wishlist } from "~/types/wishlist";
import WishlistMenu from "./menu";
import Link from "~/components/ui/link";

type ListItemProps = {
  wishlist: Wishlist;
};

const ListItem = ({ wishlist }: ListItemProps) => {
  const { name, id, products } = wishlist;

  return (
    <div className="w-full space-y-1 rounded-md border-2 border-black p-2">
      <div className="flex items-center justify-between">
        {" "}
        <Link href={`/wishlist/${id}`}>
          <h2 className="text-2xl"> {name} </h2>
        </Link>
        <div className="flex items-center gap-4">
          <div className="text-md"> {products.length} Items </div>
          <WishlistMenu wishlist={wishlist} />
        </div>
      </div>
    </div>
  );
};

export default ListItem;
