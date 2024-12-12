"use client";
import { Mail, ShareIcon, Sparkles } from "lucide-react";
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
import { AnimatePresence, motion } from "framer-motion";
import CopyButton from "./magic-link/copy-button";
import MagicLinkSection from "./magic-link/section";
import { getMagicLink } from "~/server/actions/wishlist";
import { getMagicLinkUrl } from "~/lib/wishlist/getMagicLinkUrl";
import ResponsiveSheet from "~/components/ui/responsive-sheet";
import { isWishlistShareOpenAtom } from "~/store/wishlist-settings";
import { useAtom } from "jotai";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";

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
  const [isOpen, setIsOpen] = useAtom(isWishlistShareOpenAtom);
  const [frame, setFrame] = useState<"userList" | "magicLink" | "search">(
    "userList",
  );
  const canUserEdit = verifyUserIsWishlistEditor(userStatus);
  const [magicLink, setMagicLink] = useState<WishlistMagicLink>();

  useEffect(() => {
    const getMagicLinkViaAction = async () => {
      const magicLink = await getMagicLink({ wishlistId: wishlist.id });
      setMagicLink(magicLink?.data);
    };

    void getMagicLinkViaAction();
  }, [wishlist.id]);

  useEffect(() => {
    if (!isOpen) {
      setFrame("userList");
    }
  }, [isOpen]);

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
    if (!canUserEdit) {
      return null;
    }
    if (frame === "search") {
      return (
        <Button variant="tertiary" onClick={() => setFrame("userList")}>
          Back
        </Button>
      );
    }
    if (frame === "magicLink") {
      return (
        <>
          <Button variant="tertiary" onClick={() => setFrame("userList")}>
            Back
          </Button>
          {magicLink ? (
            <CopyButton textToCopy={getMagicLinkUrl(magicLink.id)} />
          ) : (
            "Loading..."
          )}
        </>
      );
    }
    return (
      <div className="flex w-full flex-col gap-2 sm:flex-row">
        <Button
          className="sm:flex-1"
          variant="secondary"
          icon={<Sparkles size={20} />}
          onClick={() => setFrame("magicLink")}
        >
          Share Via Link
        </Button>
        <Button
          className="sm:flex-1"
          icon={<Mail size={20} />}
          onClick={() => setFrame("search")}
        >
          Share Via Email
        </Button>
      </div>
    );
  }, [frame, canUserEdit, magicLink]);

  return (
    <ResponsiveSheet
      contentClassName="sm:max-w-md"
      titleIcon={
        <ColoredIconWrapper className="bg-pink-300">
          <ShareIcon size={20} />
        </ColoredIconWrapper>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Sharing"
    >
      <div className="z-10 flex min-w-0 flex-col gap-4 pt-2">
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
        <div className="flex w-full justify-between pb-4 ">{Footer}</div>
      </div>
    </ResponsiveSheet>
  );
};

export default ShareWishlist;
