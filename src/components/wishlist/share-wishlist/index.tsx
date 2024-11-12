"use client";
import { Mail, Sparkles, UsersRound } from "lucide-react";
import { Button } from "~/components/ui/button";
import ShareWishlistForm from "./share-wishlist-form";
import SharedUsers from "./shared-users";

import { useEffect, useMemo, useState } from "react";
import type {
  Wishlist,
  WishlistMagicLink,
  WishlistSharesWithUser,
} from "~/types/wishlist";
import type { UserTypeWithOwner } from "~/types/user";
import { verifyUserIsWishlistEditor } from "~/lib/wishlist/verifyUserIsWishlistEditor";
import ResponsiveDialog from "~/components/ui/responsive-dialog";
import useMeasure from "react-use-measure";
import { AnimatePresence, motion } from "framer-motion";
import CopyButton from "./magic-link/copy-button";
import MagicLinkSection from "./magic-link/section";
import { getMagicLink } from "~/server/actions/wishlist";
import { getMagicLinkUrl } from "~/lib/wishlist/getMagicLinkUrl";

type ShareWishlistProps = {
  wishlist: Wishlist;
  userId: string;
  wishlistShares: WishlistSharesWithUser[];
  userStatus: UserTypeWithOwner;
};

const ShareWishlist = ({
  wishlist,
  userId,
  wishlistShares,
  userStatus,
}: ShareWishlistProps) => {
  const [frame, setFrame] = useState<"userList" | "magicLink" | "search">(
    "userList",
  );
  const [ref, dimensions] = useMeasure();
  const canUserEdit = verifyUserIsWishlistEditor(userStatus);
  const [magicLink, setMagicLink] = useState<WishlistMagicLink>();

  useEffect(() => {
    const getMagicLinkViaAction = async () => {
      const magicLink = await getMagicLink({ wishlistId: wishlist.id });
      setMagicLink(magicLink?.data);
    };

    void getMagicLinkViaAction();
  }, [wishlist.id]);

  const content = useMemo(() => {
    if (frame === "userList" || !canUserEdit) {
      return (
        <SharedUsers
          key="sharedUsers"
          wishlistShares={wishlistShares}
          userId={userId}
          wishlist={wishlist}
          isOwner={userStatus === "owner"}
          canUserEdit={canUserEdit}
        />
      );
    }
    if (frame === "magicLink" && canUserEdit) {
      return (
        <MagicLinkSection
          magicLinkId={magicLink?.id}
          wishlistId={wishlist.id}
        />
      );
    }
    if (frame === "search" && canUserEdit) {
      return <ShareWishlistForm key="shareWishlist" wishlistId={wishlist.id} />;
    }
  }, [
    frame,
    canUserEdit,
    wishlistShares,
    userId,
    wishlist,
    userStatus,
    magicLink?.id,
  ]);

  const Footer = useMemo(() => {
    if (frame === "search" && canUserEdit) {
      return <Button onClick={() => setFrame("userList")}>Back</Button>;
    }
    if (frame === "magicLink" && canUserEdit) {
      return (
        <>
          <Button onClick={() => setFrame("userList")}>Back</Button>
          {magicLink ? (
            <CopyButton textToCopy={getMagicLinkUrl(magicLink.id)} />
          ) : (
            "Loading..."
          )}
        </>
      );
    }
    return (
      <div className="flex w-full  gap-2">
        <Button
          className="flex-1"
          variant="secondary"
          icon={<Sparkles size={20} />}
          onClick={() => setFrame("magicLink")}
        >
          Share Via Link
        </Button>
        <Button
          className="flex-1"
          icon={<Mail size={20} />}
          onClick={() => setFrame("search")}
        >
          Share Via Email
        </Button>
      </div>
    );
  }, [frame, canUserEdit, magicLink]);

  return (
    <ResponsiveDialog
      title="Sharing"
      trigger={<Button icon={<UsersRound size={20} />}></Button>}
      footer={<div className="flex w-full justify-between">{Footer}</div>}
    >
      <motion.div
        animate={{
          height: dimensions?.height,
        }}
        transition={{
          duration: 0.2,
          type: "spring",
          bounce: 0,
        }}
        className="flex min-w-0 flex-col gap-2"
      >
        <div className="z-10 flex min-w-0 flex-col gap-4 pt-2" ref={ref}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={frame}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{
                duration: 0.2,
                type: "spring",
                bounce: 0,
              }}
            >
              {content}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </ResponsiveDialog>
  );
};

export default ShareWishlist;
