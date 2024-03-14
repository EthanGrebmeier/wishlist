import { PersonStanding } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "~/components/ui/dialog";
import ShareWishlistForm from "./share-wishlist-form";
import SharedUsers from "./shared-users";
import Privacy from "./privacy";
import type { WishlistPrivacy } from "~/types/wishlist";

type ShareWishlistProps = {
  wishlistId: string;
  privacyType: WishlistPrivacy;
};

const ShareWishlist = ({ wishlistId, privacyType }: ShareWishlistProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button icon={<PersonStanding width={20} height={20} />}>
          Share Wishlist
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h1 className="text-2xl font-medium"> Share Settings</h1>
          <Privacy wishlistId={wishlistId} privacyType={privacyType} />
          {privacyType === "private" && (
            <div className="space-y-4 border-t border-slate-200 pt-2">
              <SharedUsers wishlistId={wishlistId} />
              <ShareWishlistForm wishlistId={wishlistId} />
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShareWishlist;
