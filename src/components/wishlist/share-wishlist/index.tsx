import { PersonStanding, Share } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

type ShareWishlistProps = {
  wishlistId: string;
  privacyType: WishlistPrivacy;
  userId: string;
};

const ShareWishlist = ({
  wishlistId,
  privacyType,
  userId,
}: ShareWishlistProps) => {
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button icon={<Share size={20} />}>
                {" "}
                <span className="hidden lg:block"> Share </span>
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>Share Wishlist</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent>
        <DialogHeader>
          <h1 className="text-2xl font-medium"> Share Settings</h1>
          <Privacy wishlistId={wishlistId} privacyType={privacyType} />
          <div className="space-y-4 border-t border-slate-200 pt-2">
            <SharedUsers userId={userId} wishlistId={wishlistId} />
            <ShareWishlistForm wishlistId={wishlistId} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ShareWishlist;
