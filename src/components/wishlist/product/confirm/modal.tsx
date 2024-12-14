"use client";

import React, { useMemo, useState } from "react";

import { Button } from "~/components/ui/button";

import type {
  Wishlist,
  WishlistProduct,
  WishlistSharesWithUser,
} from "~/types/wishlist";
import { AnimatePresence, motion } from "framer-motion";
import ColoredIconWrapper from "~/components/ui/colored-icon-wrapper";
import { ArrowRight, Check, Gift, PackageCheck, Scroll } from "lucide-react";

import { useAction } from "next-safe-action/hooks";
import { markProductReceived } from "~/server/actions/product";
import SharedUserThumbnail from "../../share-wishlist/shared-users/shared-user-thumbnail";
import { cn, getBackgroundColor } from "~/lib/utils";
import { useRouter } from "next/navigation";
import { SubmitButton } from "~/components/ui/submit-button";
import MockCard from "~/components/home/mock-card";
import { type Session } from "next-auth";
import Image from "next/image";
import ResponsiveSheet from "~/components/ui/responsive-sheet";

type ModalProps = {
  wishlist: Wishlist;
  product: WishlistProduct;
  wishlistShares: WishlistSharesWithUser[];
  session: Session;
};

const Modal = ({ wishlist, wishlistShares, product, session }: ModalProps) => {
  return (
    <ResponsiveSheet
      trigger={<Button>Mark as received</Button>}
      title="Received this item?"
      titleIcon={
        <ColoredIconWrapper className="bg-green-300">
          <PackageCheck size={20} />
        </ColoredIconWrapper>
      }
    >
      <div className="w-full gap-4 pb-4 sm:pb-0">
        <ModalContent
          session={session}
          wishlistShares={wishlistShares}
          wishlist={wishlist}
          product={product}
        />
      </div>
    </ResponsiveSheet>
  );
};

type ModalContentProps = {
  session: Session;
  animationDelaySeconds?: number;
  wishlist: Wishlist;
  product: WishlistProduct;
  wishlistShares: WishlistSharesWithUser[];
};

const ModalContent = ({
  session,
  wishlist,
  product,
  wishlistShares,
}: ModalContentProps) => {
  const [frame, setFrame] = useState<"attribute" | "confirm">("attribute");
  const router = useRouter();
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>();
  const { execute } = useAction(markProductReceived, {
    onSuccess: () => router.refresh(),
  });

  const content = useMemo(() => {
    if (frame === "confirm") {
      return (
        <motion.div
          key="confirm"
          initial={{
            x: "120%",
            opacity: 0,
            filter: "blur(4px)",
          }}
          animate={{
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
          }}
          exit={{
            x: "120%",
            opacity: 0,
            filter: "blur(4px)",
          }}
          transition={{
            type: "spring",
            bounce: 0,
            duration: 0.4,
          }}
        >
          <form
            action={() => {
              execute({
                productId: product.id,
                wishlistId: wishlist.id,
                purchasedByUserId: selectedUserId,
              });
            }}
            className="relative  overflow-hidden  "
          >
            <div className="flex flex-col gap-4 pb-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <p className="text-lg font-medium"> Confirm </p>
                  <p className="text-sm">
                    {" "}
                    Marking this item as received will move it{" "}
                  </p>
                </div>
                <div className="grid grid-cols-[1fr_1fr] flex-row flex-nowrap items-center gap-4">
                  <div className="w-full">
                    <p className="mb-1 text-lg font-medium "> From: </p>
                    <div
                      className={cn(
                        "w-full rounded-md border border-black p-2",
                        getBackgroundColor(wishlist.color) ?? "bg-white",
                      )}
                    >
                      <p className="text-lg font-medium">{wishlist.name}</p>
                    </div>
                  </div>

                  <div className="w-full">
                    <p className="mb-1 text-lg font-medium "> To: </p>

                    <div
                      className={cn(
                        "w-full rounded-md border border-black bg-pink-300 p-2",
                      )}
                    >
                      <p className="text-lg font-medium">My Gifts</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full items-start justify-between">
                <Button
                  type="button"
                  variant="tertiary"
                  onClick={() => setFrame("attribute")}
                >
                  Back
                </Button>
                <SubmitButton className="w-fit">Confirm</SubmitButton>
              </div>
            </div>
          </form>
        </motion.div>
      );
    }

    if (frame === "attribute") {
      return (
        <motion.div
          key="attribute"
          initial={{
            x: "-120%",
            opacity: 0,
            filter: "blur(4px)",
          }}
          animate={{
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
          }}
          exit={{
            x: "-120%",
            opacity: 0,
            filter: "blur(4px)",
          }}
          transition={{
            type: "spring",
            bounce: 0,
            duration: 0.4,
          }}
          className="flex w-full flex-col pb-4"
        >
          <div>
            <h3 className="text-lg font-medium">Who got this for you?</h3>
            <p className="mb-4 text-balance text-sm tracking-tight">
              Select a user from the list below to credit them for the item
            </p>
            <ul className="mb-6 flex max-h-[210px] flex-col gap-1 overflow-y-auto rounded-md border border-black p-2">
              {wishlistShares.map(({ users: sharedUser }) => (
                <li key={sharedUser.id}>
                  <button
                    type="button"
                    onClick={() => {
                      if (selectedUserId === sharedUser.id) {
                        setSelectedUserId(undefined);
                      } else {
                        setSelectedUserId(sharedUser.id);
                      }
                    }}
                    className={cn(
                      "flex w-fit flex-row items-center justify-between gap-2 rounded-md px-2 py-1 transition-all ",
                      selectedUserId === sharedUser.id
                        ? "bg-green-200 font-medium"
                        : "hover:bg-blue-200",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <SharedUserThumbnail className="relative size-5">
                        {sharedUser.image ? (
                          <Image
                            alt={sharedUser.name ?? ""}
                            fill
                            src={sharedUser.image}
                          />
                        ) : (
                          <div className="h-full w-full bg-green-300"> </div>
                        )}
                      </SharedUserThumbnail>
                      <p className="max-w-[180px] overflow-ellipsis text-center text-lg leading-tight">
                        {sharedUser.id === session.user.id
                          ? "You"
                          : sharedUser.name}
                      </p>
                    </div>
                    {selectedUserId === sharedUser.id && <Check size={20} />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <Button
            onClick={() => {
              setFrame("confirm");
            }}
            className=" w-fit self-end "
          >
            {" "}
            {selectedUserId
              ? "Mark item received"
              : "Skip and mark item received"}
          </Button>{" "}
        </motion.div>
      );
    }
  }, [
    frame,
    selectedUserId,
    wishlistShares,
    session,
    product,
    wishlist,
    execute,
  ]);

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {content}
    </AnimatePresence>
  );
};

export default Modal;
